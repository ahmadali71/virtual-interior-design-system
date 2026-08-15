// Style Presets and AI Recommendation rules for VIDS
export const STYLE_PRESETS = [
  {
    id: 'modern-elegance',
    name: 'Modern Elegance',
    tagline: 'Refined sophistication with clean lines and warm metallic accents',
    description: 'Combines sleek architectural silhouettes with plush textures, neutral tones, and subtle gold or brass accents to create an inviting yet upscale sanctuary.',
    wallColor: '#ebe7df',
    accentColor: '#3b4252',
    secondaryColor: '#ca8a04',
    floorTexture: 'light_oak',
    floorColor: '#d4a373',
    lightingMode: 'warm_ambient',
    recommendedFurniture: ['sofa-01', 'table-01', 'chair-01', 'light-01', 'decor-01'],
    features: ['Recessed Cove Lighting', 'Marble Accents', 'Textured Velvet', 'Matte Brass Fixtures'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    originalImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'minimal-style',
    name: 'Minimal Style',
    tagline: 'Clutter-free tranquility, functional minimalism and soft daylight',
    description: 'Emphasizes spatial freedom, intentional negative space, hidden storage, and a calming monochromatic palette inspired by contemporary European architecture.',
    wallColor: '#f8fafc',
    accentColor: '#475569',
    secondaryColor: '#94a3b8',
    floorTexture: 'concrete',
    floorColor: '#e2e8f0',
    lightingMode: 'daylight',
    recommendedFurniture: ['sofa-02', 'storage-01', 'decor-02', 'chair-02'],
    features: ['Hidden Cable Trays', 'Floating Joinery', 'Monochromatic Linen', 'Sunlit Voids'],
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
    originalImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'classic-luxury',
    name: 'Classic Luxury',
    tagline: 'Timeless opulence, rich timber, coffered details & grand fixtures',
    description: 'Rooted in neoclassical heritage, featuring ornate moldings, tufted leather furnishings, crystal or brass chandeliers, and deep regal color schemes.',
    wallColor: '#f1ede4',
    accentColor: '#78350f',
    secondaryColor: '#ca8a04',
    floorTexture: 'dark_walnut',
    floorColor: '#582f0e',
    lightingMode: 'chandeliers',
    recommendedFurniture: ['sofa-03', 'storage-02', 'light-02', 'chair-01'],
    features: ['Wall Picture Wainscoting', 'Crystal Chandeliers', 'Deep Button Chesterfield', 'Polished Parquet'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    originalImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    tagline: 'Hygge harmony with natural wood, airy textures and botanical life',
    description: 'Focuses on warmth, natural lighting, pale blond timbers, cozy wool textiles, and organic houseplants that breathe vitality into daily living.',
    wallColor: '#f4f6f8',
    accentColor: '#0284c7',
    secondaryColor: '#15803d',
    floorTexture: 'birch',
    floorColor: '#e9d8a6',
    lightingMode: 'soft_diffused',
    recommendedFurniture: ['table-02', 'chair-02', 'decor-01', 'decor-02', 'sofa-01'],
    features: ['Natural Birch Wood', 'Cozy Hygge Rugs', 'Lush Indoor Monsteras', 'Airy Sheer Drapes'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    originalImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'japandi-zen',
    name: 'Japandi Zen',
    tagline: 'The timeless fusion of Japanese wabi-sabi and Nordic function',
    description: 'A harmonious blend of Japanese aesthetic simplicity and Scandinavian warmth, utilizing raw ceramics, low-profile furniture, and bamboo accents.',
    wallColor: '#eae5d9',
    accentColor: '#292524',
    secondaryColor: '#854d0e',
    floorTexture: 'bamboo',
    floorColor: '#cca47c',
    lightingMode: 'warm_ambient',
    recommendedFurniture: ['sofa-02', 'table-01', 'chair-02', 'decor-01'],
    features: ['Wabi-Sabi Textures', 'Shoji Grid Accents', 'Low Elevation Seating', 'Earthenware Décor'],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    originalImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  }
];

export const WALL_COLORS = [
  { name: 'Warm Alabaster', hex: '#ebe7df', category: 'Warm Neutral' },
  { name: 'Pure Chalk', hex: '#f8fafc', category: 'Bright' },
  { name: 'Nordic Mist', hex: '#e2e8f0', category: 'Cool Grey' },
  { name: 'Sage Haven', hex: '#d1dcce', category: 'Earthy' },
  { name: 'Terracotta Clay', hex: '#df9e82', category: 'Warm' },
  { name: 'Midnight Navy', hex: '#1e293b', category: 'Accent Dark' },
  { name: 'Forest Velvet', hex: '#14532d', category: 'Accent Dark' },
  { name: 'Muted Ochre', hex: '#d97706', category: 'Warm Accent' }
];

export const FLOOR_FINISHES = [
  { id: 'light_oak', name: 'Scandinavian White Oak', color: '#d4a373', roughness: 0.4 },
  { id: 'dark_walnut', name: 'Herringbone Dark Walnut', color: '#582f0e', roughness: 0.3 },
  { id: 'marble', name: 'Italian Carrara Marble', color: '#f1f5f9', roughness: 0.1 },
  { id: 'concrete', name: 'Polished Studio Concrete', color: '#94a3b8', roughness: 0.6 },
  { id: 'tile', name: 'Travertine Stone Tile', color: '#e5d9c5', roughness: 0.5 }
];
