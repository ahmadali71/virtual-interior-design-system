import React, { useState, useRef } from 'react';

export default function BeforeAfterSlider({
  beforeImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
  afterImage = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
  styleTitle = 'Modern Elegance'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border)'
      }}
    >
      {/* After Image (Full background) */}
      <img
        src={afterImage}
        alt="AI Restyled Design"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Before Image (Clipped overlay) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${sliderPosition}%`,
          height: '100%',
          overflow: 'hidden',
          borderRight: '2px solid #ffffff',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}
      >
        <img
          src={beforeImage}
          alt="Original Empty Room"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '1000px',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Divider Bar & Handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: '2px',
          background: '#ffffff',
          transform: 'translateX(-50%)',
          pointerEvents: 'none'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '12px',
          color: 'var(--primary)'
        }}>
          ⇄
        </div>
      </div>

      {/* Badges */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        background: 'rgba(15, 23, 42, 0.75)',
        color: '#ffffff',
        padding: '4px 12px',
        borderRadius: 'var(--radius-full)',
        fontSize: '11px',
        fontWeight: 600,
        backdropFilter: 'blur(4px)'
      }}>
        Original Input Photo
      </div>

      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: 'var(--primary-gradient)',
        color: '#ffffff',
        padding: '4px 12px',
        borderRadius: 'var(--radius-full)',
        fontSize: '11px',
        fontWeight: 700,
        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.4)'
      }}>
        ✨ AI Generated: {styleTitle}
      </div>
    </div>
  );
}
