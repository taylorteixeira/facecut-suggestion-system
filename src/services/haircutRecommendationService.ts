
import { FaceShape } from './faceDetectionService';

export interface Haircut {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  suitableFor: FaceShape[];
  attributes: string[];
  rating: number;
}

// Database of haircuts categorized by face shape
const haircutsDatabase: Haircut[] = [
  // Oval Face Shape Haircuts
  {
    id: 'oval-1',
    name: 'Textured Crop',
    description: 'A versatile, modern style with textured top and short sides.',
    imageUrl: '/haircuts/oval-textured-crop.jpg',
    suitableFor: ['oval'],
    attributes: ['short', 'modern', 'low-maintenance'],
    rating: 4.8
  },
  {
    id: 'oval-2',
    name: 'Classic Pompadour',
    description: 'An elegant style with volume on top and tapered sides.',
    imageUrl: '/haircuts/oval-pompadour.jpg',
    suitableFor: ['oval', 'diamond'],
    attributes: ['classic', 'formal', 'medium-length'],
    rating: 4.7
  },
  {
    id: 'oval-3',
    name: 'Layered Medium',
    description: 'Medium length with layered texture for a refined look.',
    imageUrl: '/haircuts/oval-layered-medium.jpg',
    suitableFor: ['oval', 'long'],
    attributes: ['medium-length', 'versatile', 'easy-to-style'],
    rating: 4.5
  },
  
  // Round Face Shape Haircuts
  {
    id: 'round-1',
    name: 'Angular Fringe',
    description: 'Creates angles and definition to balance round features.',
    imageUrl: '/haircuts/round-angular-fringe.jpg',
    suitableFor: ['round', 'oval'],
    attributes: ['medium-length', 'angular', 'modern'],
    rating: 4.6
  },
  {
    id: 'round-2',
    name: 'Side Part Undercut',
    description: 'Adds height and structure with short sides and longer top.',
    imageUrl: '/haircuts/round-undercut.jpg',
    suitableFor: ['round'],
    attributes: ['short-sides', 'high-contrast', 'trendy'],
    rating: 4.7
  },
  {
    id: 'round-3',
    name: 'Faux Hawk',
    description: 'Creates vertical volume to elongate the face shape.',
    imageUrl: '/haircuts/round-faux-hawk.jpg',
    suitableFor: ['round', 'triangle'],
    attributes: ['edgy', 'textured', 'urban'],
    rating: 4.4
  },
  
  // Square Face Shape Haircuts
  {
    id: 'square-1',
    name: 'Textured Slick Back',
    description: 'Softens angles while maintaining a masculine look.',
    imageUrl: '/haircuts/square-slick-back.jpg',
    suitableFor: ['square', 'diamond'],
    attributes: ['versatile', 'classic', 'medium-length'],
    rating: 4.8
  },
  {
    id: 'square-2',
    name: 'Messy Fringe',
    description: 'Adds softness to strong jawlines with textured layers.',
    imageUrl: '/haircuts/square-messy-fringe.jpg',
    suitableFor: ['square'],
    attributes: ['casual', 'textured', 'trendy'],
    rating: 4.6
  },
  {
    id: 'square-3',
    name: 'Brush Cut',
    description: 'Short, clean style that works well with strong features.',
    imageUrl: '/haircuts/square-brush-cut.jpg',
    suitableFor: ['square', 'oval'],
    attributes: ['short', 'low-maintenance', 'classic'],
    rating: 4.5
  },
  
  // Heart Face Shape Haircuts
  {
    id: 'heart-1',
    name: 'Side-Swept Bangs',
    description: 'Balances wider forehead with side-swept texture.',
    imageUrl: '/haircuts/heart-side-swept.jpg',
    suitableFor: ['heart', 'triangle'],
    attributes: ['medium-length', 'asymmetric', 'stylish'],
    rating: 4.7
  },
  {
    id: 'heart-2',
    name: 'Mid-Length Layers',
    description: 'Adds volume at jawline to balance proportions.',
    imageUrl: '/haircuts/heart-mid-layers.jpg',
    suitableFor: ['heart'],
    attributes: ['medium-length', 'layered', 'versatile'],
    rating: 4.6
  },
  {
    id: 'heart-3',
    name: 'Textured Quiff',
    description: 'Creates balance with volume on top and neat sides.',
    imageUrl: '/haircuts/heart-quiff.jpg',
    suitableFor: ['heart', 'oval'],
    attributes: ['medium-length', 'textured', 'stylish'],
    rating: 4.8
  },
  
  // Long Face Shape Haircuts
  {
    id: 'long-1',
    name: 'Side-Parted Crop',
    description: 'Adds width to the face with horizontal volume.',
    imageUrl: '/haircuts/long-side-parted.jpg',
    suitableFor: ['long'],
    attributes: ['short', 'classic', 'professional'],
    rating: 4.5
  },
  {
    id: 'long-2',
    name: 'Textured Layers',
    description: 'Creates width with layered sides and textured volume.',
    imageUrl: '/haircuts/long-textured-layers.jpg',
    suitableFor: ['long', 'oval'],
    attributes: ['medium-length', 'textured', 'casual'],
    rating: 4.6
  },
  {
    id: 'long-3',
    name: 'Modern Caesar',
    description: 'Horizontal fringe that shortens face appearance.',
    imageUrl: '/haircuts/long-caesar.jpg',
    suitableFor: ['long', 'oval'],
    attributes: ['short', 'fringe', 'low-maintenance'],
    rating: 4.4
  },
  
  // Diamond Face Shape Haircuts
  {
    id: 'diamond-1',
    name: 'Textured Fringe',
    description: 'Softens angular features with textured layers.',
    imageUrl: '/haircuts/diamond-textured-fringe.jpg',
    suitableFor: ['diamond'],
    attributes: ['medium-length', 'textured', 'modern'],
    rating: 4.7
  },
  {
    id: 'diamond-2',
    name: 'Classic Taper',
    description: 'Balanced style that complements cheekbone structure.',
    imageUrl: '/haircuts/diamond-classic-taper.jpg',
    suitableFor: ['diamond', 'oval'],
    attributes: ['classic', 'versatile', 'medium-length'],
    rating: 4.8
  },
  {
    id: 'diamond-3',
    name: 'Brushed Back',
    description: 'Adds volume to complement high cheekbones.',
    imageUrl: '/haircuts/diamond-brushed-back.jpg',
    suitableFor: ['diamond', 'heart'],
    attributes: ['medium-length', 'elegant', 'structured'],
    rating: 4.6
  },
  
  // Triangle Face Shape Haircuts
  {
    id: 'triangle-1',
    name: 'Volume Quiff',
    description: 'Adds volume on top to balance wider jaw.',
    imageUrl: '/haircuts/triangle-quiff.jpg',
    suitableFor: ['triangle'],
    attributes: ['voluminous', 'modern', 'stylish'],
    rating: 4.7
  },
  {
    id: 'triangle-2',
    name: 'Textured Crop with Fringe',
    description: 'Creates width at the top with textured styling.',
    imageUrl: '/haircuts/triangle-crop-fringe.jpg',
    suitableFor: ['triangle', 'square'],
    attributes: ['modern', 'textured', 'trendy'],
    rating: 4.6
  },
  {
    id: 'triangle-3',
    name: 'Pompadour with Fade',
    description: 'High volume on top balances proportions perfectly.',
    imageUrl: '/haircuts/triangle-pompadour.jpg',
    suitableFor: ['triangle', 'oval'],
    attributes: ['statement', 'high-volume', 'stylish'],
    rating: 4.8
  }
];

// Placeholder images for development
const placeholderImages: Record<string, string> = {
  'oval': 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1974&auto=format&fit=crop',
  'round': 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop',
  'square': 'https://images.unsplash.com/photo-1618886614638-80e3c103d465?q=80&w=1970&auto=format&fit=crop',
  'heart': 'https://images.unsplash.com/photo-1548536902-6ab598cd4def?q=80&w=1964&auto=format&fit=crop',
  'long': 'https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=1976&auto=format&fit=crop',
  'diamond': 'https://images.unsplash.com/photo-1626033740248-7071c609015f?q=80&w=1974&auto=format&fit=crop',
  'triangle': 'https://images.unsplash.com/photo-1614244376374-c96d72eeaf19?q=80&w=1974&auto=format&fit=crop'
};

// Function to get placeholder image for development
export const getPlaceholderImage = (haircut: Haircut): string => {
  // Use the first suitable face shape to get a placeholder
  const faceShape = haircut.suitableFor[0];
  return placeholderImages[faceShape] || 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1974&auto=format&fit=crop';
};

export const getRecommendedHaircuts = (faceShape: FaceShape, limit: number = 5): Haircut[] => {
  // Filter haircuts suitable for the detected face shape
  const suitable = haircutsDatabase.filter(haircut => 
    haircut.suitableFor.includes(faceShape)
  );
  
  // Sort by rating (highest first)
  const sorted = suitable.sort((a, b) => b.rating - a.rating);
  
  // Return the top N recommendations
  return sorted.slice(0, limit);
};

export const getAllHaircuts = (): Haircut[] => {
  return haircutsDatabase;
};

export const getHaircutById = (id: string): Haircut | undefined => {
  return haircutsDatabase.find(h => h.id === id);
};

export const getHaircutsForFaceShape = (faceShape: FaceShape): Haircut[] => {
  return haircutsDatabase.filter(haircut => 
    haircut.suitableFor.includes(faceShape)
  );
};

export const getFaceShapeDescription = (faceShape: FaceShape): string => {
  const descriptions: Record<FaceShape, string> = {
    oval: "Oval faces are well-balanced with a slightly wider forehead and a gently rounded jawline. This versatile shape works well with most haircuts.",
    round: "Round faces have soft features with a rounded chin and fuller cheeks. Styles that add height and angles work best to create definition.",
    square: "Square faces have a strong, angular jawline and typically a broader forehead. Styles that soften angles while maintaining proportion are ideal.",
    heart: "Heart-shaped faces have a wider forehead and cheekbones with a narrow chin. Balancing the width at the top with fuller styles at the jawline works well.",
    long: "Long faces are longer than they are wide with high foreheads. Styles that create width and minimize height help balance proportions.",
    diamond: "Diamond faces have narrow foreheads and jawlines with wide cheekbones. Styles that add width at the forehead and jawline are most flattering.",
    triangle: "Triangle faces have a wider jawline that narrows at the forehead. Styles that add volume at the top help balance the proportions."
  };
  
  return descriptions[faceShape] || "Face shape analysis helps determine the most flattering haircuts for your features.";
};
