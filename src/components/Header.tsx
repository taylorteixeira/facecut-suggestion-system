import React from "react"
import { Scissors } from "lucide-react"

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-black p-2 rounded-full">
              <Scissors className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-light tracking-wide text-gray-900">
              FaceCut
            </h1>
          </div>
          <div className="text-sm text-gray-400 font-light">
            Análise Facial & Recomendações de Estilo
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
