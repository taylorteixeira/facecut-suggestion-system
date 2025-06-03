import React from "react"
import { Scissors } from "lucide-react"
import { TiArrowBack } from "react-icons/ti";
 
const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* Esquerda: Voltar (link externo) */}
          <a 
            href="https://cfp-client.vercel.app/dashboard"
            className="flex items-center gap-1 text-sm text-gray-600 font-medium cursor-pointer hover:text-gray-800 transition"
          >
            <TiArrowBack className="text-lg text-gray-600" />
            Voltar
          </a>

          {/* Centro: Ícone e nome */}
          <div className="flex items-center space-x-3">
            <div className="bg-black p-2 rounded-full">
              <Scissors className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-light tracking-wide text-gray-900">
              FaceCut
            </h1>
          </div>

          {/* Direita: Descrição */}
          <div className="text-sm text-gray-400 font-light text-right leading-snug">
            Análise Facial &<br />Recomendações de Estilo
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
