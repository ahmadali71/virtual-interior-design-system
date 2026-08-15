import jsPDF from 'jspdf';

export function generateDesignPDF(project, clientName = 'Ayesha Khan') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [92, 84, 229]; // #5c54e5
  const darkTextColor = [15, 23, 42]; // #0f172a
  const mutedTextColor = [100, 116, 139]; // #64748b

  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('VIRTUAL INTERIOR DESIGNING SYSTEM (VIDS)', 14, 12);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Department of CS & IT | University of Sargodha / Women Degree College', 14, 18);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, 155, 18);

  // Document Title
  let y = 38;
  doc.setTextColor(...darkTextColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Design Specification & Cost Estimation Report', 14, y);

  y += 6;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text(`Project Title: ${project.title || 'Custom Room Design'} | Style: ${project.styleName || project.styleId}`, 14, y);

  // Client & Room Info Box
  y += 10;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 34, 3, 3, 'FD');

  doc.setFontSize(10);
  doc.setTextColor(...darkTextColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Client / Owner:', 18, y + 8);
  doc.text('Room Category:', 18, y + 16);
  doc.text('Dimensions (L x W x H):', 18, y + 24);

  doc.setFont('helvetica', 'normal');
  doc.text(clientName, 65, y + 8);
  doc.text(project.roomType || 'Living Room', 65, y + 16);
  const dims = project.dimensions || { length: 5.5, width: 4.2, height: 2.8 };
  doc.text(`${dims.length}m x ${dims.width}m x ${dims.height}m (${(dims.length * dims.width).toFixed(1)} m² / ${(dims.length * dims.width * 10.764).toFixed(0)} sq ft)`, 65, y + 24);

  doc.setFont('helvetica', 'bold');
  doc.text('Wall Palette Hex:', 110, y + 8);
  doc.text('Floor Material:', 110, y + 16);
  doc.text('Active Items Placed:', 110, y + 24);

  doc.setFont('helvetica', 'normal');
  doc.text(project.wallColor || '#ebe7df', 150, y + 8);
  doc.text(project.floorId || 'Scandinavian White Oak', 150, y + 16);
  doc.text(`${(project.placedFurniture || []).length} Units`, 150, y + 24);

  // Bill of Materials Table
  y += 44;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkTextColor);
  doc.text('Bill of Materials & Furniture Schedule', 14, y);

  y += 6;
  doc.setFillColor(238, 242, 255);
  doc.rect(14, y, 182, 8, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('#', 18, y + 5.5);
  doc.text('Item Description', 28, y + 5.5);
  doc.text('Color / Finish', 105, y + 5.5);
  doc.text('Dimensions', 140, y + 5.5);
  doc.text('Price ($)', 175, y + 5.5);

  y += 8;
  const items = project.placedFurniture || [];
  let furnitureTotal = 0;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkTextColor);

  items.forEach((item, index) => {
    furnitureTotal += item.price || 0;
    const isEven = index % 2 === 0;
    if (isEven) {
      doc.setFillColor(250, 250, 250);
      doc.rect(14, y, 182, 7, 'F');
    }

    doc.text(`${index + 1}`, 18, y + 5);
    doc.text((item.name || 'Furniture Item').substring(0, 38), 28, y + 5);
    doc.text(item.color || '#334155', 105, y + 5);
    doc.text(`${item.scale?.[0] || 1}x scale`, 140, y + 5);
    doc.text(`$${item.price || 0}`, 175, y + 5);

    y += 7;
  });

  if (items.length === 0) {
    doc.text('No furniture items currently placed on canvas.', 28, y + 5);
    y += 8;
  }

  // Cost Summary & Civil Works
  const floorArea = (dims.length * dims.width);
  const wallArea = (2 * (dims.length + dims.width) * dims.height);
  const paintEstCost = Math.round(wallArea * 8.5); // $8.50 per sq meter paint & labor
  const floorEstCost = Math.round(floorArea * 24.0); // $24 per sq meter flooring
  const grandTotal = furnitureTotal + paintEstCost + floorEstCost;

  y += 6;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, 196, y);

  y += 8;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(100, y, 96, 38, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedTextColor);
  doc.text('Furniture & Fixtures Subtotal:', 104, y + 7);
  doc.text(`Wall Paint & Priming (${wallArea.toFixed(0)} m²):`, 104, y + 14);
  doc.text(`Flooring & Installation (${floorArea.toFixed(0)} m²):`, 104, y + 21);

  doc.setTextColor(...darkTextColor);
  doc.text(`$${furnitureTotal.toLocaleString()}`, 175, y + 7);
  doc.text(`$${paintEstCost.toLocaleString()}`, 175, y + 14);
  doc.text(`$${floorEstCost.toLocaleString()}`, 175, y + 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('Estimated Grand Total:', 104, y + 31);
  doc.text(`$${grandTotal.toLocaleString()}`, 172, y + 31);

  // Footer & Sign-off
  y = 265;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, 196, y);

  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  doc.setFont('helvetica', 'normal');
  doc.text('Project Supervisor: Mam Shaista Ghafoor | Researchers: Eman Kashif & Laiba Fatima', 14, y + 6);
  doc.text('Virtual Interior Designing System © 2026 Dept of CS & IT, Women Degree College Sargodha', 14, y + 11);
  doc.text('Page 1 of 1', 180, y + 11);

  // Save PDF
  const filename = `${(project.title || 'Interior_Design_Plan').replace(/\s+/g, '_')}_Summary.pdf`;
  doc.save(filename);
}
