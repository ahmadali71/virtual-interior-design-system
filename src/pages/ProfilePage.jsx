import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, CheckCircle2, User, Mail, Phone, Lock, Save } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const [name, setName] = useState(currentUser?.name || 'Ayesha Khan');
  const [email, setEmail] = useState(currentUser?.email || 'ayesha.khan@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+92 300 1234567');
  const [password, setPassword] = useState('••••••••');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  const [successMsg, setSuccessMsg] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone
    });
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setAvatarUrl(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header (Figure 6.3.8) */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Profile</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          Manage your personal information
        </p>
      </div>

      {/* Main Profile Card (Figure 6.3.8) */}
      <div className="vids-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {successMsg && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            background: '#d1fae5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Circular Avatar with Camera Badge (Figure 6.3.8) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={avatarUrl}
              alt="User Avatar"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <label
              htmlFor="avatar-upload"
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <Camera size={16} />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* Profile Form (Figure 6.3.8) */}
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Change Password
            </label>
            {isChangingPass ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newPass) {
                      setPassword('••••••••');
                      setIsChangingPass(false);
                      setSuccessMsg('Password changed successfully!');
                    }
                  }}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={password}
                  disabled
                  style={{ flex: 1, background: 'var(--bg-main)', color: 'var(--text-muted)' }}
                />
                <button
                  type="button"
                  onClick={() => setIsChangingPass(true)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Change
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '12px', marginTop: '12px' }}
          >
            <Save size={16} /> Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
