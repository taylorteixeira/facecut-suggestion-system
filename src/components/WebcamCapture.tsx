
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { loadModels, detectFace, FaceData, drawFaceDetection } from '@/services/faceDetectionService';
import { useToast } from "@/hooks/use-toast";

interface WebcamCaptureProps {
  onFaceDetected: (faceData: FaceData | null) => void;
  className?: string;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onFaceDetected, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Inicializar modelos de detecção facial
  useEffect(() => {
    const initModels = async () => {
      try {
        setIsModelLoading(true);
        await loadModels();
        setIsModelLoading(false);
        toast({
          title: "Modelos carregados",
          description: "Detecção facial pronta para uso",
        });
      } catch (err) {
        console.error("Erro ao carregar modelo:", err);
        setError('Falha ao carregar modelos de detecção facial. Verifique sua conexão com a internet e atualize a página.');
        setIsModelLoading(false);
        toast({
          title: "Erro",
          description: "Falha ao carregar modelos de detecção facial",
          variant: "destructive",
        });
      }
    };
    
    initModels();
    
    // Limpeza
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [toast]);
  
  // Iniciar webcam
  const startCapture = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
        toast({
          title: "Câmera iniciada",
          description: "Posicione seu rosto no quadro",
        });
      }
    } catch (err) {
      console.error("Erro de acesso à câmera:", err);
      setError('Não foi possível acessar a webcam. Verifique as permissões e tente novamente.');
      toast({
        title: "Erro de Câmera",
        description: "Não foi possível acessar sua câmera",
        variant: "destructive",
      });
    }
  };
  
  // Parar webcam
  const stopCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
      
      // Limpar canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
      
      toast({
        title: "Câmera parada",
      });
    }
  };
  
  // Detectar rosto no quadro de vídeo atual
  const detectFaceInVideo = async () => {
    if (videoRef.current && canvasRef.current) {
      try {
        const faceData = await detectFace(videoRef.current);
        onFaceDetected(faceData);
        
        if (faceData && faceData.detection && faceData.landmarks) {
          drawFaceDetection(
            canvasRef.current,
            videoRef.current,
            faceData.detection,
            faceData.landmarks
          );
        } else if (isCapturing) {
          // Limpar canvas se nenhum rosto for detectado
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        }
      } catch (err) {
        console.error('Erro ao detectar rosto:', err);
      }
    }
  };
  
  // Executar detecção facial quando o vídeo estiver em reprodução
  useEffect(() => {
    if (!isCapturing || isModelLoading) return;
    
    const interval = setInterval(() => {
      detectFaceInVideo();
    }, 200); // Verificar a cada 200ms
    
    return () => clearInterval(interval);
  }, [isCapturing, isModelLoading]);
  
  return (
    <div className={`relative rounded-xl overflow-hidden bg-muted ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        onPlay={() => setIsCapturing(true)}
        className="w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        width="640"
        height="480"
      />
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {!isCapturing ? (
          <Button 
            onClick={startCapture} 
            disabled={isModelLoading} 
            className="bg-haircut-blue hover:bg-blue-600 transition-colors"
          >
            <Camera className="mr-2 h-4 w-4" />
            {isModelLoading ? 'Carregando...' : 'Iniciar Câmera'}
          </Button>
        ) : (
          <Button 
            onClick={stopCapture} 
            variant="outline" 
            className="bg-white/80 hover:bg-white"
          >
            Parar Câmera
          </Button>
        )}
      </div>
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white p-4 text-center">
          <div>
            <p className="mb-2">{error}</p>
            <Button 
              onClick={() => setError(null)} 
              variant="outline" 
              className="bg-white text-black hover:bg-gray-200"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
      
      {isModelLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-t-haircut-blue border-white/30 rounded-full animate-spin mx-auto mb-2"></div>
            <p>Carregando modelos de detecção facial...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
