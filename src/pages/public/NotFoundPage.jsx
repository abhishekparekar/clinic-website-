import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div style={{ padding: '6rem 1.5rem', textAlign: 'center', background: 'var(--bg-page)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ fontSize: '5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          The requested page or treatment details could not be found or has moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} />
          <span>Return to Clinic Home</span>
        </Link>
      </div>
    </div>
  );
}
