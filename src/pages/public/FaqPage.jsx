import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTenant } from '../../features/tenant/TenantContext';
import { useAppointmentModal } from '../../features/appointment/AppointmentModalContext';
import { dentalStore } from '../../lib/store';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MessageSquare, 
  Phone, 
  Calendar 
} from 'lucide-react';

export function FaqPage() {
  const { tenant } = useTenant();
  const { openAppointmentModal } = useAppointmentModal();
  const faqs = dentalStore.getFaqs(tenant.id, true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  // Extract categories
  const categories = useMemo(() => {
    const cats = ['All'];
    faqs.forEach(f => {
      if (f.category && !cats.includes(f.category)) {
        cats.push(f.category);
      }
    });
    return cats;
  }, [faqs]);

  // Filter faqs
  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      const matchCat = selectedCategory === 'All' || f.category === selectedCategory;
      const matchSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-animate" style={{ 
        background: 'var(--gradient-hero)', 
        padding: '4.5rem 0', 
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag" style={{ borderRadius: '4px' }}>
            <HelpCircle size={14} /> Clear Answers & Transparency
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1.25rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Find answers to common questions regarding dental procedures, pain management, sterilization safety, and payment options at {tenant?.name}.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <section style={{ background: '#FFFFFF', padding: '1.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
            
            {/* Category Pills */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
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
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input 
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem', borderRadius: '4px' }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                No questions found matching your criteria.
              </p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="btn btn-secondary"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredFaqs.map(faq => {
                const isOpen = openId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    style={{
                      borderRadius: 'var(--radius-md)',
                      background: isOpen ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
                      border: '1.5px solid',
                      borderColor: isOpen ? 'var(--primary)' : 'var(--border-light)',
                      boxShadow: isOpen ? 'var(--shadow-md)' : 'none',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      onClick={() => toggle(faq.id)}
                      style={{
                        width: '100%',
                        padding: '1.35rem 1.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        size={20} 
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.25s ease',
                          color: 'var(--text-subtle)',
                          flexShrink: 0,
                          marginLeft: '1rem'
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 1.75rem 1.75rem 1.75rem', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Ask our care coordinator fallback */}
          <div style={{ 
            marginTop: '4rem', 
            background: 'var(--gradient-card)', 
            borderRadius: '4px', 
            padding: '2.5rem', 
            textAlign: 'center',
            border: '1px solid var(--border-light)'
          }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Have a Specific Question About Your Case?
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem', maxWidth: '520px', margin: '0 auto 1.75rem auto' }}>
              Our patient care coordinator is available to answer questions regarding custom treatment timelines, insurance coverage, and pre-visit guidelines.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <a 
                href={`https://wa.me/${tenant?.contact?.whatsapp?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(tenant?.name)}%2C%20I%20have%20a%20question%20regarding%20dental%20care.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={16} />
                <span>Ask on WhatsApp</span>
              </a>

              <button 
                onClick={() => openAppointmentModal()}
                className="btn btn-primary"
              >
                <Calendar size={16} />
                <span>Request Appointment Slot</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
