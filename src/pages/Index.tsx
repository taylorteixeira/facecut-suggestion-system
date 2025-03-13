
import React, { useState } from 'react';
import WebcamCapture from '@/components/WebcamCapture';
import FaceShapeAnalysis from '@/components/FaceShapeAnalysis';
import HaircutRecommendation from '@/components/HaircutRecommendation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaceData, FaceShape } from '@/services/faceDetectionService';
import { getRecommendedHaircuts, Haircut } from '@/services/haircutRecommendationService';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UserRound, Camera, Info } from 'lucide-react';

const Index = () => {
  const [faceData, setFaceData] = useState<FaceData | null>(null);
  const [recommendations, setRecommendations] = useState<Haircut[]>([]);
  const [activeTab, setActiveTab] = useState<string>('camera');
  
  // Lidar com detecção facial
  const handleFaceDetected = (data: FaceData | null) => {
    setFaceData(data);
    
    if (data && data.faceShape) {
      // Usar a propriedade gender se disponível, ou 'feminino' como padrão
      const gender = data.gender || 'feminino';
      const haircuts = getRecommendedHaircuts(data.faceShape, gender);
      setRecommendations(haircuts);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-haircut-light">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <Alert className="mb-6 bg-white">
            <Info className="h-4 w-4" />
            <AlertTitle>Bem-vindo ao FaceCut</AlertTitle>
            <AlertDescription>
              Nosso sistema de análise facial detecta o formato do seu rosto e sugere estilos de corte de cabelo adequados.
              Comece habilitando sua câmera e posicionando seu rosto no quadro.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="camera" className="flex items-center">
                    <Camera className="mr-2 h-4 w-4" />
                    Câmera
                  </TabsTrigger>
                  <TabsTrigger value="results" className="flex items-center">
                    <UserRound className="mr-2 h-4 w-4" />
                    Análise
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="camera" className="p-0">
                  <Card>
                    <CardContent className="p-0">
                      <WebcamCapture 
                        onFaceDetected={handleFaceDetected} 
                        className="aspect-video" 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="results">
                  {faceData ? (
                    <div className="space-y-4">
                      <FaceShapeAnalysis 
                        faceShape={faceData.faceShape} 
                        confidence={faceData.confidence} 
                      />
                      <HaircutRecommendation haircuts={recommendations} />
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <UserRound className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Nenhum Rosto Detectado</h3>
                        <p className="text-muted-foreground">
                          Alterne para a guia Câmera e posicione seu rosto no quadro para análise.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:col-span-1">
              <FaceShapeAnalysis 
                faceShape={faceData?.faceShape || null} 
                confidence={faceData?.confidence || null} 
              />
            </div>
          </div>
          
          <HaircutRecommendation haircuts={recommendations} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
