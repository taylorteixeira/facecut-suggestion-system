// Face detection service using MediaPipe Face Mesh

import { FaceMesh } from "@mediapipe/face_mesh"

// Face shape classifications
export type FaceShape =
  | "oval"
  | "round"
  | "square"
  | "heart"
  | "long"
  | "diamond"
  | "triangle"

interface Landmark {
  x: number
  y: number
  z: number
}

interface FaceMeshResults {
  multiFaceLandmarks: Landmark[][]
  image: HTMLImageElement | HTMLVideoElement
}

export interface FaceData {
  faceShape: FaceShape
  confidence: number
  landmarks?: Landmark[]
  detection?: Landmark[][]
}

let faceMesh: FaceMesh | null = null
let lastResults: FaceMeshResults | null = null

export const loadModels = async () => {
  if (faceMesh) return

  try {
    console.log("Iniciando MediaPipe Face Mesh...")
    faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
      },
    })

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    // Adiciona callback para resultados
    faceMesh.onResults((results) => {
      console.log("Resultados recebidos no callback:", results)
      lastResults = results as unknown as FaceMeshResults
    })

    await faceMesh.initialize()
    console.log("MediaPipe Face Mesh carregado com sucesso")
  } catch (error) {
    console.error("Erro ao carregar MediaPipe Face Mesh:", error)
    throw new Error("Falha ao carregar modelos de detecção facial")
  }
}

export const detectFace = async (
  imageElement: HTMLImageElement | HTMLVideoElement
): Promise<FaceData | null> => {
  if (!faceMesh) {
    await loadModels()
  }

  try {
    console.log("Detectando face...")
    console.log("Dimensões da imagem:", {
      width: imageElement.width,
      height: imageElement.height,
    })

    // Garante que a imagem está carregada
    if (imageElement instanceof HTMLImageElement && !imageElement.complete) {
      await new Promise((resolve) => {
        imageElement.onload = resolve
      })
    }

    // Garante que o vídeo está pronto
    if (
      imageElement instanceof HTMLVideoElement &&
      imageElement.readyState < 2
    ) {
      await new Promise((resolve) => {
        imageElement.onloadeddata = resolve
      })
    }

    // Envia a imagem para processamento
    await faceMesh!.send({ image: imageElement })

    // Usa os resultados do callback
    if (!lastResults) {
      console.log("Nenhum resultado recebido")
      return null
    }

    const landmarks = lastResults.multiFaceLandmarks?.[0]
    console.log("Landmarks encontrados:", landmarks?.length)

    if (!landmarks) {
      console.log("Nenhuma face detectada")
      return null
    }

    // Analyze face shape based on landmarks
    const faceShape = analyzeFaceShape(landmarks)
    console.log("Formato do rosto detectado:", faceShape)

    return {
      faceShape: faceShape.shape,
      confidence: faceShape.confidence,
      landmarks: landmarks,
      detection: lastResults.multiFaceLandmarks,
    }
  } catch (error) {
    console.error("Erro ao detectar face:", error)
    return null
  }
}

// Simplified algorithm to determine face shape based on landmarks
const analyzeFaceShape = (
  landmarks: Landmark[]
): { shape: FaceShape; confidence: number } => {
  // Get face measurements using MediaPipe landmarks
  // MediaPipe provides 468 landmarks, we'll use a subset for face shape analysis
  const jawline = landmarks.slice(172, 200) // Jawline landmarks
  const nose = landmarks.slice(1, 10) // Nose landmarks
  const mouth = landmarks.slice(61, 91) // Mouth landmarks
  const eyes = landmarks.slice(33, 60) // Eye landmarks

  // Face width at the cheekbones
  const cheekLeft = landmarks[93]
  const cheekRight = landmarks[323]
  const faceWidth = Math.abs(cheekRight.x - cheekLeft.x)

  // Face height
  const chin = landmarks[152]
  const foreheadY = Math.min(landmarks[10].y, landmarks[338].y)
  const faceHeight = Math.abs(chin.y - foreheadY)

  // Jaw width
  const jawLeft = landmarks[172]
  const jawRight = landmarks[397]
  const jawWidth = Math.abs(jawRight.x - jawLeft.x)

  // Forehead width
  const foreheadWidth = Math.abs(landmarks[10].x - landmarks[338].x)

  // Cheekbone width
  const cheekboneWidth = Math.abs(landmarks[93].x - landmarks[323].x)

  // Face symmetry
  const faceCenter = faceWidth / 2
  const leftSideWidth = Math.abs(faceCenter - landmarks[10].x)
  const rightSideWidth = Math.abs(landmarks[338].x - faceCenter)
  const symmetryRatio =
    Math.min(leftSideWidth, rightSideWidth) /
    Math.max(leftSideWidth, rightSideWidth)

  // Calculate ratios
  const widthToHeightRatio = faceWidth / faceHeight
  const jawToFaceWidthRatio = jawWidth / faceWidth
  const foreheadToJawRatio = foreheadWidth / jawWidth
  const cheekboneToJawRatio = cheekboneWidth / jawWidth

  // Calculate confidence based on multiple factors
  let confidence = 0.7
  let shape: FaceShape = "oval"

  // Improved classification based on multiple ratios and measurements
  if (
    widthToHeightRatio > 0.85 &&
    jawToFaceWidthRatio > 0.9 &&
    symmetryRatio > 0.95
  ) {
    shape = "round"
    confidence = 0.85
  } else if (
    jawToFaceWidthRatio > 0.9 &&
    foreheadToJawRatio < 1.1 &&
    cheekboneToJawRatio > 0.95
  ) {
    shape = "square"
    confidence = 0.9
  } else if (foreheadToJawRatio > 1.2 && cheekboneToJawRatio > 1.1) {
    shape = "heart"
    confidence = 0.8
  } else if (widthToHeightRatio < 0.65 && jawToFaceWidthRatio < 0.8) {
    shape = "long"
    confidence = 0.85
  } else if (
    foreheadToJawRatio < 0.9 &&
    jawToFaceWidthRatio < 0.8 &&
    cheekboneToJawRatio < 0.9
  ) {
    shape = "triangle"
    confidence = 0.8
  } else if (
    faceWidth / jawWidth > 1.2 &&
    foreheadToJawRatio > 0.9 &&
    foreheadToJawRatio < 1.1 &&
    cheekboneToJawRatio > 1.1
  ) {
    shape = "diamond"
    confidence = 0.85
  }

  // Adjust confidence based on symmetry
  confidence *= 0.7 + symmetryRatio * 0.3

  return { shape, confidence }
}

export const drawFaceDetection = (
  canvas: HTMLCanvasElement,
  imageElement: HTMLImageElement | HTMLVideoElement,
  detection: Landmark[][],
  landmarks: Landmark[]
) => {
  console.log("Desenhando detecção facial...")
  console.log("Dimensões do canvas:", {
    width: canvas.width,
    height: canvas.height,
  })
  console.log("Dimensões da imagem:", {
    width: imageElement.width,
    height: imageElement.height,
  })
  console.log("Número de landmarks:", landmarks.length)

  // Garante que o canvas tem as dimensões corretas
  if (canvas.width === 0 || canvas.height === 0) {
    console.error("Canvas com dimensões inválidas")
    return
  }

  const ctx = canvas.getContext("2d")
  if (!ctx) {
    console.error("Não foi possível obter o contexto 2D do canvas")
    return
  }

  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Desenha o contorno do rosto
  ctx.strokeStyle = "#4A90E2"
  ctx.lineWidth = 2
  ctx.beginPath()

  // Contorno do rosto (usando os landmarks específicos do MediaPipe)
  const faceOutline = [
    ...landmarks.slice(10, 33), // Lado direito do rosto
    ...landmarks.slice(33, 46), // Olho direito
    ...landmarks.slice(46, 61), // Sobrancelha direita
    ...landmarks.slice(61, 91), // Boca
    ...landmarks.slice(91, 112), // Sobrancelha esquerda
    ...landmarks.slice(112, 133), // Olho esquerdo
    ...landmarks.slice(133, 152), // Lado esquerdo do rosto
    ...landmarks.slice(152, 172), // Queixo
  ]

  faceOutline.forEach((point, index) => {
    const x = point.x * canvas.width
    const y = point.y * canvas.height
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.closePath()
  ctx.stroke()

  // Desenha os landmarks principais
  ctx.fillStyle = "#50E3C2"
  landmarks.forEach((point) => {
    const x = point.x * canvas.width
    const y = point.y * canvas.height
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, 2 * Math.PI)
    ctx.fill()
  })

  // Desenha pontos específicos para melhor visualização
  // Olhos
  const leftEye = landmarks.slice(33, 46)
  const rightEye = landmarks.slice(133, 146)
  ctx.fillStyle = "#FF0000"
  leftEye.forEach((point) => {
    const x = point.x * canvas.width
    const y = point.y * canvas.height
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, 2 * Math.PI)
    ctx.fill()
  })
  rightEye.forEach((point) => {
    const x = point.x * canvas.width
    const y = point.y * canvas.height
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, 2 * Math.PI)
    ctx.fill()
  })

  // Boca
  const mouth = landmarks.slice(61, 91)
  ctx.fillStyle = "#00FF00"
  mouth.forEach((point) => {
    const x = point.x * canvas.width
    const y = point.y * canvas.height
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, 2 * Math.PI)
    ctx.fill()
  })

  // Nariz
  const nose = landmarks.slice(1, 10)
  ctx.fillStyle = "#0000FF"
  nose.forEach((point) => {
    const x = point.x * canvas.width
    const y = point.y * canvas.height
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, 2 * Math.PI)
    ctx.fill()
  })

  // Log para debug
  console.log("Primeiro landmark:", {
    x: landmarks[0].x * canvas.width,
    y: landmarks[0].y * canvas.height,
  })
}
