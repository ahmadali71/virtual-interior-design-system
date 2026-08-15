import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDesign } from '../context/DesignContext';
import {
  UploadCloud,
  ArrowUpRight,
  Sparkles,
  BookmarkCheck,
  Heart,
  Layers,
  ArrowRight,
  Eye,
  Box,
  Compass
} from 'lucide-react';

export default function DashboardPage({ onNavigate }) {
  const { currentUser } = useAuth();
  const { savedDesigns, loadSavedDesign } = useDesign();

  const userName = currentUser?.name?.split(' ')[0] || 'Ayesha';
  const totalDesignsCount = savedDesigns.length + 4;
  const savedDesignsCount = savedDesigns.length;
  const favoriteDesignsCount = savedDesigns.filter(d => d.isFavorite).length || 3;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Greeting (Figure 6.3.1) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            Good Morning, {userName}! <span>👋</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Let's design your dream space with intelligent AI recommendations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigate('studio-3d')}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <Box size={16} color="var(--primary)" />
            Open 3D Studio
          </button>
          <button
            onClick={() => onNavigate('upload-room')}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <UploadCloud size={16} />
            Upload New Room
          </button>
        </div>
      </div>

      {/* Top Main Section (Hero Upload Card + Stats Column) */}
      <div className="dashboard-top-grid" style={{ display: 'grid', gap: '24px' }}>
        {/* Upload Room Image Card (Purple Banner as in Fig 6.3.1) */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 32px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background glow */}
          <div style={{
            position: 'absolute',
            right: '-30px',
            top: '-30px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            filter: 'blur(20px)'
          }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '320px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Upload Room Image
            </h2>
            <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '24px', lineHeight: '1.5' }}>
              Upload your room image to get started with instant AI wall detection & furniture styling.
            </p>
            <button
              onClick={() => onNavigate('upload-room')}
              style={{
                background: '#ffffff',
                color: 'var(--primary)',
                padding: '10px 24px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Upload Now <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            position: 'relative',
            zIndex: 2
          }}>
            <UploadCloud size={48} />
          </div>
        </div>

        {/* Stats Column (Fig 6.3.1: Total Designs, Saved Designs, Favorite Designs) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Total Designs */}
          <div className="vids-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Total Designs</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                {totalDesignsCount}
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Layers size={22} />
            </div>
          </div>

          {/* Saved Designs */}
          <div className="vids-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Saved Designs</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#f59e0b', marginTop: '2px' }}>
                {savedDesignsCount}
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookmarkCheck size={22} />
            </div>
          </div>

          {/* Favorite Designs */}
          <div className="vids-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Favorite Designs</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#ec4899', marginTop: '2px' }}>
                {favoriteDesignsCount}
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#fce7f3',
              color: '#db2777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Designs Gallery (Figure 6.3.1) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Recent Designs</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Explore your latest AI space concepts and 3D scenes</p>
          </div>
          <button
            onClick={() => onNavigate('saved-designs')}
            style={{
              background: 'transparent',
              color: 'var(--primary)',
              fontWeight: 600,
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            View All <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid-4">
          {savedDesigns.slice(0, 4).map((design) => (
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
              {/* Image Banner */}
              <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={design.image}
                  alt={design.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
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
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)'
                }}>
                  {design.styleName}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>
                  {design.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Saved on {design.savedDate}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>
                    ${design.estimatedCost?.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      loadSavedDesign(design.id);
                      onNavigate('studio-3d');
                    }}
                    className="btn-outline-primary"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                  >
                    <Eye size={12} /> View 3D
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
