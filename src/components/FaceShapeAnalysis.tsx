import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FaceShape } from "@/services/faceDetectionService"
import { getFaceShapeDescription } from "@/services/haircutRecommendationService"
import { Badge } from "@/components/ui/badge"

interface FaceShapeAnalysisProps {
  faceShape: FaceShape | null
  confidence: number | null
}

const FaceShapeAnalysis: React.FC<FaceShapeAnalysisProps> = ({
  faceShape,
  confidence,
}) => {
  if (!faceShape) {
    return (
      <Card className="bg-white border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-normal text-gray-700">
            Análise Facial
          </CardTitle>
          <CardDescription className="text-gray-500 font-light">
            Posicione seu rosto na câmera para análise.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const description = getFaceShapeDescription(faceShape)
  const confidencePercentage = confidence ? Math.round(confidence * 100) : 0

  return (
    <Card className="bg-white border-gray-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg font-normal text-gray-700">
          <span>Formato do Rosto</span>
          <Badge
            variant="outline"
            className="ml-2 font-light capitalize bg-gray-50 text-gray-600 border-gray-200"
          >
            {faceShape}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-light text-gray-600">
              Confiança da Análise
            </span>
            <span className="text-sm font-normal text-gray-700">
              {confidencePercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-black"
              style={{ width: `${confidencePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 font-light">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default FaceShapeAnalysis
