import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_PROJECTS } from '../data/sampleProjectsData';
import { FURNITURE_CATALOG } from '../data/furnitureCatalogData';
import { STYLE_PRESETS } from '../data/stylePresetsData';

const DesignContext = createContext(null);

export function DesignProvider({ children }) {
  // Saved designs list
  const [savedDesigns, setSavedDesigns] = useState(() => {
    const saved = localStorage.getItem('vids_saved_designs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SAMPLE_PROJECTS;
  });

  // Current active project in Studio / Styler
  const [currentProject, setCurrentProject] = useState(() => {
    return {
      title: 'My Custom Room Design',
      roomType: 'Living Room',
      dimensions: { length: 5.5, width: 4.2, height: 2.8 },
      wallColor: '#ebe7df',
      accentColor: '#3b4252',
      floorId: 'light_oak',
      styleId: 'modern-elegance',
      uploadedImage: null,
      aiAnalysisResult: null,
      placedFurniture: [
        {
          id: 'item-1',
          catalogId: 'sofa-01',
          name: 'Nordic 3-Seater Velvet Sofa',
          position: [0, 0.425, -0.8],
          rotation: [0, 0, 0],
          color: '#3b4252',
          scale: [1, 1, 1],
          price: 850
        },
        {
          id: 'item-2',
          catalogId: 'table-01',
          name: 'Calacatta Marble Coffee Table',
          position: [0, 0.21, 0.4],
          rotation: [0, 0, 0],
          color: '#ffffff',
          scale: [1, 1, 1],
          price: 490
        },
        {
          id: 'item-3',
          catalogId: 'light-01',
          name: 'Arched Brass Floor Lamp',
          position: [-1.8, 0.92, -1.2],
          rotation: [0, 0.4, 0],
          color: '#eab308',
          scale: [1, 1, 1],
          price: 210
        }
      ]
    };
  });

  const [selectedFurnitureId, setSelectedFurnitureId] = useState(null);

  // Undo/Redo history stack
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem('vids_saved_designs', JSON.stringify(savedDesigns));
  }, [savedDesigns]);

  // Push current state to undo history
  const pushHistory = (state) => {
    const updated = history.slice(0, historyIndex + 1);
    setHistory([...updated, JSON.parse(JSON.stringify(state))]);
    setHistoryIndex(updated.length);
  };

  const updateCurrentProject = (partial) => {
    setCurrentProject(prev => {
      const next = { ...prev, ...partial };
      return next;
    });
  };

  const addFurniture = (catalogItem, customPosition = null) => {
    const itemCatalog = typeof catalogItem === 'string' 
      ? FURNITURE_CATALOG.find(f => f.id === catalogItem)
      : catalogItem;

    if (!itemCatalog) return;

    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      catalogId: itemCatalog.id,
      name: itemCatalog.name,
      position: customPosition || [
        (Math.random() - 0.5) * (currentProject.dimensions.width * 0.6),
        itemCatalog.dimensions.height / 2,
        (Math.random() - 0.5) * (currentProject.dimensions.length * 0.6)
      ],
      rotation: [0, 0, 0],
      color: itemCatalog.defaultColor || itemCatalog.colors?.[0] || '#334155',
      scale: [1, 1, 1],
      price: itemCatalog.price
    };

    setCurrentProject(prev => ({
      ...prev,
      placedFurniture: [...prev.placedFurniture, newItem]
    }));
    setSelectedFurnitureId(newItem.id);
  };

  const updateFurniture = (id, properties) => {
    setCurrentProject(prev => ({
      ...prev,
      placedFurniture: prev.placedFurniture.map(f => f.id === id ? { ...f, ...properties } : f)
    }));
  };

  const removeFurniture = (id) => {
    setCurrentProject(prev => ({
      ...prev,
      placedFurniture: prev.placedFurniture.filter(f => f.id !== id)
    }));
    if (selectedFurnitureId === id) setSelectedFurnitureId(null);
  };

  const clearCanvas = () => {
    setCurrentProject(prev => ({
      ...prev,
      placedFurniture: []
    }));
    setSelectedFurnitureId(null);
  };

  const applyStylePreset = (styleId) => {
    const style = STYLE_PRESETS.find(s => s.id === styleId);
    if (!style) return;

    const recommendedFurniture = style.recommendedFurniture.map((catId, idx) => {
      const cat = FURNITURE_CATALOG.find(c => c.id === catId);
      if (!cat) return null;
      return {
        id: `style-item-${idx}-${Date.now()}`,
        catalogId: cat.id,
        name: cat.name,
        position: [
          (idx % 2 === 0 ? -1 : 1) * (0.8 + idx * 0.3),
          cat.dimensions.height / 2,
          (idx - 1) * 0.6
        ],
        rotation: [0, idx * 0.3, 0],
        color: cat.defaultColor || cat.colors?.[0] || style.accentColor,
        scale: [1, 1, 1],
        price: cat.price
      };
    }).filter(Boolean);

    setCurrentProject(prev => ({
      ...prev,
      styleId: style.id,
      wallColor: style.wallColor,
      accentColor: style.accentColor,
      floorId: style.floorTexture,
      placedFurniture: recommendedFurniture.length > 0 ? recommendedFurniture : prev.placedFurniture
    }));
  };

  const loadSavedDesign = (designId) => {
    const design = savedDesigns.find(d => d.id === designId);
    if (design) {
      setCurrentProject({
        title: design.title,
        roomType: design.roomType || 'Living Room',
        dimensions: design.dimensions || { length: 5.5, width: 4.2, height: 2.8 },
        wallColor: design.wallColor || '#ebe7df',
        accentColor: design.accentColor || '#3b4252',
        floorId: design.floorId || 'light_oak',
        styleId: design.styleId || 'modern-elegance',
        uploadedImage: design.image || null,
        aiAnalysisResult: design.aiAnalysisResult || null,
        placedFurniture: design.placedFurniture || []
      });
      setSelectedFurnitureId(null);
      return true;
    }
    return false;
  };

  const saveCurrentDesign = (title, previewImage = null) => {
    const totalCost = currentProject.placedFurniture.reduce((acc, item) => acc + (item.price || 0), 0);
    const newDesign = {
      id: `proj-${Date.now()}`,
      title: title || currentProject.title || `Room Design ${savedDesigns.length + 1}`,
      styleId: currentProject.styleId,
      styleName: STYLE_PRESETS.find(s => s.id === currentProject.styleId)?.name || 'Custom Modern',
      savedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      roomType: currentProject.roomType,
      dimensions: { ...currentProject.dimensions },
      wallColor: currentProject.wallColor,
      accentColor: currentProject.accentColor,
      floorId: currentProject.floorId,
      isFavorite: false,
      estimatedCost: totalCost,
      image: previewImage || STYLE_PRESETS.find(s => s.id === currentProject.styleId)?.image || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      placedFurniture: [...currentProject.placedFurniture]
    };

    setSavedDesigns(prev => [newDesign, ...prev]);
    return newDesign;
  };

  const deleteSavedDesign = (id) => {
    setSavedDesigns(prev => prev.filter(d => d.id !== id));
  };

  const toggleFavoriteDesign = (id) => {
    setSavedDesigns(prev => prev.map(d => d.id === id ? { ...d, isFavorite: !d.isFavorite } : d));
  };

  return (
    <DesignContext.Provider value={{
      savedDesigns,
      currentProject,
      selectedFurnitureId,
      setSelectedFurnitureId,
      updateCurrentProject,
      addFurniture,
      updateFurniture,
      removeFurniture,
      clearCanvas,
      applyStylePreset,
      loadSavedDesign,
      saveCurrentDesign,
      deleteSavedDesign,
      toggleFavoriteDesign
    }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  return useContext(DesignContext);
}
