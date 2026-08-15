import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_AI_MODELS, INITIAL_SYSTEM_LOGS } from '../data/adminMockData';
import {
  ShieldCheck,
  Cpu,
  Users,
  FileText,
  Activity,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  HardDrive,
  Database,
  BarChart2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { usersList, adminCreateUser, adminUpdateUser, adminDeleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState('models'); // 'models' | 'users' | 'logs' | 'performance'

  // Model Management State (Table 7.6.1)
  const [models, setModels] = useState(INITIAL_AI_MODELS);
  const [showUploadModelModal, setShowUploadModelModal] = useState(false);
  const [newModelData, setNewModelData] = useState({
    name: '',
    type: 'Generative Room Restyling',
    version: 'v1.0.0',
    framework: 'PyTorch / ONNX',
    weightsSize: '250 MB',
    accuracy: '95.0%'
  });

  // User Management State (Table 7.6.2)
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Customer / Homeowner',
    status: 'Active'
  });

  // Logs Filter State (Table 7.6.3)
  const [logs, setLogs] = useState(INITIAL_SYSTEM_LOGS);
  const [logFilter, setLogFilter] = useState('ALL'); // 'ALL' | 'INFO' | 'WARNING' | 'ERROR'

  // Performance State (Table 7.3 ASPM)
  const [cpuLoad, setCpuLoad] = useState(28);
  const [memUsage, setMemUsage] = useState(3.4);
  const [dbLatency, setDbLatency] = useState(14);
  const [aiLatency, setAiLatency] = useState(312);

  // Model Handlers (A_MDL_1, A_MDL_2, A_MDL_3)
  const handleUploadModel = (e) => {
    e.preventDefault();
    if (!newModelData.name) return;

    const added = {
      id: `mdl-${Date.now()}`,
      name: newModelData.name,
      type: newModelData.type,
      version: newModelData.version,
      framework: newModelData.framework,
      weightsSize: newModelData.weightsSize,
      accuracy: newModelData.accuracy,
      latency: '290 ms',
      status: 'Active',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setModels([added, ...models]);
    setShowUploadModelModal(false);
    setNewModelData({ name: '', type: 'Generative Room Restyling', version: 'v1.0.0', framework: 'PyTorch / ONNX', weightsSize: '250 MB', accuracy: '95.0%' });
  };

  const handleDeleteModel = (id) => {
    setModels(models.filter(m => m.id !== id));
  };

  const handleUpdateModelWeights = (id) => {
    setModels(models.map(m => m.id === id ? { ...m, accuracy: '98.9%', weightsSize: '165 MB', lastUpdated: 'Today' } : m));
    alert('Model weights configuration updated and compiled successfully.');
  };

  // User Handlers (A_UAM_1, A_UAM_2, A_UAM_3)
  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) return;
    adminCreateUser(newUserData);
    setShowAddUserModal(false);
    setNewUserData({ name: '', email: '', phone: '', role: 'Customer / Homeowner', status: 'Active' });
  };

  // Log Filtering (A_LOG_2)
  const filteredLogs = logs.filter(log => {
    if (logFilter === 'ALL') return true;
    return log.level === logFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={26} color="var(--primary)" />
            Admin & System Control Center
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Manage AI/ML model pipelines, user permissions, runtime logs, and server performance metrics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: 'var(--border-light)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
          <button
            onClick={() => setActiveTab('models')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              background: activeTab === 'models' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'models' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            ML Models ({models.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              background: activeTab === 'users' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            Users ({usersList.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              background: activeTab === 'logs' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'logs' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            System Logs
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              background: activeTab === 'performance' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'performance' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            Metrics & Health
          </button>
        </div>
      </div>

      {/* TAB 1: MANAGE ML MODELS (Table 7.6.1) */}
      {activeTab === 'models' && (
        <div className="vids-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>AI / Computer Vision Model Registry</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Active models serving room wall segmentation, style diffusion, and palette optimization
              </p>
            </div>
            <button
              onClick={() => setShowUploadModelModal(true)}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '12px' }}
            >
              <Upload size={14} /> Upload New Model
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '10px 14px' }}>Model Name</th>
                  <th style={{ padding: '10px 14px' }}>Task Type</th>
                  <th style={{ padding: '10px 14px' }}>Framework</th>
                  <th style={{ padding: '10px 14px' }}>Weights Size</th>
                  <th style={{ padding: '10px 14px' }}>Accuracy / mIoU</th>
                  <th style={{ padding: '10px 14px' }}>Status</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {models.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                      {m.name}
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Version: {m.version}</span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>{m.type}</td>
                    <td style={{ padding: '12px 14px' }}>{m.framework}</td>
                    <td style={{ padding: '12px 14px' }}>{m.weightsSize}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>{m.accuracy}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className={`vids-badge ${m.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => handleUpdateModelWeights(m.id)}
                          className="btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          title="Update Model Weights (A_MDL_3)"
                        >
                          Update Weights
                        </button>
                        <button
                          onClick={() => handleDeleteModel(m.id)}
                          style={{ background: 'transparent', color: 'var(--danger)', padding: '4px' }}
                          title="Delete Model (A_MDL_2)"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE USER ACCOUNTS (Table 7.6.2) */}
      {activeTab === 'users' && (
        <div className="vids-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>User Accounts Directory</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Manage user permissions, roles, and active status
              </p>
            </div>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '12px' }}
            >
              <Plus size={14} /> Create User Account
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '10px 14px' }}>Name & Email</th>
                  <th style={{ padding: '10px 14px' }}>Role</th>
                  <th style={{ padding: '10px 14px' }}>Contact Phone</th>
                  <th style={{ padding: '10px 14px' }}>Status</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className="vids-badge badge-primary">{u.role}</span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>{u.phone}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className={`vids-badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => adminUpdateUser(u.id, { status: u.status === 'Active' ? 'Disabled' : 'Active' })}
                          className="btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                        >
                          {u.status === 'Active' ? 'Disable' : 'Activate'}
                        </button>
                        <button
                          onClick={() => adminDeleteUser(u.id)}
                          style={{ background: 'transparent', color: 'var(--danger)', padding: '4px' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM LOGS (Table 7.6.3) */}
      {activeTab === 'logs' && (
        <div className="vids-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>System Event Logs (A_LOG_1)</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Chronological record of authentication, model inferences, and API events</p>
            </div>

            {/* Filter Buttons (A_LOG_2) */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['ALL', 'INFO', 'WARNING', 'ERROR'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setLogFilter(lvl)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: logFilter === lvl ? 'var(--primary)' : 'var(--bg-main)',
                    color: logFilter === lvl ? '#ffffff' : 'var(--text-main)',
                    border: '1px solid var(--border)'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredLogs.map(log => (
              <div
                key={log.id}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontSize: '12px'
                }}
              >
                {log.level === 'INFO' && <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />}
                {log.level === 'WARNING' && <AlertTriangle size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />}
                {log.level === 'ERROR' && <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />}

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>[{log.module}]</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{log.timestamp}</span>
                  </div>
                  <div style={{ color: 'var(--text-main)' }}>{log.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PERFORMANCE MONITORING (Table 7.3) */}
      {activeTab === 'performance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-4">
            <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>CPU Load (i5 / 8-Core)</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#10b981' }}>{cpuLoad}%</span>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Optimal operating range</span>
            </div>

            <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Memory Allocation</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>{memUsage} GB / 8.0 GB</span>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Heap stability verified</span>
            </div>

            <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Database Query Latency</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#0284c7' }}>{dbLatency} ms</span>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>MySQL Indexed Cache</span>
            </div>

            <div className="vids-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>AI Inference Speed</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#ca8a04' }}>{aiLatency} ms</span>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>ONNX GPU Pipeline</span>
            </div>
          </div>

          <div className="vids-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Real-Time Inference & Rendering Stream</h3>
            <div style={{
              background: '#0f172a',
              color: '#38bdf8',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div>[SYSTEM] WebGL 3D Renderer initializing with Three.js r168...</div>
              <div>[PIPELINE] Shaders compiled: PBR Standard Material, ShadowMap PCFSoft.</div>
              <div>[MODEL] Room-Seg YOLOv8 inference cycle: 312ms latency on 1024x768 input tensor.</div>
              <div>[MEMORY] VRAM utilization: 480MB / 4096MB. 0 buffer leaks detected.</div>
              <div>[SERVER] FastAPI gateway listening on 127.0.0.1:8000 (status: healthy).</div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Model Modal (A_MDL_1) */}
      {showUploadModelModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, padding: '20px'
        }}>
          <div className="vids-card" style={{ maxWidth: '480px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>Upload AI / ML Model (A_MDL_1)</h3>
            <form onSubmit={handleUploadModel} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Model Name</label>
                <input
                  type="text"
                  placeholder="e.g. YOLOv9-RoomBoundary"
                  value={newModelData.name}
                  onChange={(e) => setNewModelData({ ...newModelData, name: e.target.value })}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Task Category</label>
                <input
                  type="text"
                  value={newModelData.type}
                  onChange={(e) => setNewModelData({ ...newModelData, type: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Model Version</label>
                <input
                  type="text"
                  value={newModelData.version}
                  onChange={(e) => setNewModelData({ ...newModelData, version: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowUploadModelModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Upload & Register</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal (A_UAM_1) */}
      {showAddUserModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, padding: '20px'
        }}>
          <div className="vids-card" style={{ maxWidth: '480px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>Create User Account (A_UAM_1)</h3>
            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Role</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="Customer / Homeowner">Customer / Homeowner</option>
                  <option value="Professional Designer">Professional Designer</option>
                  <option value="Furniture Vendor">Furniture Vendor</option>
                  <option value="Admin / Lead Engineer">Admin / Lead Engineer</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddUserModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
