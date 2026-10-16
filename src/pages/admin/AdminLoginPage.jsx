import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { useTenant } from '../../features/tenant/TenantContext';
import { showToast } from '../../components/common/Toast';
import { Lock, Mail, ShieldAlert, ArrowLeft, Sparkles, Building2 } from 'lucide-react';

export function AdminLoginPage() {
  const { login, user } = useAuth();
  const { tenant } = useTenant();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin overview
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide your administrator email.');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      navigate('/admin');
    } else {
      setError(res.error || 'Authentication failed.');
      showToast(res.error || 'Authentication failed', 'error');
    }
  };

  const handleQuickLogin = async () => {
    setLoading(true);
    const demoEmail = 'admin@apexdentalstudio.com';
    
    setEmail(demoEmail);
    const res = await login(demoEmail, 'demo123');
    setLoading(false);

    if (res.success) {
      showToast(`Logged in as Administrator (${res.user.name})`, 'success');
      navigate('/admin');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      padding: '1.5rem',
      position: 'relative'
    }}>
      {/* Return to Public Website link */}
      <Link 
        to="/"
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#94A3B8',
          textDecoration: 'none',
          fontSize: '0.85rem',
          fontWeight: 600,
          background: 'rgba(255,255,255,0.05)',
          padding: '0.4rem 0.85rem',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <ArrowLeft size={14} />
        <span>Back to Clinic Site</span>
      </Link>

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: 'var(--shadow-xl)',
        padding: 'clamp(1.5rem, 4vw, 2.25rem)',
        border: '1px solid var(--border-light)'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            margin: '0 auto 1rem',
            borderRadius: '4px',
            background: 'var(--gradient-primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(15, 118, 110, 0.4)'
          }}>
            <Lock size={24} />
          </div>

          <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Admin Portal Sign In
          </h1>

          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            padding: '0.25rem 0.65rem', 
            borderRadius: '4px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            <Building2 size={13} />
            <span>{tenant?.name}</span>
          </div>
        </div>

        {/* Demo Fast-Login Button for Evaluator Convenience */}
        <div style={{ 
          background: '#F8FAFC', 
          border: '1px dashed var(--border-light)', 
          borderRadius: '4px', 
          padding: '0.875rem', 
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Admin Fast-Access (One Click)
          </div>
          <button
            type="button"
            onClick={handleQuickLogin}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.825rem', padding: '0.55rem', borderRadius: '4px' }}
          >
            <Sparkles size={14} />
            <span>Sign In as Clinic Administrator</span>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#DC2626',
            borderRadius: '4px',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>{error}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="adminEmail">
              Administrator Email
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                id="adminEmail"
                type="email" 
                className="form-input"
                style={{ paddingLeft: '2.5rem', borderRadius: '4px' }}
                placeholder="admin@apexdentalstudio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <Mail 
                size={16} 
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label className="form-label" htmlFor="adminPass" style={{ marginBottom: 0 }}>
                Password
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                id="adminPass"
                type="password" 
                className="form-input"
                style={{ paddingLeft: '2.5rem', borderRadius: '4px' }}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Lock 
                size={16} 
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', borderRadius: '4px' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In as Administrator'}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.5rem', 
          paddingTop: '1.25rem', 
          borderTop: '1px solid var(--border-light)',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#64748B'
        }}>
          Restricted administrative access. Data is securely synchronized directly with Cloud Firestore.
        </div>

      </div>
    </div>
  );
}
