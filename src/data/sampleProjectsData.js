// Sample Projects and Saved Designs for VIDS
export const SAMPLE_PROJECTS = [
  {
    id: 'proj-01',
    title: 'Modern Elegance Master Living',
    styleId: 'modern-elegance',
    styleName: 'Modern Elegance',
    savedDate: '12 May, 2024',
    roomType: 'Living Room',
    dimensions: { length: 5.5, width: 4.2, height: 2.8 },
    wallColor: '#ebe7df',
    floorId: 'light_oak',
    isFavorite: true,
    estimatedCost: 3170,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    placedFurniture: [
      { id: 'item-1', catalogId: 'sofa-01', name: 'Nordic 3-Seater Velvet Sofa', position: [0, 0.425, -0.8], rotation: [0, 0, 0], color: '#3b4252', scale: [1, 1, 1], price: 850 },
      { id: 'item-2', catalogId: 'table-01', name: 'Calacatta Marble Coffee Table', position: [0, 0.21, 0.4], rotation: [0, 0, 0], color: '#ffffff', scale: [1, 1, 1], price: 490 },
      { id: 'item-3', catalogId: 'chair-01', name: 'Eames Style Lounge Chair', position: [1.8, 0.42, 0.2], rotation: [0, -0.6, 0], color: '#1e293b', scale: [1, 1, 1], price: 620 },
      { id: 'item-4', catalogId: 'light-01', name: 'Arched Brass Floor Lamp', position: [-2.0, 0.92, -1.2], rotation: [0, 0.4, 0], color: '#eab308', scale: [1, 1, 1], price: 210 },
      { id: 'item-5', catalogId: 'decor-01', name: 'Potted Monstera Plant', position: [2.1, 0.6, -1.4], rotation: [0, 0, 0], color: '#15803d', scale: [1, 1, 1], price: 75 },
      { id: 'item-6', catalogId: 'decor-02', name: 'Geometric Wool Area Rug', position: [0, 0.01, 0], rotation: [0, 0, 0], color: '#e2e8f0', scale: [1, 1, 1], price: 320 }
    ]
  },
  {
    id: 'proj-02',
    title: 'Minimalist Open Studio',
    styleId: 'minimal-style',
    styleName: 'Minimal Style',
    savedDate: '10 May, 2024',
    roomType: 'Studio Lounge',
    dimensions: { length: 6.0, width: 4.5, height: 3.0 },
    wallColor: '#f8fafc',
    floorId: 'concrete',
    isFavorite: true,
    estimatedCost: 2480,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    placedFurniture: [
      { id: 'item-1', catalogId: 'sofa-02', name: 'Minimalist Modular Sectional', position: [-0.5, 0.38, -0.5], rotation: [0, 0, 0], color: '#e2e8f0', scale: [1, 1, 1], price: 1120 },
      { id: 'item-2', catalogId: 'storage-01', name: 'Floating Walnut TV Credenza', position: [0, 0.25, 2.0], rotation: [0, Math.PI, 0], color: '#78350f', scale: [1, 1, 1], price: 540 },
      { id: 'item-3', catalogId: 'decor-02', name: 'Geometric Wool Area Rug', position: [-0.5, 0.01, 0.2], rotation: [0, 0, 0], color: '#cbd5e1', scale: [1, 1, 1], price: 320 }
    ]
  },
  {
    id: 'proj-03',
    title: 'Classic Luxury Parlour',
    styleId: 'classic-luxury',
    styleName: 'Classic Luxury',
    savedDate: '08 May, 2024',
    roomType: 'Drawing Room',
    dimensions: { length: 5.8, width: 4.8, height: 3.2 },
    wallColor: '#f1ede4',
    floorId: 'dark_walnut',
    isFavorite: false,
    estimatedCost: 4100,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    placedFurniture: [
      { id: 'item-1', catalogId: 'sofa-03', name: 'Tufted Chesterfield Classic', position: [0, 0.44, -1.0], rotation: [0, 0, 0], color: '#78350f', scale: [1, 1, 1], price: 1450 },
      { id: 'item-2', catalogId: 'storage-02', name: 'Gold-Trim Bookcase', position: [-2.1, 0.95, 0], rotation: [0, Math.PI / 2, 0], color: '#ca8a04', scale: [1, 1, 1], price: 690 },
      { id: 'item-3', catalogId: 'light-02', name: 'Sputnik Molecular Chandelier', position: [0, 2.6, 0], rotation: [0, 0, 0], color: '#ca8a04', scale: [1, 1, 1], price: 380 }
    ]
  },
  {
    id: 'proj-04',
    title: 'Scandinavian Sunlit Sunroom',
    styleId: 'scandinavian',
    styleName: 'Scandinavian',
    savedDate: '05 May, 2024',
    roomType: 'Sunroom & Study',
    dimensions: { length: 4.8, width: 3.8, height: 2.7 },
    wallColor: '#f4f6f8',
    floorId: 'light_oak',
    isFavorite: true,
    estimatedCost: 1950,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    placedFurniture: [
      { id: 'item-1', catalogId: 'table-02', name: 'Solid Oak Dining Table', position: [0, 0.38, 0], rotation: [0, 0, 0], color: '#d97706', scale: [1, 1, 1], price: 780 },
      { id: 'item-2', catalogId: 'chair-02', name: 'Birch Dining Chair 1', position: [-0.6, 0.4, 0.7], rotation: [0, 0, 0], color: '#e2e8f0', scale: [1, 1, 1], price: 180 },
      { id: 'item-3', catalogId: 'chair-02', name: 'Birch Dining Chair 2', position: [0.6, 0.4, 0.7], rotation: [0, 0, 0], color: '#e2e8f0', scale: [1, 1, 1], price: 180 },
      { id: 'item-4', catalogId: 'decor-01', name: 'Potted Monstera Plant', position: [1.8, 0.6, -1.2], rotation: [0, 0, 0], color: '#15803d', scale: [1, 1, 1], price: 75 }
    ]
  }
];
