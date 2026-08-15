import React from 'react';
import { Sparkles, Box, Wand2, Shield, ArrowRight, CheckCircle2, Layers, Cpu, Award } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '40px' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{
        padding: '40px 24px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* University & Department Accreditation Header */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--primary)'
        }}>
          <Award size={15} />
          BSIT Final Year Project • University of Sargodha
        </div>

        <h1 className="hero-title" style={{
          fontSize: 'clamp(28px, 5vw, 44px)',
          lineHeight: '1.2',
          maxWidth: '850px',
          fontWeight: 800
        }}>
          Virtual Interior Designing System
          <span style={{ display: 'block', fontSize: 'clamp(16px, 3vw, 26px)', fontWeight: 600, color: 'var(--primary)', marginTop: '8px' }}>
            Enhancing User Experience Through Intelligent Design Solutions
          </span>
        </h1>

        <p style={{
          maxWidth: '700px',
          fontSize: '16px',
          color: 'var(--text-muted)',
          lineHeight: '1.6'
        }}>
          An AI-powered web platform integrating machine learning computer vision for room segmentation, 
          automated furniture placement, intelligent color harmonies, and real-time interactive 3D room visualization.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
          <button
            onClick={() => onNavigate('dashboard')}
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            Launch Design Dashboard <ArrowRight size={18} />
          </button>

          <button
            onClick={() => onNavigate('upload-room')}
            className="btn-secondary"
            style={{ padding: '12px 24px', fontSize: '15px' }}
          >
            <Wand2 size={18} color="var(--primary)" />
            Try AI Room Scanner
          </button>

          <button
            onClick={() => onNavigate('studio-3d')}
            className="btn-secondary"
            style={{ padding: '12px 24px', fontSize: '15px' }}
          >
            <Box size={18} color="var(--primary)" />
            Open 3D Studio
          </button>
        </div>

        {/* Academic Project Credits */}
        <div style={{
          marginTop: '20px',
          padding: '16px 24px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          display: 'flex',
          gap: '30px',
          fontSize: '12px',
          textAlign: 'left'
        }}>
          <div>
            <div style={{ color: 'var(--text-light)', fontWeight: 600 }}>Project Supervisor:</div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Mam Shaista Ghafoor</div>
            <div style={{ color: 'var(--text-muted)' }}>Head of CS & IT Department</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }} />
          <div>
            <div style={{ color: 'var(--text-light)', fontWeight: 600 }}>Project Researchers:</div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Eman Kashif (22BSIT30453)</div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Laiba Fatima (22BSIT30448)</div>
          </div>
        </div>
      </section>

      {/* Core Feature Pillars */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Core Architectural Capabilities</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Built strictly according to object-oriented and structured software engineering deliverables
          </p>
        </div>

        <div className="grid-3">
          <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: '18px' }}>AI-Assisted Room Analysis</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Computer vision room boundary detection, floor-to-wall segmentation, and automated object recognition for layout optimization.
            </p>
          </div>

          <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box size={24} />
            </div>
            <h3 style={{ fontSize: '18px' }}>Interactive 2D/3D Visualization</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              High-performance WebGL 3D Room Studio with orbit navigation, lighting customization, drag-and-drop furniture, and wall recoloring.
            </p>
          </div>

          <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={24} />
            </div>
            <h3 style={{ fontSize: '18px' }}>Cost Estimation & PDF Export</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Automated Bill of Materials (BOM) calculation with vendor integration, square meter finishing estimates, and downloadable reports.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
