import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-400 font-light">
          <p>&copy; {new Date().getFullYear()} FaceCut</p>
          <p className="mt-1">Análise Facial & Recomendações de Estilo</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
