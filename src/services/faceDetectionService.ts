
// Face detection service using TensorFlow.js and face-api.js

import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api';

// Face shape classifications
export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond' | 'triangle';

export interface FaceData {
  faceShape: FaceShape;
  confidence: number;
  landmarks?: faceapi.FaceLandmarks68;
  detection?: faceapi.FaceDetection;
}

let modelsLoaded = false;

export const loadModels = async () => {
  if (modelsLoaded) return;
  
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    modelsLoaded = true;
    console.log('Face detection models loaded successfully');
  } catch (error) {
    console.error('Error loading face detection models:', error);
    throw new Error('Failed to load face detection models');
  }
};

export const detectFace = async (imageElement: HTMLImageElement | HTMLVideoElement): Promise<FaceData | null> => {
  if (!modelsLoaded) {
    await loadModels();
  }
  
  try {
    const detections = await faceapi
      .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();
    
    if (!detections) {
      return null;
    }
    
    // Analyze face shape based on landmarks
    const faceShape = analyzeFaceShape(detections.landmarks);
    
    return {
      faceShape: faceShape.shape,
      confidence: faceShape.confidence,
      landmarks: detections.landmarks,
      detection: detections.detection
    };
  } catch (error) {
    console.error('Error detecting face:', error);
    return null;
  }
};

// Simplified algorithm to determine face shape based on landmarks
const analyzeFaceShape = (landmarks: faceapi.FaceLandmarks68): { shape: FaceShape; confidence: number } => {
  // Get face measurements
  const jawline = landmarks.getJawOutline();
  const nose = landmarks.getNose();
  const mouth = landmarks.getMouth();
  
  // Face width at the cheekbones
  const cheekLeft = jawline[1];
  const cheekRight = jawline[15];
  const faceWidth = Math.abs(cheekRight.x - cheekLeft.x);
  
  // Face height
  const chin = jawline[8];
  const foreheadY = jawline[0].y;
  const faceHeight = Math.abs(chin.y - foreheadY);
  
  // Jaw width
  const jawLeft = jawline[3];
  const jawRight = jawline[13];
  const jawWidth = Math.abs(jawRight.x - jawLeft.x);
  
  // Forehead width
  const foreheadWidth = Math.abs(jawline[0].x - jawline[16].x);
  
  // Calculate ratios
  const widthToHeightRatio = faceWidth / faceHeight;
  const jawToFaceWidthRatio = jawWidth / faceWidth;
  const foreheadToJawRatio = foreheadWidth / jawWidth;
  
  // Simple classification based on ratios
  // This is a simplified version - in a real app, you'd use a more sophisticated algorithm
  
  let shape: FaceShape = 'oval';
  let confidence = 0.7; // Default confidence
  
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
  // Resize canvas to match the image
  const displaySize = {
    width: imageElement.width,
    height: imageElement.height
  };
  faceapi.matchDimensions(canvas, displaySize);
  
  // Draw detections and landmarks
  const resizedDetection = faceapi.resizeResults({ detection, landmarks }, displaySize);
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw face box
  const { box } = resizedDetection.detection;
  ctx.strokeStyle = '#4A90E2';
  ctx.lineWidth = 2;
  ctx.strokeRect(box.x, box.y, box.width, box.height);
  
  // Draw landmarks
  ctx.fillStyle = '#50E3C2';
  resizedDetection.landmarks.positions.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  });
};
