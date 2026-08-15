import React, { useState, useEffect } from 'react';
import { useDesign } from '../context/DesignContext';
import { AI_ANALYSIS_STAGES } from '../services/aiEngineService';
import { CheckCircle2, Loader2, Sparkles, Lightbulb, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AIAnalysisPage({ onNavigate }) {
  const { currentProject, updateCurrentProject } = useDesign();
  const [percent, setPercent] = useState(12);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [analysisError, setAnalysisError] = useState('');

  const analysis = currentProject.aiAnalysisResult;

  useEffect(() => {
    if (analysis) {
      setIsCompleted(true);
      setPercent(100);
      setActiveStageIndex(AI_ANALYSIS_STAGES.length);
      return;
    }

    let current = 12;
    let stage = 0;

    const interval = setInterval(() => {
      current += 3;
      if (current >= 100) {
        current = 100;
        stage = AI_ANALYSIS_STAGES.length;
        clearInterval(interval);
        setPercent(100);
        setActiveStageIndex(AI_ANALYSIS_STAGES.length);
        setIsCompleted(true);

        updateCurrentProject({
          aiAnalysisResult: {
            detectedFloorArea: 24.6,
            detectedWallArea: 54.0,
            primaryOrientation: 'South-East',
            ambientLightScore: '88% High',
            suggestedThemes: ['Modern Elegance', 'Minimal Style', 'Classic Luxury', 'Scandinavian']
          }
        });

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      } else {
        setPercent(current);
        const stageIdx = Math.min(
          AI_ANALYSIS_STAGES.length - 1,
          Math.floor((current / 100) * AI_ANALYSIS_STAGES.length)
        );
        setActiveStageIndex(stageIdx);
      }
    }, 110);

    return () => clearInterval(interval);
  }, [analysis, updateCurrentProject]);

  const strokeDashoffset = 440 - (440 * percent) / 100;

  return (
    <div style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Modal Container matching Figure 6.3.5 */}
      <div className="vids-card" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '40px 36px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border)'
      }}>
        {/* Title & Subtitle */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)' }}>
            AI is Analyzing Your Room
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.5' }}>
            Please wait while our AI analyzes your room layout, detects objects and generates design ideas.
          </p>
        </div>

        {/* Circular Animated Progress Ring (Figure 6.3.5) */}
        <div style={{ position: 'relative', width: '160px', height: '160px', margin: '10px 0' }}>
          <svg style={{ width: '160px', height: '160px', transform: 'rotate(-90deg)' }}>
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e2e8f0"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#progressGradient)"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="440"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Percentage Display */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '32px',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '-0.03em'
          }}>
            {percent}%
          </div>
        </div>

        {/* Multi-Step Checklist (Figure 6.3.5) */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          textAlign: 'left',
          padding: '0 16px'
        }}>
          {AI_ANALYSIS_STAGES.map((stage, idx) => {
            const isDone = percent === 100 || idx < activeStageIndex;
            const isCurrent = idx === activeStageIndex && percent < 100;
            const isPending = idx > activeStageIndex;

            return (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '13px',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isDone ? 'var(--text-main)' : (isCurrent ? 'var(--primary)' : 'var(--text-light)')
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={18} color="#10b981" />
                ) : isCurrent ? (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  </div>
                ) : (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '1.5px solid #cbd5e1'
                  }} />
                )}
                <span>{stage.name}</span>
              </div>
            );
          })}
        </div>

        {/* Tip Notice Box (Figure 6.3.5) */}
        <div style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-main)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12px',
          color: 'var(--text-muted)',
          textAlign: 'left'
        }}>
          <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
            <Sparkles size={18} />
          </div>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Tip: </span>
            {analysis
              ? 'Analysis complete. Explore your personalized design recommendations below.'
              : 'This may take a few seconds. Please do not close or refresh the page.'}
          </div>
        </div>

        {/* Analysis Result Summary */}
        {isCompleted && analysis && (
          <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>Detected Room Profile</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Room Type</div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>{analysis.detectedRoomType || 'Living Room'}</div>
              </div>
              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Confidence</div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>{analysis.confidenceScore ? `${analysis.confidenceScore}%` : 'N/A'}</div>
              </div>
              {analysis.spatialDimensions && (
                <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Floor Area</div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{analysis.spatialDimensions.floorAreaSqM} m²</div>
                </div>
              )}
              {analysis.lightingAnalysis && (
                <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Lighting</div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{analysis.lightingAnalysis.naturalLightLevel}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Continue CTA once completed */}
        {isCompleted && (
          <button
            onClick={() => onNavigate('design-results')}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '6px' }}
          >
            <span>Explore AI Design Results</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
