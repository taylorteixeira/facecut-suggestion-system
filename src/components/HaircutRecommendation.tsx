
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Haircut, getPlaceholderImage } from '@/services/haircutRecommendationService';
import { Badge } from "@/components/ui/badge";
import { Scissors, CheckCircle } from 'lucide-react';

interface HaircutRecommendationProps {
  haircuts: Haircut[];
  isLoading?: boolean;
}

const HaircutCard: React.FC<{ haircut: Haircut }> = ({ haircut }) => {
  // Use placeholder image for development
  const imageUrl = getPlaceholderImage(haircut);
  
  return (
    <div className="haircut-card">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={haircut.name} 
          className="haircut-card-image"
        />
        <div className="absolute bottom-0 right-0 bg-haircut-blue text-white rounded-tl-md px-2 py-1 text-xs font-medium">
          {haircut.rating.toFixed(1)} ★
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-base mb-1 flex items-center">
          <Scissors className="h-4 w-4 mr-1 text-haircut-gray" />
          {haircut.name}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{haircut.description}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {haircut.attributes.slice(0, 3).map((attr, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs bg-haircut-light text-haircut-gray"
            >
              {attr}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const HaircutRecommendation: React.FC<HaircutRecommendationProps> = ({ 
  haircuts, 
  isLoading = false 
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
              <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
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
              Position your face in the camera view to get personalized haircut recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-haircut-blue" />
          Recommended Haircuts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {haircuts.map((haircut) => (
            <HaircutCard key={haircut.id} haircut={haircut} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HaircutRecommendation;
