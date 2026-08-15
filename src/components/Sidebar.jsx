import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  UploadCloud,
  Sparkles,
  Palette,
  Box,
  ShoppingBag,
  BookmarkCheck,
  Calculator,
  User,
  ShieldCheck,
  CheckSquare,
  LogOut,
  X
} from 'lucide-react';

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }) {
  const { currentUser, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload-room', label: 'Upload Room', icon: UploadCloud },
    { id: 'ai-analysis', label: 'AI Analysis', icon: Sparkles },
    { id: 'design-results', label: 'Designs', icon: Palette },
    { id: 'studio-3d', label: '3D Room Studio', icon: Box, highlight: true },
    { id: 'furniture-catalog', label: 'Furniture Catalog', icon: ShoppingBag },
    { id: 'saved-designs', label: 'Saved Designs', icon: BookmarkCheck },
    { id: 'cost-estimation', label: 'Cost & Summary PDF', icon: Calculator },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const sidebarContent = (
    <>
      {/* Mobile Close Button */}
      {isOpen && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            display: 'none',
            padding: '4px',
            zIndex: 10
          }}
          className="sidebar-close-btn"
        >
          <X size={20} />
        </button>
      )}

      {/* Top Navigation Links */}
      <div>
        <div style={{ padding: '0 12px 16px 12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)' }}>
          Main Workspace
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-main)',
                  background: isActive ? 'var(--primary-gradient)' : 'transparent',
                  textAlign: 'left',
                  width: '100%',
                  boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.25)' : 'none'
                }}
              >
                <Icon size={18} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.highlight && !isActive && (
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '6px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)'
                  }}>
                    3D
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Administration Section */}
        <div style={{ marginTop: '24px', padding: '0 12px 8px 12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)' }}>
          Administration & Quality
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => onNavigate('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: currentPage === 'admin' ? 600 : 500,
              color: currentPage === 'admin' ? '#ffffff' : 'var(--text-main)',
              background: currentPage === 'admin' ? 'var(--primary-gradient)' : 'transparent',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <ShieldCheck size={18} color={currentPage === 'admin' ? '#ffffff' : 'var(--text-muted)'} />
            <span style={{ flex: 1 }}>Admin Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('testing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: currentPage === 'testing' ? 600 : 500,
              color: currentPage === 'testing' ? '#ffffff' : 'var(--text-main)',
              background: currentPage === 'testing' ? 'var(--primary-gradient)' : 'transparent',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <CheckSquare size={18} color={currentPage === 'testing' ? '#ffffff' : 'var(--text-muted)'} />
            <span style={{ flex: 1 }}>Test Suite (Ch. 7)</span>
          </button>
        </nav>
      </div>

      {/* Bottom User Actions */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        {currentUser ? (
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--danger)',
              background: 'transparent',
              width: '100%',
              textAlign: 'left'
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate('login')}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            Log In
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside
        className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
        style={{
          width: '260px',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border)',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px 14px',
          flexShrink: 0
        }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
