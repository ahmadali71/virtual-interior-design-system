import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Sun, Moon, Bell, Shield, User, LogOut, CheckCircle2, Menu } from 'lucide-react';

export default function Navbar({ onNavigate, currentPage, onToggleSidebar, sidebarOpen }) {
  const { currentUser, logout, usersList } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      gap: '12px'
    }}>
      {/* Brand & Page Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={onToggleSidebar}
          className="nav-hamburger"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            padding: '6px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <Menu size={24} />
        </button>

        <div 
          onClick={() => onNavigate('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
            flexShrink: 0
          }}>
            <Sparkles size={18} />
          </div>
          <div className="nav-brand-text">
            <div style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
              Virtual Interior Designer AI
            </div>
            <div className="nav-subtitle" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Govt. Graduate College for Women | University of Sargodha
            </div>
          </div>
          {/* Mobile-only brand text fallback */}
          <div className="nav-mobile-brand" style={{ display: 'none', fontWeight: 800, fontSize: '14px', color: 'var(--text-main)' }}>
            VIDA
          </div>
        </div>
      </div>

      {/* Center status badge */}
      <div className="nav-status-badge" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="vids-badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
          AI Model v2.4.1 Connected
        </span>
      </div>

      {/* Right User Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Test Suite Button */}
        <button
          onClick={() => onNavigate('testing')}
          className="btn-secondary nav-test-btn"
          style={{ padding: '6px 12px', fontSize: '12px', borderColor: '#6366f1', color: '#6366f1' }}
          title="Run Chapter 7 Software Test Suite"
        >
          <CheckCircle2 size={15} />
          Test Suite (Ch. 7)
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            flexShrink: 0
          }}
          title="Toggle Dark / Light Theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* User Profile info */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              onClick={() => onNavigate('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {currentUser.name.charAt(0)}
              </div>
              <div style={{ textAlign: 'left' }} className="nav-user-info">
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  {currentUser.role.split('/')[0]}
                </div>
              </div>
            </div>

            {currentUser.role.includes('Admin') && (
              <button
                onClick={() => onNavigate('admin')}
                className="btn-outline-primary"
                style={{ padding: '6px 10px', fontSize: '12px' }}
                title="Open Admin Control Center"
              >
                <Shield size={14} /> Admin
              </button>
            )}

            <button
              onClick={logout}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                padding: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('login')}
            className="btn-primary"
            style={{ padding: '6px 14px', fontSize: '13px' }}
          >
            <User size={15} /> Sign In
          </button>
        )}
      </div>
    </header>
  );
}
