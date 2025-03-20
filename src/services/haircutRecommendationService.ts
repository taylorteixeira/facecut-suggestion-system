import { FaceShape } from "./faceDetectionService"

export interface Haircut {
  id: string
  name: string
  description: string
  imageUrl: string
  suitableFor: FaceShape[]
  attributes: string[]
  rating: number
}

// Adicionar tipo para barba
export interface BeardStyle {
  id: string
  name: string
  description: string
  imageUrl: string
  suitableFor: FaceShape[]
  maintenanceLevel: "baixa" | "média" | "alta"
  rating: number
}

// Database of haircuts categorized by face shape
const haircutsDatabase: Haircut[] = [
  // Cortes para Rosto Oval
  {
    id: "oval-1",
    name: "Degradê Texturizado",
    description:
      "Um estilo moderno e versátil com topo texturizado e laterais em degradê.",
    imageUrl: "https://i.imgur.com/degradeTexturizado.jpg",
    suitableFor: ["oval"],
    attributes: ["curto", "moderno", "baixa-manutenção"],
    rating: 4.8,
  },
  {
    id: "oval-2",
    name: "Topete Clássico",
    description: "Um estilo elegante com volume no topo e laterais degradê.",
    imageUrl: "https://i.imgur.com/topeteClassico.jpg",
    suitableFor: ["oval", "diamond"],
    attributes: ["clássico", "formal", "médio"],
    rating: 4.7,
  },
  {
    id: "oval-3",
    name: "Médio em Camadas",
    description:
      "Comprimento médio com textura em camadas para um visual refinado.",
    imageUrl: "https://i.imgur.com/medioEmCamadas.jpg",
    suitableFor: ["oval", "long"],
    attributes: ["médio", "versátil", "fácil-de-estilizar"],
    rating: 4.5,
  },

  // Cortes para Rosto Redondo
  {
    id: "round-1",
    name: "Franja Angular",
    description:
      "Cria ângulos e definição para equilibrar traços arredondados.",
    imageUrl: "https://i.imgur.com/franjaAngular.jpg",
    suitableFor: ["round", "oval"],
    attributes: ["médio", "angular", "moderno"],
    rating: 4.6,
  },
  {
    id: "round-2",
    name: "Undercut com Divisão Lateral",
    description:
      "Adiciona altura e estrutura com laterais curtas e topo mais longo.",
    imageUrl: "https://i.imgur.com/undercut.jpg",
    suitableFor: ["round"],
    attributes: ["laterais-curtas", "alto-contraste", "moderno"],
    rating: 4.7,
  },
  {
    id: "round-3",
    name: "Moicano Moderno",
    description: "Cria volume vertical para alongar o formato do rosto.",
    imageUrl: "https://i.imgur.com/moicano.jpg",
    suitableFor: ["round", "triangle"],
    attributes: ["ousado", "texturizado", "urbano"],
    rating: 4.4,
  },

  // Cortes para Rosto Quadrado
  {
    id: "square-1",
    name: "Penteado para Trás Texturizado",
    description: "Suaviza os ângulos mantendo um visual masculino.",
    imageUrl: "https://i.imgur.com/penteadoTras.jpg",
    suitableFor: ["square", "diamond"],
    attributes: ["versátil", "clássico", "médio"],
    rating: 4.8,
  },
  {
    id: "square-2",
    name: "Franja Bagunçada",
    description:
      "Adiciona suavidade ao maxilar forte com camadas texturizadas.",
    imageUrl: "https://i.imgur.com/franjaBaguncada.jpg",
    suitableFor: ["square"],
    attributes: ["casual", "texturizado", "moderno"],
    rating: 4.6,
  },
  {
    id: "square-3",
    name: "Corte Militar Moderno",
    description: "Estilo curto e limpo que combina bem com traços fortes.",
    imageUrl: "https://i.imgur.com/corteMilitar.jpg",
    suitableFor: ["square", "oval"],
    attributes: ["curto", "baixa-manutenção", "clássico"],
    rating: 4.5,
  },

  // Cortes para Rosto Coração
  {
    id: "heart-1",
    name: "Franja Lateral",
    description: "Equilibra a testa mais larga com textura lateral.",
    imageUrl: "https://i.imgur.com/franjaLateral.jpg",
    suitableFor: ["heart", "triangle"],
    attributes: ["médio", "assimétrico", "estiloso"],
    rating: 4.7,
  },
  {
    id: "heart-2",
    name: "Médio com Camadas",
    description:
      "Adiciona volume na linha do maxilar para equilibrar proporções.",
    imageUrl: "https://i.imgur.com/medioCamadas.jpg",
    suitableFor: ["heart"],
    attributes: ["médio", "camadas", "versátil"],
    rating: 4.6,
  },
  {
    id: "heart-3",
    name: "Topete Texturizado",
    description: "Cria equilíbrio com volume no topo e laterais alinhadas.",
    imageUrl: "https://i.imgur.com/topeteTexturizado.jpg",
    suitableFor: ["heart", "oval"],
    attributes: ["médio", "texturizado", "estiloso"],
    rating: 4.8,
  },

  // Long Face Shape Haircuts
  {
    id: "long-1",
    name: "Side-Parted Crop",
    description: "Adds width to the face with horizontal volume.",
    imageUrl: "/haircuts/long-side-parted.jpg",
    suitableFor: ["long"],
    attributes: ["short", "classic", "professional"],
    rating: 4.5,
  },
  {
    id: "long-2",
    name: "Textured Layers",
    description: "Creates width with layered sides and textured volume.",
    imageUrl: "/haircuts/long-textured-layers.jpg",
    suitableFor: ["long", "oval"],
    attributes: ["medium-length", "textured", "casual"],
    rating: 4.6,
  },
  {
    id: "long-3",
    name: "Modern Caesar",
    description: "Horizontal fringe that shortens face appearance.",
    imageUrl: "/haircuts/long-caesar.jpg",
    suitableFor: ["long", "oval"],
    attributes: ["short", "fringe", "low-maintenance"],
    rating: 4.4,
  },

  // Diamond Face Shape Haircuts
  {
    id: "diamond-1",
    name: "Textured Fringe",
    description: "Softens angular features with textured layers.",
    imageUrl: "/haircuts/diamond-textured-fringe.jpg",
    suitableFor: ["diamond"],
    attributes: ["medium-length", "textured", "modern"],
    rating: 4.7,
  },
  {
    id: "diamond-2",
    name: "Classic Taper",
    description: "Balanced style that complements cheekbone structure.",
    imageUrl: "/haircuts/diamond-classic-taper.jpg",
    suitableFor: ["diamond", "oval"],
    attributes: ["classic", "versatile", "medium-length"],
    rating: 4.8,
  },
  {
    id: "diamond-3",
    name: "Brushed Back",
    description: "Adds volume to complement high cheekbones.",
    imageUrl: "/haircuts/diamond-brushed-back.jpg",
    suitableFor: ["diamond", "heart"],
    attributes: ["medium-length", "elegant", "structured"],
    rating: 4.6,
  },

  // Triangle Face Shape Haircuts
  {
    id: "triangle-1",
    name: "Volume Quiff",
    description: "Adds volume on top to balance wider jaw.",
    imageUrl: "/haircuts/triangle-quiff.jpg",
    suitableFor: ["triangle"],
    attributes: ["voluminous", "modern", "stylish"],
    rating: 4.7,
  },
  {
    id: "triangle-2",
    name: "Textured Crop with Fringe",
    description: "Creates width at the top with textured styling.",
    imageUrl: "/haircuts/triangle-crop-fringe.jpg",
    suitableFor: ["triangle", "square"],
    attributes: ["modern", "textured", "trendy"],
    rating: 4.6,
  },
  {
    id: "triangle-3",
    name: "Pompadour with Fade",
    description: "High volume on top balances proportions perfectly.",
    imageUrl: "/haircuts/triangle-pompadour.jpg",
    suitableFor: ["triangle", "oval"],
    attributes: ["statement", "high-volume", "stylish"],
    rating: 4.8,
  },
]

// Banco de dados de estilos de barba
const beardsDatabase: BeardStyle[] = [
  // Barbas para Rosto Oval
  {
    id: "beard-oval-1",
    name: "Barba Curta Aparada",
    description:
      "Barba curta e bem aparada que mantém o formato natural do rosto.",
    imageUrl: "https://i.imgur.com/barbaCurta.jpg",
    suitableFor: ["oval"],
    maintenanceLevel: "baixa",
    rating: 4.8,
  },
  {
    id: "beard-oval-2",
    name: "Barba Média Esculpida",
    description:
      "Barba média com contornos bem definidos que complementa o formato do rosto.",
    imageUrl: "https://i.imgur.com/barbaMedia.jpg",
    suitableFor: ["oval", "diamond"],
    maintenanceLevel: "média",
    rating: 4.7,
  },
  {
    id: "beard-oval-3",
    name: "Barba Cheia Clássica",
    description: "Barba cheia e bem cuidada que mantém a harmonia facial.",
    imageUrl: "https://i.imgur.com/barbaCheiaClassica.jpg",
    suitableFor: ["oval"],
    maintenanceLevel: "alta",
    rating: 4.9,
  },

  // Barbas para Rosto Redondo
  {
    id: "beard-round-1",
    name: "Barba Angular",
    description:
      "Barba com ângulos definidos para criar mais estrutura no rosto.",
    imageUrl: "https://i.imgur.com/barbaAngular.jpg",
    suitableFor: ["round"],
    maintenanceLevel: "alta",
    rating: 4.6,
  },
  {
    id: "beard-round-2",
    name: "Cavanhaque Alongado",
    description: "Cavanhaque que ajuda a alongar o rosto redondo.",
    imageUrl: "https://i.imgur.com/cavanhaque.jpg",
    suitableFor: ["round"],
    maintenanceLevel: "média",
    rating: 4.5,
  },
  {
    id: "beard-round-3",
    name: "Barba em Ponta",
    description:
      "Barba que afina na ponta para criar um efeito de alongamento.",
    imageUrl: "https://i.imgur.com/barbaPonta.jpg",
    suitableFor: ["round"],
    maintenanceLevel: "alta",
    rating: 4.7,
  },

  // Barbas para Rosto Quadrado
  {
    id: "beard-square-1",
    name: "Barba Arredondada",
    description: "Barba com contornos suaves que suaviza ângulos fortes.",
    imageUrl: "https://i.imgur.com/barbaArredondada.jpg",
    suitableFor: ["square"],
    maintenanceLevel: "média",
    rating: 4.7,
  },
  {
    id: "beard-square-2",
    name: "Barba Curta Uniforme",
    description:
      "Barba curta e uniforme que mantém a masculinidade sem acentuar ângulos.",
    imageUrl: "https://i.imgur.com/barbaCurtaUniforme.jpg",
    suitableFor: ["square"],
    maintenanceLevel: "baixa",
    rating: 4.6,
  },
  {
    id: "beard-square-3",
    name: "Barba Degradê",
    description:
      "Barba com transição suave que harmoniza com os traços angulares.",
    imageUrl: "https://i.imgur.com/barbaDegrade.jpg",
    suitableFor: ["square"],
    maintenanceLevel: "alta",
    rating: 4.8,
  },

  // Barbas para Rosto Coração
  {
    id: "beard-heart-1",
    name: "Barba Cheia Equilibrada",
    description: "Barba volumosa que ajuda a equilibrar o queixo mais fino.",
    imageUrl: "https://i.imgur.com/barbaCheiaEquilibrada.jpg",
    suitableFor: ["heart"],
    maintenanceLevel: "alta",
    rating: 4.8,
  },
  {
    id: "beard-heart-2",
    name: "Barba Média Balanceada",
    description:
      "Barba média que adiciona volume ao queixo mantendo proporção.",
    imageUrl: "https://i.imgur.com/barbaMediaBalanceada.jpg",
    suitableFor: ["heart"],
    maintenanceLevel: "média",
    rating: 4.7,
  },
  {
    id: "beard-heart-3",
    name: "Barba Curta Estruturada",
    description:
      "Barba curta que adiciona estrutura ao queixo sem peso excessivo.",
    imageUrl: "https://i.imgur.com/barbaCurtaEstruturada.jpg",
    suitableFor: ["heart"],
    maintenanceLevel: "baixa",
    rating: 4.6,
  },

  // Barbas para Rosto Longo
  {
    id: "beard-long-1",
    name: "Barba Lateral Cheia",
    description:
      "Barba com volume nas laterais para reduzir o comprimento aparente do rosto.",
    imageUrl: "https://i.imgur.com/barbaLateralCheia.jpg",
    suitableFor: ["long"],
    maintenanceLevel: "alta",
    rating: 4.7,
  },
  {
    id: "beard-long-2",
    name: "Barba Curta Volumosa",
    description:
      "Barba curta com volume que ajuda a equilibrar as proporções faciais.",
    imageUrl: "https://i.imgur.com/barbaCurtaVolumosa.jpg",
    suitableFor: ["long"],
    maintenanceLevel: "média",
    rating: 4.6,
  },

  // Barbas para Rosto Diamante
  {
    id: "beard-diamond-1",
    name: "Barba Média Equilibrada",
    description: "Barba que equilibra as maçãs do rosto proeminentes.",
    imageUrl: "https://i.imgur.com/barbaMediaEquilibrada.jpg",
    suitableFor: ["diamond"],
    maintenanceLevel: "média",
    rating: 4.7,
  },
  {
    id: "beard-diamond-2",
    name: "Barba Curta Definida",
    description: "Barba curta que mantém a harmonia com os traços faciais.",
    imageUrl: "https://i.imgur.com/barbaCurtaDefinida.jpg",
    suitableFor: ["diamond"],
    maintenanceLevel: "baixa",
    rating: 4.6,
  },

  // Barbas para Rosto Triangular
  {
    id: "beard-triangle-1",
    name: "Barba Curta Uniforme",
    description:
      "Barba curta que mantém o equilíbrio com a mandíbula mais larga.",
    imageUrl: "https://i.imgur.com/barbaCurtaUniforme.jpg",
    suitableFor: ["triangle"],
    maintenanceLevel: "baixa",
    rating: 4.6,
  },
  {
    id: "beard-triangle-2",
    name: "Barba Média Estruturada",
    description: "Barba média que ajuda a equilibrar as proporções faciais.",
    imageUrl: "https://i.imgur.com/barbaMediaEstruturada.jpg",
    suitableFor: ["triangle"],
    maintenanceLevel: "média",
    rating: 4.7,
  },
]

// Placeholder images for development
const placeholderImages: Record<string, string> = {
  oval: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1974&auto=format&fit=crop",
  round:
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop",
  square:
    "https://images.unsplash.com/photo-1618886614638-80e3c103d465?q=80&w=1970&auto=format&fit=crop",
  heart:
    "https://images.unsplash.com/photo-1548536902-6ab598cd4def?q=80&w=1964&auto=format&fit=crop",
  long: "https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=1976&auto=format&fit=crop",
  diamond:
    "https://images.unsplash.com/photo-1626033740248-7071c609015f?q=80&w=1974&auto=format&fit=crop",
  triangle:
    "https://images.unsplash.com/photo-1614244376374-c96d72eeaf19?q=80&w=1974&auto=format&fit=crop",
}

// Function to get placeholder image for development
export const getPlaceholderImage = (haircut: Haircut): string => {
  // Use the first suitable face shape to get a placeholder
  const faceShape = haircut.suitableFor[0]
  return (
    placeholderImages[faceShape] ||
    "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1974&auto=format&fit=crop"
  )
}

export const getRecommendedHaircuts = (faceShape: FaceShape): Haircut[] => {
  const recommendations: Record<FaceShape, Haircut[]> = {
    oval: [
      {
        id: "pompadour",
        name: "Pompadour Moderno",
        description:
          "Um corte clássico com volume na parte superior e laterais mais curtas. Ideal para realçar suas proporções equilibradas.",
        imageUrl: "/images/haircuts/pompadour.jpg",
        suitableFor: ["oval"],
        attributes: ["versátil", "moderno", "sofisticado"],
        rating: 4.8,
      },
      {
        id: "textured-crop",
        name: "Crop Texturizado",
        description:
          "Um corte moderno com textura e movimento. Perfeito para realçar a versatilidade do seu formato facial.",
        imageUrl: "/images/haircuts/textured-crop.jpg",
        suitableFor: ["oval"],
        attributes: ["contemporâneo", "versátil", "baixa manutenção"],
        rating: 4.6,
      },
    ],
    round: [
      {
        id: "angular-pompadour",
        name: "Pompadour Angular",
        description:
          "Um corte com ângulos definidos e volume na parte superior para criar a ilusão de comprimento.",
        imageUrl: "/images/haircuts/angular-pompadour.jpg",
        suitableFor: ["round"],
        attributes: ["estruturado", "moderno", "definido"],
        rating: 4.7,
      },
      {
        id: "side-swept",
        name: "Side Swept",
        description:
          "Um corte com franja lateral para criar linhas mais longas e quebrar a redondeza do rosto.",
        imageUrl: "/images/haircuts/side-swept.jpg",
        suitableFor: ["round"],
        attributes: ["versátil", "moderno", "suave"],
        rating: 4.5,
      },
    ],
    square: [
      {
        id: "textured-quiff",
        name: "Quiff Texturizado",
        description:
          "Um corte com volume e textura para suavizar os ângulos do rosto.",
        imageUrl: "/images/haircuts/textured-quiff.jpg",
        suitableFor: ["square"],
        attributes: ["moderno", "texturizado", "versátil"],
        rating: 4.7,
      },
      {
        id: "longer-top",
        name: "Topo Mais Longo",
        description:
          "Um corte com mais comprimento no topo para criar contraste com as laterais mais curtas.",
        imageUrl: "/images/haircuts/longer-top.jpg",
        suitableFor: ["square"],
        attributes: ["contemporâneo", "estruturado", "versátil"],
        rating: 4.6,
      },
    ],
    heart: [
      {
        id: "side-parted",
        name: "Lateral Partido",
        description:
          "Um corte com divisão lateral para equilibrar a largura da testa.",
        imageUrl: "/images/haircuts/side-parted.jpg",
        suitableFor: ["heart"],
        attributes: ["clássico", "sofisticado", "versátil"],
        rating: 4.8,
      },
      {
        id: "textured-fringe",
        name: "Franja Texturizada",
        description:
          "Um corte com franja texturizada para criar equilíbrio com a mandíbula mais estreita.",
        imageUrl: "/images/haircuts/textured-fringe.jpg",
        suitableFor: ["heart"],
        attributes: ["moderno", "versátil", "suave"],
        rating: 4.6,
      },
    ],
    long: [
      {
        id: "textured-crop-long",
        name: "Crop Texturizado Longo",
        description:
          "Um corte com volume lateral para criar a ilusão de largura.",
        imageUrl: "/images/haircuts/textured-crop-long.jpg",
        suitableFor: ["long"],
        attributes: ["moderno", "versátil", "estruturado"],
        rating: 4.7,
      },
      {
        id: "side-swept-long",
        name: "Side Swept Longo",
        description:
          "Um corte com franja lateral e volume nas laterais para equilibrar o comprimento do rosto.",
        imageUrl: "/images/haircuts/side-swept-long.jpg",
        suitableFor: ["long"],
        attributes: ["versátil", "moderno", "suave"],
        rating: 4.5,
      },
    ],
    diamond: [
      {
        id: "textured-top",
        name: "Topo Texturizado",
        description:
          "Um corte com volume e textura no topo para equilibrar as maçãs do rosto proeminentes.",
        imageUrl: "/images/haircuts/textured-top.jpg",
        suitableFor: ["diamond"],
        attributes: ["moderno", "versátil", "estruturado"],
        rating: 4.7,
      },
      {
        id: "side-parted-diamond",
        name: "Lateral Partido Diamante",
        description:
          "Um corte com divisão lateral para criar equilíbrio com o formato diamante.",
        imageUrl: "/images/haircuts/side-parted-diamond.jpg",
        suitableFor: ["diamond"],
        attributes: ["clássico", "sofisticado", "versátil"],
        rating: 4.6,
      },
    ],
    triangle: [
      {
        id: "volume-top",
        name: "Volume no Topo",
        description:
          "Um corte com mais volume na parte superior para equilibrar a mandíbula mais larga.",
        imageUrl: "/images/haircuts/volume-top.jpg",
        suitableFor: ["triangle"],
        attributes: ["moderno", "estruturado", "versátil"],
        rating: 4.7,
      },
      {
        id: "textured-sides",
        name: "Laterais Texturizadas",
        description:
          "Um corte com textura nas laterais para criar equilíbrio com a mandíbula.",
        imageUrl: "/images/haircuts/textured-sides.jpg",
        suitableFor: ["triangle"],
        attributes: ["contemporâneo", "versátil", "suave"],
        rating: 4.5,
      },
    ],
  }
  return recommendations[faceShape]
}

export const getAllHaircuts = (): Haircut[] => {
  return haircutsDatabase
}

export const getHaircutById = (id: string): Haircut | undefined => {
  return haircutsDatabase.find((h) => h.id === id)
}

export const getHaircutsForFaceShape = (faceShape: FaceShape): Haircut[] => {
  return haircutsDatabase.filter((haircut) =>
    haircut.suitableFor.includes(faceShape)
  )
}

export const getFaceShapeDescription = (faceShape: FaceShape): string => {
  const descriptions: Record<FaceShape, string> = {
    oval: "Seu rosto tem um formato oval, que é considerado o mais versátil. As proporções são equilibradas, com a mandíbula ligeiramente mais estreita que as maçãs do rosto.",
    round:
      "Seu rosto tem um formato redondo, com maçãs do rosto proeminentes e uma mandíbula mais suave. O comprimento e a largura são similares.",
    square:
      "Seu rosto tem um formato quadrado, com uma mandíbula forte e ângulos bem definidos. A largura da testa, maçãs do rosto e mandíbula são similares.",
    heart:
      "Seu rosto tem um formato coração, com uma testa mais larga que se afunila em direção ao queixo. As maçãs do rosto são proeminentes.",
    long: "Seu rosto tem um formato alongado, com comprimento maior que a largura. A mandíbula e a testa têm larguras similares.",
    diamond:
      "Seu rosto tem um formato diamante, com maçãs do rosto proeminentes e testa e mandíbula mais estreitas.",
    triangle:
      "Seu rosto tem um formato triangular, com uma mandíbula mais larga que se afunila em direção à testa.",
  }
  return (
    descriptions[faceShape] ||
    "A análise do formato do rosto ajuda a determinar os cortes de cabelo mais favoráveis para seus traços."
  )
}

// Funções para recomendação de barba
export const getRecommendedBeards = (
  faceShape: FaceShape,
  limit: number = 3
): BeardStyle[] => {
  const suitable = beardsDatabase.filter((beard) =>
    beard.suitableFor.includes(faceShape)
  )

  const sorted = suitable.sort((a, b) => b.rating - a.rating)

  return sorted.slice(0, limit)
}

export const getAllBeards = (): BeardStyle[] => {
  return beardsDatabase
}

export const getBeardById = (id: string): BeardStyle | undefined => {
  return beardsDatabase.find((b) => b.id === id)
}

// Descrições de barba por formato de rosto
export const getBeardRecommendationDescription = (
  faceShape: FaceShape
): string => {
  const descriptions: Record<FaceShape, string> = {
    oval: "Para rostos ovais, que são naturalmente equilibrados, você tem a liberdade de experimentar diversos estilos de barba. Recomendamos manter as proporções harmoniosas com uma barba bem aparada que acompanhe o contorno natural do rosto.",
    round:
      "Para rostos redondos, o ideal são barbas que criam ângulos e alongam visualmente o rosto. Opte por estilos que mantenham volume no queixo e laterais mais curtas para criar definição.",
    square:
      "Para rostos quadrados, que já possuem ângulos marcantes, sugerimos barbas com contornos mais suaves para equilibrar os traços. Evite barbas muito angulares e prefira transições suaves.",
    heart:
      "Para rostos coração, com testa mais larga e queixo mais fino, recomendamos barbas que adicionem volume na parte inferior do rosto. Uma barba mais cheia no queixo ajuda a equilibrar as proporções.",
    long: "Para rostos longos, o ideal são barbas que criem largura sem adicionar muito comprimento. Mantenha volume nas laterais e evite barbas muito longas no queixo.",
    diamond:
      "Para rostos diamante, com maçãs do rosto proeminentes, sugerimos barbas médias que ajudem a suavizar os ângulos. Mantenha um equilíbrio entre volume e definição.",
    triangle:
      "Para rostos triangulares, com mandíbula mais larga, recomendamos barbas mais curtas e uniformes que não acentuem a largura da parte inferior. Foque em estilos que mantenham proporção com a parte superior do rosto.",
  }
  return (
    descriptions[faceShape] ||
    "A escolha do estilo de barba ideal depende do seu formato de rosto e pode ajudar a equilibrar suas características faciais."
  )
}
