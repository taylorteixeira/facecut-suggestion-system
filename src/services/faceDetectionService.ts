
// Serviço de detecção facial usando TensorFlow.js e face-api.js

import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api';

// Classificações de formato do rosto
export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond' | 'triangle';

export interface FaceData {
  faceShape: FaceShape;
  confidence: number;
  landmarks?: faceapi.FaceLandmarks68;
  detection?: faceapi.FaceDetection;
  gender?: 'feminino' | 'masculino';
}

let modelsLoaded = false;

// URLs dos modelos (links CDN diretos para garantir acesso confiável)
const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';

export const loadModels = async () => {
  if (modelsLoaded) return;
  
  try {
    console.log('Carregando modelos de detecção facial de:', MODEL_URL);
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    // Adicionando o modelo de gênero para identificar rostos femininos
    await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
    modelsLoaded = true;
    console.log('Modelos de detecção facial carregados com sucesso');
  } catch (error) {
    console.error('Erro ao carregar modelos de detecção facial:', error);
    throw new Error('Falha ao carregar modelos de detecção facial');
  }
};

export const detectFace = async (imageElement: HTMLImageElement | HTMLVideoElement): Promise<FaceData | null> => {
  if (!modelsLoaded) {
    await loadModels();
  }
  
  try {
    const detections = await faceapi
      .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withAgeAndGender();
    
    if (!detections) {
      return null;
    }
    
    // Analisar formato do rosto com base em pontos de referência
    const faceShape = analyzeFaceShape(detections.landmarks);
    
    // Determinar o gênero
    const gender = detections.gender === 'female' ? 'feminino' : 'masculino';
    
    return {
      faceShape: faceShape.shape,
      confidence: faceShape.confidence,
      landmarks: detections.landmarks,
      detection: detections.detection,
      gender: gender
    };
  } catch (error) {
    console.error('Erro ao detectar rosto:', error);
    return null;
  }
};

// Algoritmo simplificado para determinar o formato do rosto com base em pontos de referência
const analyzeFaceShape = (landmarks: faceapi.FaceLandmarks68): { shape: FaceShape; confidence: number } => {
  // Obter medidas do rosto
  const jawline = landmarks.getJawOutline();
  const nose = landmarks.getNose();
  const mouth = landmarks.getMouth();
  
  // Largura do rosto nas maçãs do rosto
  const cheekLeft = jawline[1];
  const cheekRight = jawline[15];
  const faceWidth = Math.abs(cheekRight.x - cheekLeft.x);
  
  // Altura do rosto
  const chin = jawline[8];
  const foreheadY = jawline[0].y;
  const faceHeight = Math.abs(chin.y - foreheadY);
  
  // Largura da mandíbula
  const jawLeft = jawline[3];
  const jawRight = jawline[13];
  const jawWidth = Math.abs(jawRight.x - jawLeft.x);
  
  // Largura da testa
  const foreheadWidth = Math.abs(jawline[0].x - jawline[16].x);
  
  // Calcular proporções
  const widthToHeightRatio = faceWidth / faceHeight;
  const jawToFaceWidthRatio = jawWidth / faceWidth;
  const foreheadToJawRatio = foreheadWidth / jawWidth;
  
  // Classificação simples baseada em proporções
  // Esta é uma versão simplificada - em um aplicativo real, você usaria um algoritmo mais sofisticado
  
  let shape: FaceShape = 'oval';
  let confidence = 0.7; // Confiança padrão
  
  if (widthToHeightRatio > 0.85 && jawToFaceWidthRatio > 0.9) {
    shape = 'round';
    confidence = 0.8;
  } else if (jawToFaceWidthRatio > 0.9 && foreheadToJawRatio < 1.1) {
    shape = 'square';
    confidence = 0.85;
  } else if (foreheadToJawRatio > 1.2) {
    shape = 'heart';
    confidence = 0.75;
  } else if (widthToHeightRatio < 0.65) {
    shape = 'long';
    confidence = 0.8;
  } else if (foreheadToJawRatio < 0.9 && jawToFaceWidthRatio < 0.8) {
    shape = 'triangle';
    confidence = 0.7;
  } else if (faceWidth / jawWidth > 1.2 && foreheadToJawRatio > 0.9 && foreheadToJawRatio < 1.1) {
    shape = 'diamond';
    confidence = 0.75;
  }
  
  return { shape, confidence };
};

export const drawFaceDetection = (
  canvas: HTMLCanvasElement,
  imageElement: HTMLImageElement | HTMLVideoElement,
  detection: faceapi.FaceDetection,
  landmarks: faceapi.FaceLandmarks68
) => {
  // Redimensionar canvas para combinar com a imagem
  const displaySize = {
    width: imageElement.width,
    height: imageElement.height
  };
  faceapi.matchDimensions(canvas, displaySize);
  
  // Desenhar detecções e pontos de referência
  const resizedDetection = faceapi.resizeResults({ detection, landmarks }, displaySize);
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Desenhar caixa do rosto
  const { box } = resizedDetection.detection;
  ctx.strokeStyle = '#4A90E2';
  ctx.lineWidth = 2;
  ctx.strokeRect(box.x, box.y, box.width, box.height);
  
  // Desenhar pontos de referência
  ctx.fillStyle = '#50E3C2';
  resizedDetection.landmarks.positions.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  });
};
