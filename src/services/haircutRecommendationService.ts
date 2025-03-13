
import { FaceShape } from './faceDetectionService';

export interface Haircut {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  suitableFor: FaceShape[];
  attributes: string[];
  rating: number;
  gender: 'feminino' | 'masculino' | 'unisex';
}

// Banco de dados de cortes de cabelo categorizados por formato de rosto
const haircutsDatabase: Haircut[] = [
  // Cortes para Rosto Oval (Feminino)
  {
    id: 'oval-f1',
    name: 'Long Layered',
    description: 'Cabelo longo em camadas que emoldura o rosto com movimento e volume.',
    imageUrl: '/haircuts/female/oval-long-layered.jpg',
    suitableFor: ['oval'],
    attributes: ['longo', 'camadas', 'versátil'],
    rating: 4.8,
    gender: 'feminino'
  },
  {
    id: 'oval-f2',
    name: 'Bob Médio',
    description: 'Corte na altura do queixo que realça as maçãs do rosto.',
    imageUrl: '/haircuts/female/oval-bob.jpg',
    suitableFor: ['oval', 'diamond'],
    attributes: ['médio', 'clássico', 'elegante'],
    rating: 4.7,
    gender: 'feminino'
  },
  {
    id: 'oval-f3',
    name: 'Pixie com Franja',
    description: 'Corte curto moderno que destaca os olhos e as maçãs do rosto.',
    imageUrl: '/haircuts/female/oval-pixie.jpg',
    suitableFor: ['oval', 'heart'],
    attributes: ['curto', 'moderno', 'baixa manutenção'],
    rating: 4.6,
    gender: 'feminino'
  },
  
  // Cortes para Rosto Redondo (Feminino)
  {
    id: 'round-f1',
    name: 'Long Bob Assimétrico',
    description: 'Corte na altura dos ombros que alonga visualmente o rosto.',
    imageUrl: '/haircuts/female/round-lob.jpg',
    suitableFor: ['round'],
    attributes: ['médio', 'assimétrico', 'moderno'],
    rating: 4.7,
    gender: 'feminino'
  },
  {
    id: 'round-f2',
    name: 'Camadas Longas com Franja Lateral',
    description: 'Corte que cria linhas verticais para alongar o rosto.',
    imageUrl: '/haircuts/female/round-layers-side.jpg',
    suitableFor: ['round', 'square'],
    attributes: ['longo', 'camadas', 'franja'],
    rating: 4.6,
    gender: 'feminino'
  },
  {
    id: 'round-f3',
    name: 'Shaggy Médio',
    description: 'Corte texturizado com volume no topo para alongar visualmente o rosto.',
    imageUrl: '/haircuts/female/round-shaggy.jpg',
    suitableFor: ['round'],
    attributes: ['médio', 'texturizado', 'volume'],
    rating: 4.5,
    gender: 'feminino'
  },
  
  // Cortes para Rosto Quadrado (Feminino)
  {
    id: 'square-f1',
    name: 'Ondas Suaves Médias',
    description: 'Corte médio com ondas que suavizam os ângulos do rosto.',
    imageUrl: '/haircuts/female/square-waves.jpg',
    suitableFor: ['square'],
    attributes: ['médio', 'ondulado', 'suave'],
    rating: 4.8,
    gender: 'feminino'
  },
  {
    id: 'square-f2',
    name: 'Long Layers com Franja Cortina',
    description: 'Camadas longas com franja aberta que suaviza a testa.',
    imageUrl: '/haircuts/female/square-long-curtain.jpg',
    suitableFor: ['square', 'diamond'],
    attributes: ['longo', 'camadas', 'franja'],
    rating: 4.7,
    gender: 'feminino'
  },
  {
    id: 'square-f3',
    name: 'Bob Texturizado',
    description: 'Bob com textura e movimento que suaviza os ângulos.',
    imageUrl: '/haircuts/female/square-textured-bob.jpg',
    suitableFor: ['square', 'round'],
    attributes: ['curto', 'texturizado', 'moderno'],
    rating: 4.6,
    gender: 'feminino'
  },
  
  // Cortes para Rosto Coração (Feminino)
  {
    id: 'heart-f1',
    name: 'Bob com Franja',
    description: 'Bob clássico com franja que equilibra a largura da testa.',
    imageUrl: '/haircuts/female/heart-bob-bangs.jpg',
    suitableFor: ['heart'],
    attributes: ['médio', 'franja', 'clássico'],
    rating: 4.7,
    gender: 'feminino'
  },
  {
    id: 'heart-f2',
    name: 'Lob com Ondas',
    description: 'Long bob ondulado que adiciona volume na parte inferior do rosto.',
    imageUrl: '/haircuts/female/heart-wavy-lob.jpg',
    suitableFor: ['heart', 'diamond'],
    attributes: ['médio', 'ondulado', 'equilibrado'],
    rating: 4.8,
    gender: 'feminino'
  },
  {
    id: 'heart-f3',
    name: 'Pixie Longo',
    description: 'Pixie com mais comprimento no topo que na nuca.',
    imageUrl: '/haircuts/female/heart-long-pixie.jpg',
    suitableFor: ['heart', 'oval'],
    attributes: ['curto', 'moderno', 'elegante'],
    rating: 4.6,
    gender: 'feminino'
  },
  
  // Cortes para Rosto Longo (Feminino)
  {
    id: 'long-f1',
    name: 'Bob com Franja Reta',
    description: 'Bob com franja reta que encurta visualmente o rosto.',
    imageUrl: '/haircuts/female/long-bob-straight-bangs.jpg',
    suitableFor: ['long'],
    attributes: ['médio', 'franja', 'estruturado'],
    rating: 4.7,
    gender: 'feminino'
  },
  {
    id: 'long-f2',
    name: 'Shag com Franja Cortina',
    description: 'Corte em camadas com franja aberta que adiciona largura.',
    imageUrl: '/haircuts/female/long-shag-curtain.jpg',
    suitableFor: ['long', 'oval'],
    attributes: ['médio', 'texturizado', 'franja'],
    rating: 4.6,
    gender: 'feminino'
  },
  {
    id: 'long-f3',
    name: 'Ondas Volumosas Médias',
    description: 'Corte médio com ondas que criam largura e reduzem o comprimento visual.',
    imageUrl: '/haircuts/female/long-waves.jpg',
    suitableFor: ['long'],
    attributes: ['médio', 'ondulado', 'volumoso'],
    rating: 4.8,
    gender: 'feminino'
  },
  
  // Cortes para Rosto Diamante (Feminino)
  {
    id: 'diamond-f1',
    name: 'Long Layers com Franja Lateral',
    description: 'Camadas longas com franja lateral que suaviza os ângulos.',
    imageUrl: '/haircuts/female/diamond-long-side.jpg',
    suitableFor: ['diamond'],
    attributes: ['longo', 'camadas', 'franja'],
    rating: 4.7,
    gender: 'feminino'
  },
  {
    id: 'diamond-f2',
    name: 'Bob Suave com Ponta Invertida',
    description: 'Bob suave que complementa as maçãs do rosto.',
    imageUrl: '/haircuts/female/diamond-soft-bob.jpg',
    suitableFor: ['diamond', 'heart'],
    attributes: ['médio', 'suave', 'elegante'],
    rating: 4.8,
    gender: 'feminino'
  },
  {
    id: 'diamond-f3',
    name: 'Pixie com Franja Longa',
    description: 'Corte curto com franja mais longa que suaviza os ângulos.',
    imageUrl: '/haircuts/female/diamond-pixie-bangs.jpg',
    suitableFor: ['diamond', 'oval'],
    attributes: ['curto', 'franja', 'moderno'],
    rating: 4.6,
    gender: 'feminino'
  },
  
  // Cortes para Rosto Triângulo (Feminino)
  {
    id: 'triangle-f1',
    name: 'Bob Volumoso',
    description: 'Bob com volume no topo que equilibra a mandíbula mais larga.',
    imageUrl: '/haircuts/female/triangle-volumized-bob.jpg',
    suitableFor: ['triangle'],
    attributes: ['médio', 'volumoso', 'equilibrado'],
    rating: 4.7,
    gender: 'feminino'
  },
  {
    id: 'triangle-f2',
    name: 'Shag Curto com Camadas',
    description: 'Corte shag com camadas que cria volume no topo.',
    imageUrl: '/haircuts/female/triangle-short-shag.jpg',
    suitableFor: ['triangle', 'square'],
    attributes: ['curto', 'camadas', 'texturizado'],
    rating: 4.6,
    gender: 'feminino'
  },
  {
    id: 'triangle-f3',
    name: 'Long Layers com Volume no Topo',
    description: 'Camadas longas com volume no topo para equilibrar as proporções.',
    imageUrl: '/haircuts/female/triangle-long-top.jpg',
    suitableFor: ['triangle', 'heart'],
    attributes: ['longo', 'camadas', 'volumoso'],
    rating: 4.8,
    gender: 'feminino'
  }
];

// Imagens para desenvolvimento (utilizando imagens reais)
const placeholderImages: Record<string, string> = {
  'oval': 'https://images.unsplash.com/photo-1508216310976-c518daae0cdc?q=80&w=1974&auto=format&fit=crop',
  'round': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
  'square': 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1795&auto=format&fit=crop',
  'heart': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop',
  'long': 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1887&auto=format&fit=crop',
  'diamond': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop',
  'triangle': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
};

// Função para obter imagem placeholder para desenvolvimento
export const getPlaceholderImage = (haircut: Haircut): string => {
  // Usar o primeiro formato de rosto adequado para obter um placeholder
  const faceShape = haircut.suitableFor[0];
  // Para cortes com imagens reais, use a URL direta
  if (haircut.imageUrl.startsWith('http')) {
    return haircut.imageUrl;
  }
  // Caso contrário, use um placeholder baseado no formato do rosto
  return placeholderImages[faceShape] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop';
};

export const getRecommendedHaircuts = (faceShape: FaceShape, gender: 'feminino' | 'masculino' = 'feminino', limit: number = 5): Haircut[] => {
  // Filtrar cortes adequados para o formato do rosto detectado e gênero
  const suitable = haircutsDatabase.filter(haircut => 
    haircut.suitableFor.includes(faceShape) && 
    (haircut.gender === gender || haircut.gender === 'unisex')
  );
  
  // Ordenar por classificação (mais alta primeiro)
  const sorted = suitable.sort((a, b) => b.rating - a.rating);
  
  // Retornar as N principais recomendações
  return sorted.slice(0, limit);
};

export const getAllHaircuts = (gender: 'feminino' | 'masculino' = 'feminino'): Haircut[] => {
  return haircutsDatabase.filter(haircut => 
    haircut.gender === gender || haircut.gender === 'unisex'
  );
};

export const getHaircutById = (id: string): Haircut | undefined => {
  return haircutsDatabase.find(h => h.id === id);
};

export const getHaircutsForFaceShape = (faceShape: FaceShape, gender: 'feminino' | 'masculino' = 'feminino'): Haircut[] => {
  return haircutsDatabase.filter(haircut => 
    haircut.suitableFor.includes(faceShape) &&
    (haircut.gender === gender || haircut.gender === 'unisex')
  );
};

export const getFaceShapeDescription = (faceShape: FaceShape): string => {
  const descriptions: Record<FaceShape, string> = {
    oval: "Rostos ovais são bem equilibrados com uma testa ligeiramente mais larga e uma linha da mandíbula suavemente arredondada. Este formato versátil funciona bem com a maioria dos cortes de cabelo.",
    round: "Rostos redondos têm características suaves com um queixo arredondado e bochechas mais cheias. Estilos que adicionam altura e ângulos funcionam melhor para criar definição.",
    square: "Rostos quadrados têm uma linha da mandíbula forte e angular e geralmente uma testa mais larga. Estilos que suavizam os ângulos mantendo a proporção são ideais.",
    heart: "Rostos em forma de coração têm uma testa e maçãs do rosto mais largas com um queixo estreito. Equilibrar a largura no topo com estilos mais cheios na linha da mandíbula funciona bem.",
    long: "Rostos longos são mais compridos do que largos com testas altas. Estilos que criam largura e minimizam a altura ajudam a equilibrar as proporções.",
    diamond: "Rostos diamante têm testas e linhas da mandíbula estreitas com maçãs do rosto largas. Estilos que adicionam largura na testa e na linha da mandíbula são mais favorecedores.",
    triangle: "Rostos triângulos têm uma linha da mandíbula mais larga que se estreita na testa. Estilos que adicionam volume no topo ajudam a equilibrar as proporções."
  };
  
  return descriptions[faceShape] || "A análise do formato do rosto ajuda a determinar os cortes de cabelo mais favorecedores para suas características.";
};
