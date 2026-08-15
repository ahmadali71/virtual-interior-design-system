import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage({ onNavigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('ayesha.khan@example.com');
  const [password, setPassword] = useState('secret123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Check U_LOGIN_1, U_LOGIN_2, U_LOGIN_3 test scenarios
    if (!email || !password) {
      setErrorMessage('Login or Password is required.');
      return;
    }

    const res = login(email, password);
    if (res.success) {
      onNavigate('dashboard');
    } else {
      setErrorMessage(res.error || 'Login or Password is incorrect.');
    }
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
        maxWidth: '900px',
        width: '100%',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)'
      }}>
        {/* Left Side Imagery (Figure 6.3.2) */}
        <div className="auth-left-panel" style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '36px',
          color: '#ffffff'
        }}>
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
            alt="Interior Lounge"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.55
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
              <Sparkles size={14} /> AI Space Architecture
            </div>
            <h2 style={{ fontSize: '24px', color: '#ffffff', fontWeight: 800, marginBottom: '8px' }}>
              Virtual Interior Designer AI
            </h2>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '1.5' }}>
              Transform your rooms into photorealistic 3D environments with intelligent space optimization.
            </p>
          </div>
        </div>

        {/* Right Side Form (Figure 6.3.2) */}
        <div className="auth-right-panel" style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              margin: '0 auto 12px auto',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Lock size={20} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Welcome Back!</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Login to continue to your account
            </p>
          </div>

          {errorMessage && (
            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-main)' }}>
                Email Address / Username
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', paddingLeft: '38px' }}
                />
                <Mail size={16} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                  Password
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered email.'); }} style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', paddingLeft: '38px', paddingRight: '38px' }}
                />
                <Lock size={16} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: 'var(--text-light)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '6px' }}>
              <span>Login</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Switch Account Quick Presets */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Quick Demo Logins:
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => { setEmail('ayesha.khan@example.com'); setPassword('secret123'); }}
                style={{ padding: '4px 10px', borderRadius: '4px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '11px', fontWeight: 600 }}
              >
                User (Ayesha)
              </button>
              <button
                type="button"
                onClick={() => { setEmail('Abdullahkashif0018@gmail.com'); setPassword('admin123'); }}
                style={{ padding: '4px 10px', borderRadius: '4px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '11px', fontWeight: 600 }}
              >
                Admin (Eman)
              </button>
            </div>
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              style={{ background: 'transparent', color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
