import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BeardStyle } from "@/services/haircutRecommendationService"
import { Badge } from "@/components/ui/badge"

interface BeardRecommendationProps {
  beards: BeardStyle[]
  description?: string
}

const BeardRecommendation: React.FC<BeardRecommendationProps> = ({
  beards,
  description,
}) => {
  if (!beards.length) return null

  return (
    <div className="space-y-4">
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-normal text-gray-700">
            Recomendações de Barba
          </CardTitle>
          {description && (
            <p className="text-sm text-gray-500 font-light mt-1">
              {description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beards.map((beard) => (
              <Card key={beard.id} className="overflow-hidden border-gray-100">
                <div className="aspect-square relative">
                  <img
                    src={beard.imageUrl}
                    alt={beard.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-normal text-gray-800 mb-1">
                    {beard.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-light mb-3 line-clamp-2">
                    {beard.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-xs bg-gray-50 text-gray-600 font-light border-gray-200"
                    >
                      Manutenção {beard.maintenanceLevel}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {beard.rating.toFixed(1)} ★
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BeardRecommendation
