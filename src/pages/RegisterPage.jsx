import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage({ onNavigate }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Customer / Homeowner'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMessage('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Verification according to Table 7.1:
    // U_REG_3: User forgets to enter a particular required field -> "Display message that the value in the field is required"
    if (!formData.name.trim()) {
      setErrorMessage('Full Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email address is required.');
      return;
    }
    if (!formData.password) {
      setErrorMessage('Password is required.');
      return;
    }
    if (!formData.confirmPassword) {
      setErrorMessage('Confirm Password is required.');
      return;
    }

    // U_REG_2: User enters different password in confirm field -> "Display message that Password and Confirm Password fields don't match"
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password and Confirm Password fields don't match");
      return;
    }

    // U_REG_1: User selects already existing username -> "Display message to choose different username"
    const result = register(formData);

    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    // U_REG_4: User enters all details successfully -> User account created
    setSuccessMessage('User account created successfully! Redirecting to Dashboard...');
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="auth-grid" style={{
        display: 'grid',
        maxWidth: '920px',
        width: '100%',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)'
      }}>
        {/* Left Side Imagery (Figure 6.3.3) */}
        <div className="auth-left-panel" style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '36px',
          color: '#ffffff'
        }}>
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
            alt="Interior Lounge"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.45
            }}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '12px'
            }}>
              <Sparkles size={14} /> Join Virtual Interior Designer AI
            </div>
            <h2 style={{ fontSize: '24px', color: '#ffffff', fontWeight: 800, marginBottom: '8px' }}>
              Design Your Dream Space
            </h2>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '1.5' }}>
              Create an account to upload room photos, analyze layouts with AI models, and explore realistic 3D designs.
            </p>
          </div>
        </div>

        {/* Right Side Form (Figure 6.3.3) */}
        <div className="auth-right-panel" style={{ padding: '36px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Create Account</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Sign up to get started with intelligent interior solutions
            </p>
          </div>

          {errorMessage && (
            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: '#d1fae5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={15} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', paddingLeft: '36px', padding: '8px 12px 8px 36px' }}
                />
                <User size={15} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', paddingLeft: '36px', padding: '8px 12px 8px 36px' }}
                />
                <Mail size={15} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Phone Number (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: '100%', paddingLeft: '36px', padding: '8px 12px 8px 36px' }}
                />
                <Phone size={15} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 36px 8px 36px' }}
                />
                <Lock size={15} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: 'var(--text-light)' }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ width: '100%', paddingLeft: '36px', padding: '8px 12px 8px 36px' }}
                />
                <Lock size={15} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '10px', marginTop: '6px' }}>
              <span>Sign Up</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              style={{ background: 'transparent', color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
