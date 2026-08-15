import React, { useState, useMemo } from 'react';
import { useDesign } from '../context/DesignContext';
import { STYLE_PRESETS } from '../data/stylePresetsData';
import { generateDesignPDF } from '../services/pdfReportGenerator';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { Bookmark, Download, RotateCcw, ArrowLeft, Eye, Sparkles, CheckCircle2, Box, Info, Wand2 } from 'lucide-react';

export default function DesignResultsPage({ onNavigate }) {
  const { currentProject, applyStylePreset, saveCurrentDesign } = useDesign();
  const [selectedStyleId, setSelectedStyleId] = useState(currentProject.styleId || 'modern-elegance');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const aiAnalysis = currentProject.aiAnalysisResult || null;

  const nameToId = (name) => {
    if (!name) return null;
    const lower = name.toLowerCase();
    const match = STYLE_PRESETS.find(s => s.name.toLowerCase() === lower || s.id === lower);
    return match ? match.id : null;
  };

  const recommendedIds = useMemo(() => {
    if (aiAnalysis?.suggestedThemes && Array.isArray(aiAnalysis.suggestedThemes)) {
      const ids = aiAnalysis.suggestedThemes.map(nameToId).filter(Boolean);
      return ids.length > 0 ? ids : STYLE_PRESETS.slice(0, 4).map(s => s.id);
    }
    return STYLE_PRESETS.slice(0, 4).map(s => s.id);
  }, [aiAnalysis]);

  const displayedPresets = useMemo(() => {
    const map = new Map(STYLE_PRESETS.map(s => [s.id, s]));
    return recommendedIds.map(id => map.get(id)).filter(Boolean);
  }, [recommendedIds]);

  const activePreset = STYLE_PRESETS.find(s => s.id === selectedStyleId) || displayedPresets[0] || STYLE_PRESETS[0];

  const handleSelectStyle = (styleId) => {
    setSelectedStyleId(styleId);
    applyStylePreset(styleId);
  };

  const handleSaveDesign = () => {
    saveCurrentDesign(`${activePreset.name} Living Space`);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownload = () => {
    generateDesignPDF({
      ...currentProject,
      title: `${activePreset.name} Interior Plan`,
      styleName: activePreset.name
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Header (Figure 6.3.6) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Design Results</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Based on your room, here are some AI generated design ideas.
          </p>
        </div>

        <button
          onClick={() => onNavigate('upload-room')}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <RotateCcw size={15} /> Start New
        </button>
      </div>

      {/* AI Analysis Summary */}
      {aiAnalysis && (
        <div className="vids-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>AI Analysis Insights</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {aiAnalysis.detectedRoomType || 'Room'} • {aiAnalysis.confidenceScore ? `${aiAnalysis.confidenceScore}% confidence` : ''}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {aiAnalysis.spatialDimensions && (
              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Floor Area</div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>{aiAnalysis.spatialDimensions.floorAreaSqM} m²</div>
              </div>
            )}
            {aiAnalysis.spatialDimensions && (
              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Wall Area</div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>{aiAnalysis.spatialDimensions.wallAreaSqM} m²</div>
              </div>
            )}
            {aiAnalysis.lightingAnalysis && (
              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Natural Light</div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>{aiAnalysis.lightingAnalysis.naturalLightLevel}</div>
              </div>
            )}
            {aiAnalysis.recommendedWallPalette && aiAnalysis.recommendedWallPalette.length > 0 && (
              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Recommended Palette</div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {aiAnalysis.recommendedWallPalette.slice(0, 3).map((color, idx) => (
                    <div key={idx} style={{ width: '20px', height: '20px', borderRadius: '50%', background: color.hex, border: '1px solid var(--border)' }} title={color.name} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Generated Design Image */}
      {(currentProject.generatedDesignImage || true) && (
        <div className="vids-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wand2 size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>AI Generated Design</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>New concept created from your room analysis</div>
            </div>
          </div>
          <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <img
              src={currentProject.generatedDesignImage || STYLE_PRESETS.find(s => s.id === currentProject.styleId)?.image || STYLE_PRESETS[0]?.image}
              alt="AI Generated Design"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => {
                const preset = STYLE_PRESETS.find(s => s.id === currentProject.styleId) || STYLE_PRESETS[0];
                if (preset && e.target.src !== preset.image) {
                  e.target.src = preset.image;
                }
              }}
            />
          </div>
        </div>
      )}

      {/* 4 Cards Grid (Figure 6.3.6) */}
      <div className="grid-2">
        {displayedPresets.map((preset) => {
          const isSelected = preset.id === selectedStyleId;
          return (
            <div
              key={preset.id}
              className="vids-card"
              style={{
                padding: '16px',
                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Image Preview */}
              <div style={{ height: '210px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={preset.image}
                  alt={preset.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'var(--primary)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <CheckCircle2 size={13} /> Active Style
                  </div>
                )}
              </div>

              {/* Bottom Title & View Button (Figure 6.3.6) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{preset.name}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{preset.tagline.substring(0, 45)}...</p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleSelectStyle(preset.id)}
                    className={isSelected ? 'btn-primary' : 'btn-secondary'}
                    style={{ padding: '6px 16px', fontSize: '13px' }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      handleSelectStyle(preset.id);
                      onNavigate('studio-3d');
                    }}
                    className="btn-outline-primary"
                    style={{ padding: '6px 12px', fontSize: '13px' }}
                    title="Launch directly in 3D WebGL Studio"
                  >
                    <Box size={14} /> 3D
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Before / After Split Comparison (Product Feature 2.13) */}
      <div className="vids-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Interactive Comparison: Original vs AI Design</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Drag the split divider to evaluate transformation fidelity</p>
          </div>
          <span className="vids-badge badge-primary">
            Style: {activePreset.name}
          </span>
        </div>

        <BeforeAfterSlider
          beforeImage={currentProject.uploadedImage || activePreset.originalImage}
          afterImage={currentProject.generatedDesignImage || activePreset.image}
          styleTitle={activePreset.name}
        />
      </div>

      {/* Saved notification banner */}
      {savedSuccess && (
        <div style={{
          padding: '12px 20px',
          borderRadius: 'var(--radius-sm)',
          background: '#d1fae5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} />
          Design successfully saved to your profile collection!
        </div>
      )}

      {/* Bottom Actions Row (Figure 6.3.6: Back, Save Design, Download) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        borderTop: '1px solid var(--border)'
      }}>
        <button
          onClick={() => onNavigate('upload-room')}
          className="btn-secondary"
          style={{ padding: '10px 24px' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onNavigate('studio-3d')}
            className="btn-secondary"
            style={{ padding: '10px 20px', borderColor: 'var(--primary)', color: 'var(--primary)' }}
          >
            <Box size={16} /> Edit In 3D Studio
          </button>

          <button
            onClick={handleSaveDesign}
            className="btn-secondary"
            style={{ padding: '10px 22px' }}
          >
            <Bookmark size={16} color="var(--primary)" />
            Save Design
          </button>

          <button
            onClick={handleDownload}
            className="btn-primary"
            style={{ padding: '10px 26px' }}
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
