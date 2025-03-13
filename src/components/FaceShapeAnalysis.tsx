
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaceShape } from '@/services/faceDetectionService';
import { getFaceShapeDescription } from '@/services/haircutRecommendationService';
import { Badge } from "@/components/ui/badge";

interface FaceShapeAnalysisProps {
  faceShape: FaceShape | null;
  confidence: number | null;
}

const FaceShapeAnalysis: React.FC<FaceShapeAnalysisProps> = ({ faceShape, confidence }) => {
  if (!faceShape) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Face Shape Analysis</CardTitle>
          <CardDescription>No face detected. Please position your face in the webcam view.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const description = getFaceShapeDescription(faceShape);
  const confidencePercentage = confidence ? Math.round(confidence * 100) : 0;
  
  // Get the color based on the confidence
  const getConfidenceColor = () => {
    if (confidencePercentage >= 80) return "text-green-600";
    if (confidencePercentage >= 60) return "text-yellow-600";
    return "text-orange-600";
  };
  
  // Handle confidence indicator width
  const indicatorWidth = `${confidencePercentage}%`;
  
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl">
          <span>Your Face Shape</span>
          <Badge 
            variant="outline" 
            className="ml-2 font-semibold capitalize bg-haircut-light text-haircut-gray"
          >
            {faceShape}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Analysis Confidence</span>
            <span className={`text-sm font-semibold ${getConfidenceColor()}`}>
              {confidencePercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full bg-haircut-blue" 
              style={{ width: indicatorWidth }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-1">Description</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaceShapeAnalysis;
