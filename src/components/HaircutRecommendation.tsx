import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Haircut,
  getPlaceholderImage,
} from "@/services/haircutRecommendationService"
import { Badge } from "@/components/ui/badge"
import { Scissors, CheckCircle } from "lucide-react"

interface HaircutRecommendationProps {
  haircuts: Haircut[]
  isLoading?: boolean
}

const HaircutCard: React.FC<{ haircut: Haircut }> = ({ haircut }) => {
  const imageUrl = getPlaceholderImage(haircut)

  return (
    <div className="overflow-hidden bg-white border border-gray-100 rounded-md hover:shadow-sm transition-shadow">
      <div className="relative aspect-square">
        <img
          src={imageUrl}
          alt={haircut.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-3 right-3 bg-white text-gray-700 rounded-full px-2 py-1 text-xs font-normal shadow-sm">
          {haircut.rating.toFixed(1)} ★
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-normal text-gray-800 mb-1">{haircut.name}</h3>
        <p className="text-xs text-gray-500 font-light line-clamp-2 mb-3">
          {haircut.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {haircut.attributes.slice(0, 3).map((attr, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-gray-50 text-gray-600 font-light border-gray-200"
            >
              {attr}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

const HaircutRecommendation: React.FC<HaircutRecommendationProps> = ({
  haircuts,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl h-64 animate-pulse"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (haircuts.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Haircut Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <p className="text-muted-foreground">
              Position your face in the camera view to get personalized haircut
              recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-normal text-gray-700">
          Recomendações de Corte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {haircuts.map((haircut) => (
            <HaircutCard key={haircut.id} haircut={haircut} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default HaircutRecommendation
