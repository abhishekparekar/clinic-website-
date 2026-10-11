import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { dentalStore } from '../../lib/store';
import { 
  Stethoscope, 
  Search, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';

export function ServicesPage() {
  const { tenant } = useTenant();
  const services = dentalStore.getServices(tenant.id, true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = useMemo(() => {
    const cats = ['All'];
    services.forEach(s => {
      if (s.category && !cats.includes(s.category)) {
        cats.push(s.category);
      }
    });
    return cats;
  }, [services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Page Header */}
      <section style={{ 
        background: 'var(--gradient-hero)', 
        padding: '4.5rem 0', 
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag">
            <Stethoscope size={14} /> Clinical Treatments & Services
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1.25rem' }}>
            Comprehensive Dental Care <br />
            <span className="text-gradient">For Every Age & Need</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Explore our spectrum of preventive, restorative, cosmetic, and surgical treatments delivered by specialized clinicians at {tenant?.name}.
          </p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section style={{ background: '#FFFFFF', padding: '2rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-surface-subtle)',
                    color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-muted)',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border-light)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input 
                type="text"
                placeholder="Search treatments or concerns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem', paddingRight: '1rem' }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          {filteredServices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                No treatments match your search or filter criteria.
              </p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem'
            }}>
              {filteredServices.map(service => (
                <div 
                  key={service.id}
                  className="glass-card"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--primary)',
                      background: 'var(--primary-light)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px'
                    }}>
                      {service.category}
                    </span>

                    <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={13} /> {service.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.85rem', color: 'var(--text-main)' }}>
                    <Link to={`/services/${service.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {service.name}
                    </Link>
                  </h3>

                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem', flex: 1 }}>
                    {service.summary}
                  </p>

                  {/* Highlights checklist */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.75rem' }}>
                      {service.benefits.slice(0, 3).map((benefit, bIdx) => (
                        <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                          <CheckCircle2 size={15} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    paddingTop: '1.5rem', 
                    borderTop: '1px solid var(--border-light)' 
                  }}>
                    <Link 
                      to={`/services/${service.slug}`}
                      style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 700, 
                        color: 'var(--primary)', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.35rem',
                        textDecoration: 'none'
                      }}
                    >
                      <span>Procedure Details</span>
                      <ArrowRight size={15} />
                    </Link>

                    <Link 
                      to={`/appointment?service=${service.slug}`}
                      className="btn btn-primary btn-sm"
                    >
                      <Calendar size={14} />
                      <span>Book Slot</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
