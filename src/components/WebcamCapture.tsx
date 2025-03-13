
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
    if (!videoRef.current || !canvasRef.current) return;
    
    try {
      // Verificar se o vídeo está pronto e tem dimensões válidas
      if (videoRef.current.readyState !== 4 || 
          videoRef.current.videoWidth === 0 || 
          videoRef.current.videoHeight === 0) {
        console.log("Vídeo não está pronto ou tem dimensões zero:", {
          readyState: videoRef.current.readyState,
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight
        });
        return;
      }
      
      const faceData = await detectFace(videoRef.current);
      
      // Atualizar canvas com dimensões corretas do vídeo se necessário
      if (canvasRef.current.width !== videoRef.current.videoWidth || 
          canvasRef.current.height !== videoRef.current.videoHeight) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }
      
      // Limpar canvas
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      
      // Desenhar detecção se houver um rosto
      if (faceData && faceData.detection && faceData.landmarks) {
        drawFaceDetection(
          canvasRef.current,
          videoRef.current,
          faceData.detection,
          faceData.landmarks
        );
      }
      
      // Sempre chamar onFaceDetected com os dados atuais (mesmo que seja null)
      onFaceDetected(faceData);
    } catch (err) {
      console.error('Erro ao detectar rosto:', err);
      // Não mostramos o erro para o usuário para não interromper a experiência
    }
  };
  
  // Executar detecção facial quando o vídeo estiver em reprodução
  useEffect(() => {
    if (!isCapturing || isModelLoading) return;
    
    // Aguardar o vídeo carregar completamente
    const waitForVideoReady = () => {
      if (videoRef.current && 
          videoRef.current.readyState === 4 &&
          videoRef.current.videoWidth > 0 && 
          videoRef.current.videoHeight > 0) {
        
        // Vídeo está pronto, ajustar canvas
        if (canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
        }
        
        // Iniciar detecção regular
        const interval = setInterval(() => {
          detectFaceInVideo();
        }, 200); // Verificar a cada 200ms
        
        return () => clearInterval(interval);
      } else {
        // Tentar novamente em 100ms
        setTimeout(waitForVideoReady, 100);
      }
    };
    
    waitForVideoReady();
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
