import React, { useState } from 'react';
import { useDesign } from '../context/DesignContext';
import { WALL_COLORS, FLOOR_FINISHES, STYLE_PRESETS } from '../data/stylePresetsData';
import { FURNITURE_CATALOG } from '../data/furnitureCatalogData';
import { generateDesignPDF } from '../services/pdfReportGenerator';
import ThreeRoomCanvas from '../components/ThreeRoomCanvas';
import {
  Box,
  RotateCw,
  Trash2,
  Plus,
  Palette,
  Maximize2,
  Layers,
  Save,
  Download,
  Eye,
  Camera,
  Sliders,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function DesignStudioPage({ onNavigate }) {
  const {
    currentProject,
    updateCurrentProject,
    selectedFurnitureId,
    setSelectedFurnitureId,
    addFurniture,
    updateFurniture,
    removeFurniture,
    clearCanvas,
    applyStylePreset,
    saveCurrentDesign
  } = useDesign();

  const [viewMode, setViewMode] = useState('perspective'); // 'perspective' | 'topdown' | 'firstperson'
  const [activeTab, setActiveTab] = useState('furniture'); // 'furniture' | 'walls' | 'floors' | 'dimensions'
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const selectedItem = currentProject.placedFurniture?.find(f => f.id === selectedFurnitureId);
  const totalFurnitureCost = currentProject.placedFurniture?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;

  const handleSave = () => {
    saveCurrentDesign(currentProject.title);
    setSaveSuccessMsg('Design saved to profile successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleExportPDF = () => {
    generateDesignPDF(currentProject);
  };

  return (
    <div className="studio-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - 120px)', minHeight: '650px' }}>
      {/* Top Studio Control Bar */}
      <div className="vids-card" style={{
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Project Info & View Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>3D Interactive Room Studio</h2>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {currentProject.roomType} • {currentProject.dimensions?.length}m × {currentProject.dimensions?.width}m × {currentProject.dimensions?.height}m
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', background: 'var(--border)' }} />

          {/* View Modes */}
          <div style={{ display: 'flex', background: 'var(--border-light)', padding: '3px', borderRadius: 'var(--radius-sm)' }}>
            <button
              onClick={() => setViewMode('perspective')}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                background: viewMode === 'perspective' ? 'var(--bg-card)' : 'transparent',
                color: viewMode === 'perspective' ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: viewMode === 'perspective' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Perspective 3D
            </button>
            <button
              onClick={() => setViewMode('topdown')}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                background: viewMode === 'topdown' ? 'var(--bg-card)' : 'transparent',
                color: viewMode === 'topdown' ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: viewMode === 'topdown' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              2D Floor Plan
            </button>
            <button
              onClick={() => setViewMode('firstperson')}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                background: viewMode === 'firstperson' ? 'var(--bg-card)' : 'transparent',
                color: viewMode === 'firstperson' ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: viewMode === 'firstperson' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Walkthrough
            </button>
          </div>
        </div>

        {/* Right Actions & Budget counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right', paddingRight: '8px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Live Est. Budget
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
              ${totalFurnitureCost.toLocaleString()}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '12px' }}
          >
            <Save size={14} /> Save
          </button>

          <button
            onClick={handleExportPDF}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '12px' }}
          >
            <Download size={14} /> PDF Report
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', background: '#d1fae5', color: '#065f46', fontSize: '12px', fontWeight: 600 }}>
          {saveSuccessMsg}
        </div>
      )}

      {/* Main Workspace (3D Canvas + Right Tool Palette) */}
      <div className="studio-main-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', minHeight: 0 }}>
        {/* 3D Canvas Box */}
        <div style={{
          position: 'relative',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <ThreeRoomCanvas
            dimensions={currentProject.dimensions}
            wallColor={currentProject.wallColor}
            accentColor={currentProject.accentColor}
            floorId={currentProject.floorId}
            placedFurniture={currentProject.placedFurniture}
            selectedId={selectedFurnitureId}
            onSelectItem={(id) => setSelectedFurnitureId(id)}
            onUpdateItemPosition={(id, pos) => updateFurniture(id, { position: pos })}
            viewMode={viewMode}
          />

          {/* Canvas Floating Instructions */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            pointerEvents: 'none'
          }}>
            🖱️ Left Drag: Orbit Camera | Click Item: Select & Reposition | Scroll: Zoom
          </div>
        </div>

        {/* Right Tools & Inspector Sidebar */}
        <div className="vids-card" style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          overflowY: 'auto'
        }}>
          {/* Tab Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', background: 'var(--border-light)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
            <button
              onClick={() => setActiveTab('furniture')}
              style={{
                padding: '6px 2px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                background: activeTab === 'furniture' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'furniture' ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              Furniture
            </button>
            <button
              onClick={() => setActiveTab('walls')}
              style={{
                padding: '6px 2px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                background: activeTab === 'walls' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'walls' ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              Walls
            </button>
            <button
              onClick={() => setActiveTab('floors')}
              style={{
                padding: '6px 2px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                background: activeTab === 'floors' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'floors' ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              Floors
            </button>
            <button
              onClick={() => setActiveTab('dimensions')}
              style={{
                padding: '6px 2px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                background: activeTab === 'dimensions' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'dimensions' ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              Room
            </button>
          </div>

          {/* Selected Item Inspector Panel (Table 7.3 U_MOD_1) */}
          {selectedItem ? (
            <div style={{
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary-light)',
              border: '1.5px solid var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--primary)' }}>
                  Selected: {selectedItem.name}
                </div>
                <button
                  onClick={() => removeFurniture(selectedItem.id)}
                  style={{ background: 'transparent', color: 'var(--danger)', padding: '2px' }}
                  title="Remove from room"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Rotation Slider */}
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '2px' }}>
                  <span>Rotation (Y)</span>
                  <span>{Math.round(((selectedItem.rotation?.[1] || 0) * 180) / Math.PI)}°</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={Math.PI * 2}
                  step="0.1"
                  value={selectedItem.rotation?.[1] || 0}
                  onChange={(e) => updateFurniture(selectedItem.id, { rotation: [0, parseFloat(e.target.value), 0] })}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Scale Slider (Table 7.3 U_MOD_1) */}
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '2px' }}>
                  <span>Object Scale</span>
                  <span>{selectedItem.scale?.[0] || 1.0}x</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={selectedItem.scale?.[0] || 1.0}
                  onChange={(e) => {
                    const s = parseFloat(e.target.value);
                    updateFurniture(selectedItem.id, { scale: [s, s, s] });
                  }}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Recolor Object (Table 7.3 U_MOD_1) */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>
                  Upholstery / Material Color
                </label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['#3b4252', '#81a1c1', '#d8dee9', '#ca8a04', '#15803d', '#78350f', '#f8fafc', '#1e293b'].map((hex) => (
                    <div
                      key={hex}
                      onClick={() => updateFurniture(selectedItem.id, { color: hex })}
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: hex,
                        border: selectedItem.color === hex ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-main)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              textAlign: 'center'
            }}>
              💡 Click any furniture item in the 3D room to resize, rotate, or recolor.
            </div>
          )}

          {/* TAB 1: ADD FURNITURE */}
          {activeTab === 'furniture' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>Quick Add Catalog</span>
                <button
                  onClick={() => onNavigate('furniture-catalog')}
                  style={{ background: 'transparent', color: 'var(--primary)', fontSize: '11px', fontWeight: 600 }}
                >
                  Full Catalog →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {FURNITURE_CATALOG.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        ${item.price} • {item.dimensions.width}m × {item.dimensions.depth}m
                      </div>
                    </div>
                    <button
                      onClick={() => addFurniture(item)}
                      className="btn-primary"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                    >
                      <Plus size={12} /> Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WALL COLORS */}
          {activeTab === 'walls' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Main Wall Color
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {WALL_COLORS.map(c => (
                    <button
                      key={c.hex}
                      onClick={() => updateCurrentProject({ wallColor: c.hex })}
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        background: c.hex,
                        border: currentProject.wallColor === c.hex ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                        height: '36px'
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Accent Wall Color
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {WALL_COLORS.map(c => (
                    <button
                      key={`acc-${c.hex}`}
                      onClick={() => updateCurrentProject({ accentColor: c.hex })}
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        background: c.hex,
                        border: currentProject.accentColor === c.hex ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                        height: '36px'
                      }}
                      title={`Accent: ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FLOOR FINISHES */}
          {activeTab === 'floors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700 }}>
                Flooring Material Texture
              </label>
              {FLOOR_FINISHES.map(f => (
                <button
                  key={f.id}
                  onClick={() => updateCurrentProject({ floorId: f.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: currentProject.floorId === f.id ? 'var(--primary-light)' : 'var(--bg-main)',
                    border: currentProject.floorId === f.id ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ width: '24px', height: '24px', borderRadius: '4px', background: f.color, border: '1px solid #cbd5e1' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{f.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* TAB 4: DIMENSIONS */}
          {activeTab === 'dimensions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700 }}>
                Room Dimensions (Meters)
              </label>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Length (m)</label>
                <input
                  type="number"
                  step="0.2"
                  min="2"
                  max="12"
                  value={currentProject.dimensions?.length || 5.5}
                  onChange={(e) => updateCurrentProject({
                    dimensions: { ...currentProject.dimensions, length: parseFloat(e.target.value) || 5.5 }
                  })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Width (m)</label>
                <input
                  type="number"
                  step="0.2"
                  min="2"
                  max="12"
                  value={currentProject.dimensions?.width || 4.2}
                  onChange={(e) => updateCurrentProject({
                    dimensions: { ...currentProject.dimensions, width: parseFloat(e.target.value) || 4.2 }
                  })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ceiling Height (m)</label>
                <input
                  type="number"
                  step="0.1"
                  min="2"
                  max="5"
                  value={currentProject.dimensions?.height || 2.8}
                  onChange={(e) => updateCurrentProject({
                    dimensions: { ...currentProject.dimensions, height: parseFloat(e.target.value) || 2.8 }
                  })}
                  style={{ width: '100%' }}
                />
              </div>

              <button
                onClick={clearCanvas}
                className="btn-secondary"
                style={{ color: 'var(--danger)', borderColor: 'var(--danger)', marginTop: '8px', fontSize: '12px' }}
              >
                <Trash2 size={14} /> Clear All Furniture
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
