import React, { useState } from 'react';
import { X, Check, ArrowRight, DollarSign, Layers } from 'lucide-react';

export default function ComparisonModal({ designs = [], onClose, onSelectToLoad }) {
  const [selectedIds, setSelectedIds] = useState(
    designs.slice(0, 2).map(d => d.id)
  );

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const comparedDesigns = designs.filter(d => selectedIds.includes(d.id));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '24px'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '1100px',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Compare Room Designs</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Select 2 to 3 saved interior concepts to analyze layout, color harmonies, and budget breakdown side by side.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', padding: '6px', borderRadius: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Selection bar */}
        <div style={{
          padding: '12px 24px',
          background: 'var(--bg-main)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Choose designs:</span>
          {designs.map(d => {
            const isSel = selectedIds.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggleSelect(d.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: isSel ? 'var(--primary)' : 'var(--bg-card)',
                  color: isSel ? '#ffffff' : 'var(--text-main)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isSel && <Check size={12} />}
                {d.title || d.styleName}
              </button>
            );
          })}
        </div>

        {/* Comparison Grid */}
        <div style={{
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: `repeat(${comparedDesigns.length}, 1fr)`,
          gap: '20px'
        }}>
          {comparedDesigns.map((d) => (
            <div
              key={d.id}
              className="vids-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderColor: 'var(--border)'
              }}
            >
              {/* Image Preview */}
              <div style={{ height: '180px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={d.image}
                  alt={d.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600
                }}>
                  {d.styleName}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700 }}>{d.title}</h4>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Saved on {d.savedDate}</div>
              </div>

              {/* Spec Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Room Type:</span>
                  <span style={{ fontWeight: 600 }}>{d.roomType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dimensions:</span>
                  <span style={{ fontWeight: 600 }}>{d.dimensions?.length}m × {d.dimensions?.width}m</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Wall Palette:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: d.wallColor, border: '1px solid #cbd5e1' }} />
                    <span>{d.wallColor}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Furniture Items:</span>
                  <span style={{ fontWeight: 600 }}>{(d.placedFurniture || []).length} units</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px dashed var(--border)' }}>
                  <span style={{ fontWeight: 700 }}>Estimated Cost:</span>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '14px' }}>
                    ${d.estimatedCost?.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectToLoad(d.id);
                  onClose();
                }}
                className="btn-primary"
                style={{ marginTop: 'auto', padding: '8px 14px', fontSize: '12px' }}
              >
                Load In 3D Studio <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
