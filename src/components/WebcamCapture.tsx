import React, { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import {
  loadModels,
  detectFace,
  FaceData,
  drawFaceDetection,
} from "@/services/faceDetectionService"
import { useToast } from "@/hooks/use-toast"

interface WebcamCaptureProps {
  onFaceDetected: (faceData: FaceData | null) => void
  className?: string
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onFaceDetected,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isModelLoading, setIsModelLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const [photo, setPhoto] = useState<string | null>(null)

  // Initialize face detection models
  useEffect(() => {
    const initModels = async () => {
      try {
        setIsModelLoading(true)
        await loadModels()
        setIsModelLoading(false)
        toast({
          title: "Models loaded",
          description: "Face detection is ready to use",
        })
      } catch (err) {
        console.error("Model loading error:", err)
        setError(
          "Failed to load face detection models. Please check your internet connection and refresh."
        )
        setIsModelLoading(false)
        toast({
          title: "Error",
          description: "Failed to load face detection models",
          variant: "destructive",
        })
      }
    }

    initModels()

    // Clean up
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [toast])

  // Start webcam
  const startCapture = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)

        // Aguarda o vídeo estar pronto
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              // Configura as dimensões do canvas
              if (canvasRef.current) {
                canvasRef.current.width = videoRef.current!.videoWidth
                canvasRef.current.height = videoRef.current!.videoHeight
              }
              resolve(true)
            }
          }
        })

        toast({
          title: "Câmera iniciada",
          description: "Posicione seu rosto no enquadramento",
        })
      }
    } catch (err) {
      console.error("Erro ao acessar câmera:", err)
      setError(
        "Não foi possível acessar a webcam. Por favor, verifique as permissões e tente novamente."
      )
      toast({
        title: "Erro na Câmera",
        description: "Não foi possível acessar sua câmera",
        variant: "destructive",
      })
    }
  }

  // Stop webcam
  const stopCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsCapturing(false)

      // Clear canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      }

      toast({
        title: "Camera stopped",
      })
    }
  }

  // Detect face in current video frame
  const detectFaceInVideo = async () => {
    if (videoRef.current && canvasRef.current) {
      try {
        // Verifica se o vídeo está pronto
        if (videoRef.current.readyState < 2) {
          return
        }

        // Verifica se o vídeo tem dimensões válidas
        if (
          videoRef.current.videoWidth === 0 ||
          videoRef.current.videoHeight === 0
        ) {
          return
        }

        // Configura as dimensões do canvas
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight

        const faceData = await detectFace(videoRef.current)
        onFaceDetected(faceData)

        if (faceData && faceData.detection && faceData.landmarks) {
          drawFaceDetection(
            canvasRef.current,
            videoRef.current,
            faceData.detection,
            faceData.landmarks
          )
        } else if (isCapturing) {
          // Clear canvas if no face detected
          const ctx = canvasRef.current.getContext("2d")
          if (ctx) {
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            )
          }
        }
      } catch (err) {
        console.error("Erro ao detectar face:", err)
      }
    }
  }

  // Run face detection when video is playing
  useEffect(() => {
    if (!isCapturing || isModelLoading) return

    const interval = setInterval(() => {
      detectFaceInVideo()
    }, 200) // Check every 200ms

    return () => clearInterval(interval)
  }, [isCapturing, isModelLoading])

  // Função para capturar foto
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Configurar canvas para captura
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Desenhar frame atual do vídeo no canvas
        ctx.drawImage(video, 0, 0)
        // Converter para URL de dados
        const photoUrl = canvas.toDataURL("image/jpeg")
        setPhoto(photoUrl)

        // Criar elemento de imagem para detecção
        const img = new Image()
        img.src = photoUrl
        img.onload = async () => {
          const faceData = await detectFace(img)
          onFaceDetected(faceData)
        }

        toast({
          title: "Foto capturada",
          description: "Analisando seu formato de rosto...",
        })
      }
    }
  }

  // Botão para nova foto
  const newPhoto = () => {
    setPhoto(null)
    startCapture()
  }

  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-muted ${className}`}
    >
      {!photo ? (
        <>
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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scaleX(-1)",
              zIndex: 10,
            }}
          />
        </>
      ) : (
        <img
          src={photo}
          alt="Foto capturada"
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {!isCapturing && !photo ? (
          <Button
            onClick={startCapture}
            disabled={isModelLoading}
            className="bg-haircut-gray hover:bg-gray-600 transition-colors"
          >
            <Camera className="mr-2 h-4 w-4" />
            {isModelLoading ? "Carregando..." : "Iniciar Câmera"}
          </Button>
        ) : !photo ? (
          <>
            <Button
              onClick={takePhoto}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Tirar Foto
            </Button>
            <Button
              onClick={stopCapture}
              variant="outline"
              className="bg-white/80 hover:bg-white/10"
            >
              Parar Câmera
            </Button>
          </>
        ) : (
          <Button
            onClick={newPhoto}
            className="bg-haircut-gray hover:bg-gray-600"
          >
            Nova Foto
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
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {isModelLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-t-haircut-blue border-white/30 rounded-full animate-spin mx-auto mb-2"></div>
            <p>Loading face detection models...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WebcamCapture
