import React, { useState } from 'react';
import { useDesign } from '../context/DesignContext';
import { generateDesignPDF } from '../services/pdfReportGenerator';
import ComparisonModal from '../components/ComparisonModal';
import { Search, Star, Trash2, Box, Download, Layers, Eye, MoreVertical } from 'lucide-react';

export default function SavedDesignsPage({ onNavigate }) {
  const { savedDesigns, loadSavedDesign, deleteSavedDesign, toggleFavoriteDesign } = useDesign();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const filtered = savedDesigns.filter(d =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.styleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.roomType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header (Figure 6.3.7) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Saved Designs</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            All your saved interior designs and optimized layouts
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowCompareModal(true)}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <Layers size={16} color="var(--primary)" />
            Compare Designs
          </button>
          <button
            onClick={() => onNavigate('upload-room')}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            Create New Design
          </button>
        </div>
      </div>

      {/* Search Bar (Figure 6.3.7) */}
      <div className="vids-card" style={{ padding: '12px 20px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search saved designs by style or room name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', paddingLeft: '38px' }}
          />
          <Search size={16} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Grid of Saved Designs (Figure 6.3.7) */}
      <div className="grid-2">
        {filtered.map((design) => (
          <div
            key={design.id}
            className="vids-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Image Preview */}
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={design.image}
                alt={design.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.75)',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                backdropFilter: 'blur(4px)'
              }}>
                {design.styleName}
              </div>

              {/* Star / Favorite Button */}
              <button
                onClick={() => toggleFavoriteDesign(design.id)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(4px)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: design.isFavorite ? '#f59e0b' : '#94a3b8'
                }}
                title="Toggle Favorite"
              >
                <Star size={16} fill={design.isFavorite ? '#f59e0b' : 'transparent'} />
              </button>
            </div>

            {/* Content Body (Figure 6.3.7) */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{design.title}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Saved on {design.savedDate} • {design.roomType}
                  </div>
                </div>

                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
                  ${design.estimatedCost?.toLocaleString()}
                </div>
              </div>

              {/* Placed Items & Dimensions Summary */}
              <div style={{
                background: 'var(--bg-main)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Dimensions: {design.dimensions?.length}m × {design.dimensions?.width}m</span>
                <span>{(design.placedFurniture || []).length} Furniture units</span>
              </div>

              {/* Actions Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => deleteSavedDesign(design.id)}
                  style={{
                    background: 'transparent',
                    color: 'var(--danger)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Trash2 size={14} /> Delete
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => generateDesignPDF(design)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                    title="Download PDF Specification"
                  >
                    <Download size={13} /> PDF
                  </button>

                  <button
                    onClick={() => {
                      loadSavedDesign(design.id);
                      onNavigate('studio-3d');
                    }}
                    className="btn-primary"
                    style={{ padding: '6px 16px', fontSize: '12px' }}
                  >
                    <Box size={14} /> Open in 3D
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Modal */}
      {showCompareModal && (
        <ComparisonModal
          designs={savedDesigns}
          onClose={() => setShowCompareModal(false)}
          onSelectToLoad={(id) => {
            loadSavedDesign(id);
            onNavigate('studio-3d');
          }}
        />
      )}
    </div>
  );
}
