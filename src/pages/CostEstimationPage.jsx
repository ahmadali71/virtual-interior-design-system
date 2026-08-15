import React from 'react';
import { useDesign } from '../context/DesignContext';
import { useAuth } from '../context/AuthContext';
import { generateDesignPDF } from '../services/pdfReportGenerator';
import { Calculator, Download, ExternalLink, Box, DollarSign, Layers, CheckCircle2 } from 'lucide-react';

export default function CostEstimationPage({ onNavigate }) {
  const { currentProject } = useDesign();
  const { currentUser } = useAuth();

  const dims = currentProject.dimensions || { length: 5.5, width: 4.2, height: 2.8 };
  const floorArea = (dims.length * dims.width);
  const wallArea = (2 * (dims.length + dims.width) * dims.height);

  const furnitureItems = currentProject.placedFurniture || [];
  const furnitureSubtotal = furnitureItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const paintUnitRate = 8.50; // $8.50/m²
  const floorUnitRate = 24.00; // $24.00/m²
  const paintCost = Math.round(wallArea * paintUnitRate);
  const floorCost = Math.round(floorArea * floorUnitRate);
  const grandTotal = furnitureSubtotal + paintCost + floorCost;

  const handleDownloadPDF = () => {
    generateDesignPDF(currentProject, currentUser?.name || 'Ayesha Khan');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Design Cost & Bill of Materials</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Comprehensive budget breakdown for furniture, wall finishes, and flooring installation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigate('studio-3d')}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <Box size={16} /> Edit In 3D
          </button>
          <button
            onClick={handleDownloadPDF}
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            <Download size={16} /> Download PDF Summary
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid-3">
        <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Furniture & Décor</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>${furnitureSubtotal.toLocaleString()}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{furnitureItems.length} units placed</span>
        </div>

        <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Wall Paint & Surface</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: '#10b981' }}>${paintCost.toLocaleString()}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{wallArea.toFixed(1)} m² surface area</span>
        </div>

        <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Estimated Grand Total</span>
          <span style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b' }}>${grandTotal.toLocaleString()}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Includes flooring & finishes</span>
        </div>
      </div>

      {/* Furniture Schedule Table */}
      <div className="vids-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Furniture Schedule (Bill of Materials)</h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '10px 14px', fontWeight: 700 }}>#</th>
                <th style={{ padding: '10px 14px', fontWeight: 700 }}>Item Description</th>
                <th style={{ padding: '10px 14px', fontWeight: 700 }}>Finish / Color</th>
                <th style={{ padding: '10px 14px', fontWeight: 700 }}>Scale</th>
                <th style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'right' }}>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {furnitureItems.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>{index + 1}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: item.color, border: '1px solid #cbd5e1' }} />
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.color}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>{item.scale?.[0] || 1}x</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, textAlign: 'right', color: 'var(--primary)' }}>${item.price}</td>
                </tr>
              ))}
              {furnitureItems.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No furniture items placed in active canvas. Use the 3D Studio or Catalog to add items.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Civil & Architectural Calculations */}
      <div className="vids-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Civil Works & Finishing Estimates</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>Wall Painting & Priming</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Gross Wall Area: <strong>{wallArea.toFixed(1)} m²</strong></div>
              <div>Estimated Rate: <strong>${paintUnitRate}/m²</strong></div>
              <div>Selected Wall Tone: <strong>{currentProject.wallColor}</strong></div>
              <div style={{ marginTop: '8px', fontWeight: 700, color: 'var(--text-main)', fontSize: '14px' }}>
                Estimated Paint Work: ${paintCost}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>Flooring Installation</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Floor Surface Area: <strong>{floorArea.toFixed(1)} m²</strong></div>
              <div>Estimated Rate: <strong>${floorUnitRate}/m²</strong></div>
              <div>Selected Finish: <strong>{currentProject.floorId}</strong></div>
              <div style={{ marginTop: '8px', fontWeight: 700, color: 'var(--text-main)', fontSize: '14px' }}>
                Estimated Flooring Work: ${floorCost}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
