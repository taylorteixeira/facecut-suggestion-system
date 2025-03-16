import React, { useState } from "react"
import WebcamCapture from "@/components/WebcamCapture"
import FaceShapeAnalysis from "@/components/FaceShapeAnalysis"
import HaircutRecommendation from "@/components/HaircutRecommendation"
import BeardRecommendation from "@/components/BeardRecommendation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { FaceData } from "@/services/faceDetectionService"
import {
  getRecommendedHaircuts,
  getRecommendedBeards,
  getBeardRecommendationDescription,
  Haircut,
  BeardStyle,
} from "@/services/haircutRecommendationService"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserRound, Camera, Info } from "lucide-react"

const Index = () => {
  const [faceData, setFaceData] = useState<FaceData | null>(null)
  const [recommendations, setRecommendations] = useState<Haircut[]>([])
  const [beardRecommendations, setBeardRecommendations] = useState<
    BeardStyle[]
  >([])
  const [activeTab, setActiveTab] = useState<string>("camera")

  // Handle face detection
  const handleFaceDetected = (data: FaceData | null) => {
    setFaceData(data)

    if (data && data.faceShape) {
      const haircuts = getRecommendedHaircuts(data.faceShape)
      const beards = getRecommendedBeards(data.faceShape)
      setRecommendations(haircuts)
      setBeardRecommendations(beards)
    } else {
      setRecommendations([])
      setBeardRecommendations([])
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Alert className="mb-8 bg-white border-gray-200 shadow-sm">
            <Info className="h-4 w-4 text-gray-400" />
            <AlertTitle className="text-gray-700 font-normal">
              Bem-vindo ao FaceCut
            </AlertTitle>
            <AlertDescription className="text-gray-500 font-light">
              Nosso sistema analisa o formato do seu rosto e sugere estilos de
              corte de cabelo e barba adequados. Posicione seu rosto na câmera
              para começar.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-8"
              >
                <TabsList className="grid grid-cols-2 w-full bg-white border h-70 border-gray-100">
                  <TabsTrigger
                    value="camera"
                    className="flex items-center py-3 data-[state=active]:bg-gray-50"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Câmera
                  </TabsTrigger>
                  <TabsTrigger
                    value="results"
                    className="flex items-center py-3 data-[state=active]:bg-gray-50"
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    Análise
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="camera" className="p-0 mt-4">
                  <Card className="overflow-hidden border-gray-100 shadow-sm">
                    <CardContent className="p-0">
                      <WebcamCapture
                        onFaceDetected={handleFaceDetected}
                        className="aspect-video"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="results" className="mt-4">
                  {faceData ? (
                    <div className="space-y-8">
                      <FaceShapeAnalysis
                        faceShape={faceData.faceShape}
                        confidence={faceData.confidence}
                      />
                      <HaircutRecommendation haircuts={recommendations} />
                      <BeardRecommendation
                        beards={beardRecommendations}
                        description={
                          faceData.faceShape
                            ? getBeardRecommendationDescription(
                                faceData.faceShape
                              )
                            : undefined
                        }
                      />
                    </div>
                  ) : (
                    <Card className="border-gray-100 shadow-sm">
                      <CardContent className="p-8 text-center">
                        <UserRound className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-normal text-gray-700 mb-2">
                          Nenhum Rosto Detectado
                        </h3>
                        <p className="text-gray-500 font-light">
                          Alterne para a aba Câmera e posicione seu rosto no
                          enquadramento para análise.
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
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Index
