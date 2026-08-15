// Admin data for ML Models, Users, System Logs, and Live Metrics
export const INITIAL_AI_MODELS = [
  {
    id: 'mdl-seg-01',
    name: 'Room-Seg YOLOv8-Interior',
    type: 'Segmentation & Edge Detection',
    version: 'v2.4.1',
    framework: 'PyTorch / ONNX',
    weightsSize: '142 MB',
    accuracy: '94.8%',
    latency: '320 ms',
    status: 'Active',
    lastUpdated: '2026-08-10'
  },
  {
    id: 'mdl-diff-02',
    name: 'Interior-Diffusion XL-Turbo',
    type: 'Generative Room Restyling',
    version: 'v3.1.0',
    framework: 'Diffusers / PyTorch',
    weightsSize: '2.4 GB',
    accuracy: '98.1%',
    latency: '1.45 s',
    status: 'Active',
    lastUpdated: '2026-08-12'
  },
  {
    id: 'mdl-col-03',
    name: 'ColorHarmony-LLM Embedder',
    type: 'Style & Palette Recommendation',
    version: 'v1.8.0',
    framework: 'FastAPI / scikit-learn',
    weightsSize: '88 MB',
    accuracy: '96.2%',
    latency: '85 ms',
    status: 'Active',
    lastUpdated: '2026-07-28'
  },
  {
    id: 'mdl-legacy-04',
    name: 'Legacy R-CNN V1 (Obsolete)',
    type: 'Object Detection',
    version: 'v1.0.2',
    framework: 'TensorFlow',
    weightsSize: '410 MB',
    accuracy: '81.4%',
    latency: '890 ms',
    status: 'Deprecated',
    lastUpdated: '2025-11-15'
  }
];

export const INITIAL_USERS = [
  {
    id: 'usr-001',
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    phone: '+92 300 1234567',
    role: 'Customer / Homeowner',
    status: 'Active',
    designsCount: 12,
    joinedDate: '2024-04-10'
  },
  {
    id: 'usr-002',
    name: 'Eman Kashif (Lead Researcher)',
    email: 'Abdullahkashif0018@gmail.com',
    phone: '+92 301 5551234',
    role: 'Admin / Lead Engineer',
    status: 'Active',
    designsCount: 45,
    joinedDate: '2024-01-15'
  },
  {
    id: 'usr-003',
    name: 'Laiba Fatima (Lead Researcher)',
    email: 'alihamza72038@gmail.com',
    phone: '+92 302 9998877',
    role: 'Admin / AI Engineer',
    status: 'Active',
    designsCount: 38,
    joinedDate: '2024-01-15'
  },
  {
    id: 'usr-004',
    name: 'Mam Shaista Ghafoor',
    email: 'shaista.ghafoor@uos.edu.pk',
    phone: '+92 300 7654321',
    role: 'Project Supervisor / HOD',
    status: 'Active',
    designsCount: 22,
    joinedDate: '2024-01-01'
  },
  {
    id: 'usr-005',
    name: 'Tariq Mehmood',
    email: 'tariq.m@vendor.com',
    phone: '+92 333 4445566',
    role: 'Furniture Vendor',
    status: 'Active',
    designsCount: 18,
    joinedDate: '2024-03-22'
  },
  {
    id: 'usr-006',
    name: 'Sarah Jenkins',
    email: 'sarah.j@interiorpro.com',
    phone: '+1 415 888 9012',
    role: 'Professional Designer',
    status: 'Inactive',
    designsCount: 5,
    joinedDate: '2024-05-02'
  }
];

export const INITIAL_SYSTEM_LOGS = [
  { id: 'log-101', timestamp: '2026-08-13 21:30:12', level: 'INFO', module: 'AuthService', message: 'User ayesha.khan@example.com logged in successfully via WebApp.' },
  { id: 'log-102', timestamp: '2026-08-13 21:31:05', level: 'INFO', module: 'AI-Engine', message: 'Room-Seg YOLOv8 executed room wall detection on input_491.png in 312ms.' },
  { id: 'log-103', timestamp: '2026-08-13 21:32:44', level: 'WARNING', module: 'CatalogAPI', message: 'Vendor API response latency exceeded threshold (420ms > 300ms).' },
  { id: 'log-104', timestamp: '2026-08-13 21:33:18', level: 'INFO', module: 'RenderService', message: '3D WebGL Room Scene compiled successfully with 6 mesh instances.' },
  { id: 'log-105', timestamp: '2026-08-13 21:34:02', level: 'ERROR', module: 'UploadService', message: 'Invalid file format rejected: user attempted to upload resume.pdf as room image.' },
  { id: 'log-106', timestamp: '2026-08-13 21:35:10', level: 'INFO', module: 'AI-Diffuser', message: 'Generated 4 interior styles (Modern, Minimal, Luxury, Scandi) in 1.42s.' },
  { id: 'log-107', timestamp: '2026-08-13 21:36:20', level: 'INFO', module: 'Database', message: 'Design saved: Modern Elegance Living (ID: proj-01).' }
];
