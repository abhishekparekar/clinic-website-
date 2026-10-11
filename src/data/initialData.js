// Multi-Tenant Dental Clinic Seed Data
// Conforms directly to PRD Data Model (Section 11)

export const INITIAL_TENANTS = {
  'apex-dental': {
    id: 'apex-dental',
    name: 'Apex Dental & Implant Studio',
    slug: 'apex-dental',
    tagline: 'Precision Care. Painless Dentistry. Radiant Smiles.',
    status: 'active',
    published: true,
    domain: 'apex-dental.clinic.local',
    branding: {
      primaryColor: '#0F766E', // Deep Medical Teal
      accentColor: '#06B6D4',  // Ocean Cyan
      logoText: 'Apex Dental',
      badgeText: 'NABH Accredited & ISO 9001 Certified'
    },
    contact: {
      phone: '+91 98201 23456',
      phoneRaw: '+919820123456',
      email: 'care@apexdentalstudio.com',
      whatsapp: '+919820123456',
      whatsappDisplay: '+91 98201 23456',
      address: 'Suite 302, Linking Road, Bandra West, Mumbai, Maharashtra 400050',
      directionsUrl: 'https://maps.google.com/?q=Linking+Road+Bandra+West+Mumbai',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.441113271424!2d72.8318!3d19.0560!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzIxLjYiTiA3MsKwNDknNTQuNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
      emergencyNotice: 'For urgent dental trauma or acute tooth pain during non-clinic hours, call our 24/7 on-call triage line at +91 98201 23456.'
    },
    openingHours: [
      { day: 'Monday', open: '09:00', close: '20:00', closed: false },
      { day: 'Tuesday', open: '09:00', close: '20:00', closed: false },
      { day: 'Wednesday', open: '09:00', close: '20:00', closed: false },
      { day: 'Thursday', open: '09:00', close: '20:00', closed: false },
      { day: 'Friday', open: '09:00', close: '20:00', closed: false },
      { day: 'Saturday', open: '09:00', close: '19:00', closed: false },
      { day: 'Sunday', open: '10:00', close: '14:00', closed: false }
    ],
    stats: [
      { label: 'Years of Clinical Practice', value: '16+' },
      { label: 'Restorative & Implant Smiles', value: '12,500+' },
      { label: 'Specialist Clinicians', value: '4 Senior MDS' },
      { label: 'Sterilization Level', value: 'Class-B Autoclave' }
    ],
    seo: {
      title: 'Apex Dental & Implant Studio | Painless Dentistry & Implants in Bandra, Mumbai',
      description: 'Expert dental care in Bandra West featuring 3D CBCT digital diagnostics, computer-guided dental implants, painless laser dentistry, and clear aligners.'
    }
  },

  'lumina-smiles': {
    id: 'lumina-smiles',
    name: 'Lumina Cosmetic & Family Dental',
    slug: 'lumina-smiles',
    tagline: 'Artistry in Cosmetic Dentistry & Gentle Family Care',
    status: 'active',
    published: true,
    domain: 'lumina.clinic.local',
    branding: {
      primaryColor: '#1E40AF', // Royal Sapphire
      accentColor: '#38BDF8',  // Sky Cyan
      logoText: 'Lumina Smiles',
      badgeText: 'Advanced Digital Aesthetics Center'
    },
    contact: {
      phone: '+91 80 4123 7890',
      phoneRaw: '+918041237890',
      email: 'hello@luminasmiles.com',
      whatsapp: '+918041237890',
      whatsappDisplay: '+91 80 4123 7890',
      address: '45, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
      directionsUrl: 'https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.00!2d77.64!3d12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE2LjgiTiA3N8KwMzgnMjQuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
      emergencyNotice: 'Same-day urgent emergency appointments available during regular working hours.'
    },
    openingHours: [
      { day: 'Monday', open: '08:30', close: '19:30', closed: false },
      { day: 'Tuesday', open: '08:30', close: '19:30', closed: false },
      { day: 'Wednesday', open: '08:30', close: '19:30', closed: false },
      { day: 'Thursday', open: '08:30', close: '19:30', closed: false },
      { day: 'Friday', open: '08:30', close: '19:30', closed: false },
      { day: 'Saturday', open: '09:00', close: '17:00', closed: false },
      { day: 'Sunday', open: 'Closed', close: '', closed: true }
    ],
    stats: [
      { label: 'Years of Excellence', value: '11+' },
      { label: 'Smiles Transformed', value: '8,400+' },
      { label: 'Cosmetic Specialists', value: '3 Clinicians' },
      { label: 'Digital Smile Design', value: '100% 3D Guided' }
    ],
    seo: {
      title: 'Lumina Cosmetic Dental | Smile Design & Porcelain Veneers in Indiranagar',
      description: 'Cosmetic dentistry, digital smile design, porcelain veneers, and gentle general dentistry in Indiranagar, Bengaluru.'
    }
  },

  'pearl-care': {
    id: 'pearl-care',
    name: 'Pearl Care Pediatric & Orthodontics',
    slug: 'pearl-care',
    tagline: 'Gentle, Happy Dental Experiences for Kids & Adults',
    status: 'active',
    published: true,
    domain: 'pearlcare.clinic.local',
    branding: {
      primaryColor: '#047857', // Emerald
      accentColor: '#10B981',  // Mint
      logoText: 'Pearl Care Dental',
      badgeText: 'Child-Friendly Sensory Dental Care'
    },
    contact: {
      phone: '+91 40 2355 6789',
      phoneRaw: '+914023556789',
      email: 'support@pearlcaredental.in',
      whatsapp: '+914023556789',
      whatsappDisplay: '+91 40 2355 6789',
      address: 'Road No. 36, Beside Metro Pillar 1400, Jubilee Hills, Hyderabad, Telangana 500033',
      directionsUrl: 'https://maps.google.com/?q=Road+No+36+Jubilee+Hills+Hyderabad',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.00!2d78.40!3d17.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzQ4LjAiTiA3OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
      emergencyNotice: 'Pediatric dental emergencies (knocked out tooth, sports injury): Call immediately.'
    },
    openingHours: [
      { day: 'Monday', open: '09:30', close: '18:30', closed: false },
      { day: 'Tuesday', open: '09:30', close: '18:30', closed: false },
      { day: 'Wednesday', open: '09:30', close: '18:30', closed: false },
      { day: 'Thursday', open: '09:30', close: '18:30', closed: false },
      { day: 'Friday', open: '09:30', close: '18:30', closed: false },
      { day: 'Saturday', open: '09:30', close: '17:00', closed: false },
      { day: 'Sunday', open: 'Closed', close: '', closed: true }
    ],
    stats: [
      { label: 'Happy Young Patients', value: '9,200+' },
      { label: 'Orthodontic Cases', value: '3,800+' },
      { label: 'Pediatric Dentists', value: '4 Specialists' },
      { label: 'Sensory Comfort Rooms', value: 'Dedicated Play Wing' }
    ],
    seo: {
      title: 'Pearl Care Dental | Pediatric & Braces Specialists in Jubilee Hills',
      description: 'Compassionate pediatric dentistry and modern orthodontic solutions in Jubilee Hills, Hyderabad.'
    }
  }
};

export const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    tenantId: 'apex-dental',
    name: 'Computer-Guided Dental Implants',
    slug: 'dental-implants',
    category: 'Implantology',
    summary: 'Permanent, lifelike tooth replacement using Swiss precision titanium/zirconia implants and 3D CBCT surgical guides.',
    description: 'Our dental implants restore the full strength, chewing capability, and natural aesthetics of real teeth. Using state-of-the-art 3D Cone Beam Computed Tomography (CBCT) scanners, our prosthodontists map your bone density with sub-millimeter precision before placing the implant, ensuring minimal invasiveness and rapid healing.',
    duration: '45 - 60 mins per session',
    priceEstimate: 'Personalized plan upon clinical scan',
    benefits: [
      'Natural appearance and full bite force restoration',
      'Preserves jawbone density and facial structure',
      'No trimming or damage to adjacent healthy teeth',
      'Lifetime warranty on Nobel Biocare & Straumann implants'
    ],
    procedureSteps: [
      { step: 1, title: '3D CBCT Scan & Digital Planning', desc: 'Precise 3D bone mapping and virtual implant positioning.' },
      { step: 2, title: 'Guided Flapless Placement', desc: 'Keyhole surgical guide insertion under local numbing.' },
      { step: 3, title: 'Osseointegration Period', desc: 'Implant fuses securely with jawbone over 8 to 12 weeks.' },
      { step: 4, title: 'Custom Zirconia Crown Placement', desc: 'Precision-shaded ceramic tooth permanently secured.' }
    ],
    published: true,
    displayOrder: 1,
    seoTitle: 'Dental Implants in Bandra | Painless Guided Surgery | Apex Dental',
    seoDescription: 'Restore your smile permanently with computer-guided dental implants at Apex Dental Studio Mumbai.'
  },
  {
    id: 'srv-2',
    tenantId: 'apex-dental',
    name: 'Microscopic Root Canal (RCT)',
    slug: 'root-canal-treatment',
    category: 'Endodontics',
    summary: 'Single-sitting or two-sitting painless root canal treatment performed under high-magnification dental operating microscopes.',
    description: 'Save your natural infected tooth comfortably. High-powered optical microscopes allow our endodontists to visualize intricate canal anatomy that standard naked-eye treatments often miss. Paired with electronic apex locators and warm vertical obturation, therapy is swift and completely painless.',
    duration: '45 - 75 mins',
    priceEstimate: 'Consultation & X-Ray evaluated',
    benefits: [
      'Painless procedure with computer-assisted local anesthesia',
      'Single-visit completion in over 85% of cases',
      'Eliminates throbbing toothaches and infection at the root',
      'Preserves your natural tooth for decades'
    ],
    procedureSteps: [
      { step: 1, title: 'Digital Apex Diagnosis', desc: 'High-res digital sensor imaging to locate infection depth.' },
      { step: 2, title: 'Gentle Debridement', desc: 'Microscopic cleaning and disinfection of root canals.' },
      { step: 3, title: 'Bio-Ceramic Sealing', desc: '3D hermetic sealing to prevent recurrent bacterial entry.' },
      { step: 4, title: 'Strengthening Crown', desc: 'CAD/CAM zirconia or ceramic crown to restore bite strength.' }
    ],
    published: true,
    displayOrder: 2,
    seoTitle: 'Microscopic Root Canal Treatment in Bandra | Apex Dental Studio',
    seoDescription: 'Painless microscopic root canal therapy in Bandra West Mumbai with single-visit precision.'
  },
  {
    id: 'srv-3',
    tenantId: 'apex-dental',
    name: 'Clear Aligners & Invisible Braces',
    slug: 'clear-aligners',
    category: 'Orthodontics',
    summary: 'Discreet, removable clear aligners to straighten teeth, close gaps, and correct bite alignment without metal brackets.',
    description: 'Transform your smile discreetly without unsightly metal brackets or dietary restrictions. Utilizing 3D intraoral digital scanners (no messy impression trays), we design your full smile movement simulation in 3D before you even start treatment.',
    duration: '6 - 14 months typical treatment',
    priceEstimate: 'All-inclusive digital package options',
    benefits: [
      'Nearly invisible ultra-clear medical-grade polymer',
      'Removable for meals, brushing, and special occasions',
      'No painful wire adjustments or emergency bracket breaks',
      'Preview your finished smile transformation before starting'
    ],
    procedureSteps: [
      { step: 1, title: 'Intraoral 3D Scanning', desc: 'Comfortable optical scan captures millions of 3D data points.' },
      { step: 2, title: 'ClinCheck 3D Simulation', desc: 'Review your step-by-step tooth movements with your orthodontist.' },
      { step: 3, title: 'Custom Tray Delivery', desc: 'Receive aligner sets to wear 20-22 hours daily.' },
      { step: 4, title: 'Smile Reveal & Retainers', desc: 'Final polish and custom retainers to maintain perfection.' }
    ],
    published: true,
    displayOrder: 3,
    seoTitle: 'Clear Aligners & Invisible Braces Bandra | Apex Dental',
    seoDescription: 'Straighten your teeth comfortably with invisible aligners at Apex Dental Studio.'
  },
  {
    id: 'srv-4',
    tenantId: 'apex-dental',
    name: 'Laser Teeth Whitening (Zoom 4)',
    slug: 'teeth-whitening',
    category: 'Cosmetic',
    summary: 'Clinically proven in-office LED light-accelerated whitening that brightens teeth up to 8 shades in just 45 minutes.',
    description: 'Erase years of coffee, tea, wine, and age-related discoloration with Philips Zoom 4 in-chair whitening. Formulated with ACP (Amorphous Calcium Phosphate) technology to protect enamel and minimize temporary sensitivity.',
    duration: '45 mins',
    priceEstimate: 'Includes take-home touch-up kit',
    benefits: [
      'Up to 8 shades brighter in a single 45-minute appointment',
      'Enamel-safe formulation with desensitizing agents',
      'Supervised by certified dental professionals',
      'Includes complimentary maintenance guidelines'
    ],
    procedureSteps: [
      { step: 1, title: 'Shade Matching & Polish', desc: 'Baseline shade measurement and gentle surface cleaning.' },
      { step: 2, title: 'Gingival Barrier Application', desc: 'Protective isolation of gums and soft tissues.' },
      { step: 3, title: '3x15 Min Light Activation', desc: 'Hydrogen peroxide gel activated with specialized LED light.' },
      { step: 4, title: 'Post-Care Fluoride Shield', desc: 'Enamel nourishment and final shade reveal.' }
    ],
    published: true,
    displayOrder: 4,
    seoTitle: 'Philips Zoom Teeth Whitening Bandra | Apex Dental Studio',
    seoDescription: 'Get a noticeably whiter smile in 45 minutes with safe, professional laser teeth whitening.'
  },
  {
    id: 'srv-5',
    tenantId: 'apex-dental',
    name: 'Porcelain Veneers & Smile Makeovers',
    slug: 'porcelain-veneers',
    category: 'Cosmetic',
    summary: 'Ultra-thin custom ceramic facings bonded to front teeth to fix chips, stains, slight gaps, and irregular tooth shapes.',
    description: 'Custom-crafted by master dental ceramists, porcelain veneers mimic the natural translucency and luster of youthful tooth enamel. We perform digital aesthetic mockups so you can test-drive your new smile before the final restoration is permanently bonded.',
    duration: '2 - 3 visits',
    priceEstimate: 'Per tooth restoration pricing',
    benefits: [
      'Resistant to future staining from coffee, tea, and turmeric',
      'Ultra-conservative micro-preparation preserves natural tooth',
      'Flawlessly covers deep intrinsic stains and enamel fractures',
      'Durable, biocompatible material lasting 15+ years'
    ],
    procedureSteps: [
      { step: 1, title: 'Aesthetic Consultation', desc: 'Facial harmony assessment and digital smile photography.' },
      { step: 2, title: 'Trial Smile Mockup', desc: 'Direct trial on your teeth so you see the real look and feel.' },
      { step: 3, title: 'Micro-Preparation & Scans', desc: 'Minimal surface contouring and high-precision digital scanning.' },
      { step: 4, title: 'Final Bonding', desc: 'Permanent adhesive resin bonding and bite calibration.' }
    ],
    published: true,
    displayOrder: 5,
    seoTitle: 'Porcelain Veneers & Smile Makeovers | Apex Dental Studio',
    seoDescription: 'Custom hand-crafted porcelain veneers and complete smile makeovers in Bandra Mumbai.'
  },
  {
    id: 'srv-6',
    tenantId: 'apex-dental',
    name: 'Ultrasonic Scaling & Air-Flow Polishing',
    slug: 'scaling-cleaning',
    category: 'Preventative',
    summary: 'Thorough, gentle removal of plaque, tartar (calculus), and external stains to protect your gums from periodontitis.',
    description: 'Regular professional prophylaxis is the cornerstone of lifelong oral health. Using Swiss EMS Piezon ultrasonic technology paired with warm-water Air-Flow polishing, we gently remove biofilm without scratching enamel or irritating sensitive gums.',
    duration: '30 - 40 mins',
    priceEstimate: 'Standard wellness tariff',
    benefits: [
      'Prevents bleeding gums, gingivitis, and bone loss',
      'Removes stubborn tobacco, tea, and coffee stains',
      'Freshens breath and polishes enamel surfaces smooth',
      'Recommended every 6 months for optimal oral wellness'
    ],
    procedureSteps: [
      { step: 1, title: 'Periodontal Examination', desc: 'Gum health check and plaque index evaluation.' },
      { step: 2, title: 'Ultrasonic Calculus Removal', desc: 'Vibrating water-cooled tip detaches calcified tartar.' },
      { step: 3, title: 'Air-Flow Biofilm Polish', desc: 'Gentle glycine powder spray polishes deep crevices.' },
      { step: 4, title: 'Interdental Flossing & Advice', desc: 'Customized brushing and flossing technique guidance.' }
    ],
    published: true,
    displayOrder: 6,
    seoTitle: 'Dental Cleaning & Ultrasonic Scaling Bandra | Apex Dental',
    seoDescription: 'Gentle ultrasonic teeth cleaning and airflow polishing at Apex Dental Studio Mumbai.'
  }
];

export const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    tenantId: 'apex-dental',
    name: 'Dr. Sameer Merchant',
    role: 'Chief Prosthodontist & Implantologist',
    qualifications: ['MDS (Prosthodontics & Crown-Bridge)', 'BDS', 'Fellow, International Congress of Oral Implantologists (ICOI)'],
    bio: 'Dr. Sameer brings over 16 years of specialized clinical experience in full-mouth rehabilitation, computer-guided dental implants, and complex smile reconstructions. A former university faculty member, he advocates for minimally invasive, evidence-based restorative dentistry.',
    experienceYears: 16,
    languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    scheduleDays: 'Mon, Tue, Wed, Fri, Sat (10:00 AM - 6:30 PM)',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    published: true,
    displayOrder: 1
  },
  {
    id: 'doc-3',
    tenantId: 'apex-dental',
    name: 'Dr. Rohan Kapoor',
    role: 'Consultant Orthodontist & Dentofacial Orthopedist',
    qualifications: ['MDS (Orthodontics)', 'BDS', 'Certified Invisalign & Clear Aligner Specialist'],
    bio: 'Specializing in digital aligner therapy and interceptive orthodontics for both teens and adults, Dr. Rohan focuses on facial balance, airway health, and perfectly aligned dental arches without unnecessary extractions.',
    experienceYears: 9,
    languages: ['English', 'Hindi', 'Punjabi'],
    scheduleDays: 'Tue, Thu, Sat (11:00 AM - 7:30 PM)',
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    published: true,
    displayOrder: 2
  },
  {
    id: 'doc-4',
    tenantId: 'apex-dental',
    name: 'Dr. Neha Deshmukh',
    role: 'Pediatric Dental Specialist & Preventative Care',
    qualifications: ['BDS', 'Fellowship in Pediatric Dentistry', 'Laser Safety Officer Certified'],
    bio: 'Dr. Neha is dedicated to building joyful, fear-free dental habits in infants, toddlers, and young teens. She specializes in preventive fluoride therapies, dental sealants, painless cavity restorations, and habit-breaking appliances.',
    experienceYears: 8,
    languages: ['English', 'Hindi', 'Marathi'],
    scheduleDays: 'Mon, Tue, Thu, Sat (09:30 AM - 4:00 PM)',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    published: true,
    displayOrder: 3
  }
];

export const INITIAL_FAQS = [
  {
    id: 'faq-1',
    tenantId: 'apex-dental',
    category: 'General',
    question: 'Are dental treatments at Apex Dental really painless?',
    answer: 'Yes. We utilize computer-controlled local anesthesia delivery systems, ultra-fine micro-needles, and topical numbing gels that eliminate the sting of traditional injections. For surgical procedures, laser technology promotes minimal bleeding and accelerated tissue recovery with minimal post-operative soreness.',
    published: true,
    displayOrder: 1
  },
  {
    id: 'faq-2',
    tenantId: 'apex-dental',
    category: 'Appointments',
    question: 'How does the online appointment request work?',
    answer: 'When you submit the request form on our website, our patient coordinator receives your preferred date and time immediately. We review our clinical roster and call or WhatsApp you within 15–30 minutes to confirm your exact consultation slot and provide pre-visit directions. Please note online submissions are requests until our coordinator confirms availability.',
    published: true,
    displayOrder: 2
  },
  {
    id: 'faq-3',
    tenantId: 'apex-dental',
    category: 'Implants',
    question: 'Am I a candidate for dental implants?',
    answer: 'Most adults in good general health with missing teeth or loose dentures are eligible. During your initial consultation, we take an in-house 3D CBCT scan to evaluate your jawbone depth, density, and nerve positions. Even if bone volume is reduced, modern bone grafting and sinus elevation techniques can often make implants feasible.',
    published: true,
    displayOrder: 3
  },
  {
    id: 'faq-4',
    tenantId: 'apex-dental',
    category: 'Hygiene & Safety',
    question: 'What sterilization protocols do you follow?',
    answer: 'We adhere to hospital-grade sterilization protocols. Every non-disposable instrument undergoes a 6-stage decontamination process: ultrasonic enzymatic bath, manual scrubbing, pouch sealing, and Class-B vacuum autoclave sterilization at 134°C with physical biological spore indicators. Instrument packets are unsealed strictly in front of you.',
    published: true,
    displayOrder: 4
  },
  {
    id: 'faq-5',
    tenantId: 'apex-dental',
    category: 'Orthodontics',
    question: 'How do clear aligners compare to conventional braces?',
    answer: 'Clear aligners are custom-molded from transparent, medical-grade polyurethane. Unlike metal braces, they are virtually invisible, can be removed while eating and brushing, and do not cause painful cheek abrasions from metal wires. Treatment duration is comparable to or faster than metal braces for most mild-to-moderate alignment issues.',
    published: true,
    displayOrder: 5
  },
  {
    id: 'faq-6',
    tenantId: 'apex-dental',
    category: 'Insurance & Payment',
    question: 'Do you offer dental insurance coverage and EMI options?',
    answer: 'We provide detailed clinical invoices, treatment summaries, and diagnostic radiograph attachments for reimbursement with all major health insurance providers. In addition, we partner with reputable medical financial providers to offer 0% interest EMI payment plans for extensive procedures like implants and smile design.',
    published: true,
    displayOrder: 6
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-101',
    tenantId: 'apex-dental',
    patientName: 'Priya Sharma',
    phone: '+91 98200 11223',
    email: 'priya.sharma@example.com',
    preferredDate: '2026-10-14',
    preferredTime: 'Morning (09:00 - 12:00)',
    serviceId: 'srv-1',
    serviceNameSnapshot: 'Computer-Guided Dental Implants',
    note: 'Looking for tooth replacement consultation on lower right molar.',
    consent: true,
    consentAt: '2026-10-10T09:15:00.000Z',
    status: 'new',
    internalNote: 'First-time patient. Requires preliminary CBCT scan booking.',
    source: 'website',
    createdAt: '2026-10-10T09:15:00.000Z',
    updatedAt: '2026-10-10T09:15:00.000Z',
    updatedBy: 'system'
  },
  {
    id: 'apt-102',
    tenantId: 'apex-dental',
    patientName: 'Vikramaditya Roy',
    phone: '+91 98199 44556',
    email: 'vikram.roy@example.com',
    preferredDate: '2026-10-12',
    preferredTime: 'Afternoon (12:00 - 16:00)',
    serviceId: 'srv-4',
    serviceNameSnapshot: 'Laser Teeth Whitening (Zoom 4)',
    note: 'Wedding coming up next weekend, need brightening session.',
    consent: true,
    consentAt: '2026-10-09T14:30:00.000Z',
    status: 'contacted',
    internalNote: 'Spoke with patient on phone. Sent pre-whitening food instructions via WhatsApp.',
    source: 'website',
    createdAt: '2026-10-09T14:30:00.000Z',
    updatedAt: '2026-10-09T16:00:00.000Z',
    updatedBy: 'reception_staff'
  },
  {
    id: 'apt-103',
    tenantId: 'apex-dental',
    patientName: 'Sunita Mehra',
    phone: '+91 98212 99887',
    email: 'sunita.m@example.com',
    preferredDate: '2026-10-11',
    preferredTime: 'Evening (16:00 - 20:00)',
    serviceId: 'srv-2',
    serviceNameSnapshot: 'Microscopic Root Canal (RCT)',
    note: 'Sensitivity to cold and mild pain when chewing on upper left premolar.',
    consent: true,
    consentAt: '2026-10-08T11:20:00.000Z',
    status: 'confirmed',
    internalNote: 'Confirmed slot with Dr. Sameer Merchant for 5:30 PM.',
    source: 'website',
    createdAt: '2026-10-08T11:20:00.000Z',
    updatedAt: '2026-10-08T12:05:00.000Z',
    updatedBy: 'admin_user'
  },
  {
    id: 'apt-104',
    tenantId: 'apex-dental',
    patientName: 'Arjun Nambiar',
    phone: '+91 97690 33441',
    email: 'arjun.n@example.com',
    preferredDate: '2026-10-07',
    preferredTime: 'Morning (09:00 - 12:00)',
    serviceId: 'srv-6',
    serviceNameSnapshot: 'Ultrasonic Scaling & Air-Flow Polishing',
    note: 'Routine 6-month cleaning checkup.',
    consent: true,
    consentAt: '2026-10-05T10:00:00.000Z',
    status: 'completed',
    internalNote: 'Completed prophylaxis and fluoride polish. Recalled in 6 months.',
    source: 'website',
    createdAt: '2026-10-05T10:00:00.000Z',
    updatedAt: '2026-10-07T11:30:00.000Z',
    updatedBy: 'admin_user'
  },
  {
    id: 'apt-105',
    tenantId: 'apex-dental',
    patientName: 'Kunal Singhania',
    phone: '+91 98920 77665',
    email: 'kunal.s@example.com',
    preferredDate: '2026-10-06',
    preferredTime: 'Afternoon (12:00 - 16:00)',
    serviceId: 'srv-3',
    serviceNameSnapshot: 'Clear Aligners & Invisible Braces',
    note: '',
    consent: true,
    consentAt: '2026-10-04T15:00:00.000Z',
    status: 'cancelled',
    internalNote: 'Patient had out-of-town travel. Requested follow-up call next month.',
    source: 'website',
    createdAt: '2026-10-04T15:00:00.000Z',
    updatedAt: '2026-10-05T09:45:00.000Z',
    updatedBy: 'reception_staff'
  }
];

export const INITIAL_MEMBERS = [
  {
    uid: 'user-admin-1',
    tenantId: 'apex-dental',
    email: 'admin@apexdentalstudio.com',
    name: 'Dr. Sameer Merchant',
    role: 'tenantAdmin',
    active: true,
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    uid: 'user-staff-1',
    tenantId: 'apex-dental',
    email: 'reception@apexdentalstudio.com',
    name: 'Pooja Varma (Front Desk Coordinator)',
    role: 'staff',
    active: true,
    createdAt: '2026-02-15T00:00:00.000Z'
  }
];
