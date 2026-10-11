# Dental Clinic Website --- Product Requirements Document (PRD)

**Project:** Multi-tenant Dental Clinic Website\
**Version:** 1.0\
**Date:** 11 October 2026\
**Prepared for:** iCoded Automation Pvt. Ltd.\
**Status:** Development-ready baseline

------------------------------------------------------------------------

## 1. Product Overview

Build a modern, mobile-first website for a dental clinic that helps
prospective patients understand treatments, trust the clinic, and
contact the clinic or request an appointment. The solution must support
**multiple clinic tenants** from one React application and one Firebase
project, while keeping each clinic's content and enquiries isolated.

This is a public-facing clinic website with a secure, tenant-aware admin
dashboard. It is not a diagnostic or electronic medical-record system.
Do not collect detailed medical histories or sensitive clinical records
in the MVP.

## 2. Goals and Success Criteria

### Business goals

-   Present clinic services, doctors, facilities, opening hours,
    location, and contact details clearly.
-   Turn website visits into phone calls, WhatsApp conversations, and
    appointment requests.
-   Give authorized clinic staff a simple way to update content and
    manage enquiries.
-   Reuse the same application for multiple clinics through tenant
    configuration.

### MVP success criteria

-   Every public page works on mobile, tablet, and desktop.
-   Each tenant's public site displays only that tenant's published
    content.
-   Appointment requests are saved against the correct tenant and
    visible only to authorized staff of that tenant.
-   Forms validate input, show clear success/error states, and resist
    spam.
-   Admin routes require authentication and server-enforced
    authorization.
-   Lighthouse target (initial aim): Performance 85+, Accessibility 90+,
    Best Practices 90+, SEO 90+ on representative pages; targets should
    be measured in production.
-   No secrets or privileged Firebase credentials are included in client
    code.

## 3. Users and Roles

1.  **Visitor / prospective patient**
    -   Browse treatments, doctor profiles, clinic information, FAQs,
        and contact details.
    -   Call the clinic, open WhatsApp, view directions, or request an
        appointment.
2.  **Clinic administrator**
    -   Sign in to manage clinic profile, services, doctors, FAQs,
        opening hours, and appointment requests.
3.  **Clinic staff / receptionist** (optional MVP role)
    -   View and update appointment enquiry status; cannot change tenant
        ownership or security settings.
4.  **Platform super-admin** (restricted)
    -   Provision tenants, assign tenant admins, suspend a tenant, and
        review platform-level operational status.
    -   Must not be exposed as a public self-service registration flow
        in MVP.

## 4. Scope

### In scope --- MVP

-   Tenant-aware public clinic website.
-   Home, About, Treatments/Services, Doctors, FAQs, Contact, Privacy
    Policy, and appointment request flow.
-   Click-to-call, WhatsApp CTA, and directions link.
-   Firebase Authentication for admin users.
-   Firestore data model and tenant isolation.
-   Admin dashboard for basic content and appointment enquiry
    management.
-   Responsive UI, accessibility basics, SEO metadata,
    loading/empty/error states.
-   Basic anti-spam controls and audit fields.
-   Deployment configuration and setup documentation.

### Out of scope --- MVP

-   Patient login or patient portal.
-   Online payments, insurance claims, prescriptions, diagnosis, medical
    records, or treatment plans.
-   Real-time calendar synchronization with external booking providers.
-   Automated medical advice or symptom diagnosis.
-   Multi-language CMS unless explicitly added as a later phase.
-   Public self-registration for clinic tenants.
-   Guaranteed SEO rankings or patient acquisition outcomes.

## 5. Technology Stack

-   **Frontend:** React.js (Vite recommended), React Router.
-   **Styling:** Tailwind CSS.
-   **Backend / data:** Firebase Firestore.
-   **Authentication:** Firebase Authentication.
-   **Server-side privileged operations:** Firebase Cloud Functions or
    another trusted server environment where required.
-   **Hosting:** Firebase Hosting or a compatible static host with SPA
    routing configured.
-   **Optional:** Firebase App Check, reCAPTCHA or equivalent abuse
    prevention, Firebase Analytics only with appropriate
    consent/configuration.
-   **Testing:** Vitest + React Testing Library; Playwright or
    equivalent for key end-to-end flows.

Use the current stable compatible versions at implementation time. Keep
Firebase configuration in environment variables; remember that client
Firebase config is not a secret, but Firestore Security Rules and Auth
are the actual access controls.

## 6. Multi-Tenant Architecture

### Tenant resolution

Choose one deployment strategy for MVP: - **Recommended:** custom domain
or subdomain per clinic, e.g. `clinic-a.example.com`, mapped to a stable
`tenantId`; or - tenant-specific path, e.g. `example.com/clinic-a`, if
domain mapping is not required.

Create an explicit mapping from approved hostname/path slug to
`tenantId`. Do not trust a `tenantId` supplied by a form or query string
without validating it against this mapping. Unknown, inactive, or
unpublished tenants should show a safe not-found/unavailable page.

### Isolation rules

-   Every tenant-owned document must contain a `tenantId`.
-   Every tenant-scoped query must filter by the resolved tenant.
-   Admin authorization must derive the user's tenant membership from
    trusted claims or a protected membership document; do not trust a
    client-side role or tenant ID.
-   Firestore Security Rules must enforce tenant isolation for reads and
    writes. Frontend filtering alone is not security.
-   Platform super-admin privileges must be narrowly scoped and assigned
    only through a trusted administrative process.
-   Public visitors may read only published, explicitly public content.
    They must not read appointment enquiries or internal admin data.
-   Avoid storing sensitive health details in appointment requests. If
    future scope requires health data, perform a privacy/security review
    and design appropriate access controls, retention, and compliance
    procedures before collection.

## 7. Information Architecture and Routes

### Public routes

-   `/` --- Home
-   `/about` --- Clinic overview and approach
-   `/services` --- All treatments
-   `/services/:slug` --- Treatment detail
-   `/doctors` --- Dentist / team list
-   `/doctors/:slug` --- Doctor profile (optional MVP)
-   `/faq` --- Frequently asked questions
-   `/contact` --- Contact, hours, map/directions
-   `/appointment` --- Appointment request
-   `/privacy-policy` --- Privacy notice
-   `*` --- Not found

### Admin routes

-   `/admin/login`
-   `/admin` --- Overview
-   `/admin/appointments`
-   `/admin/services`
-   `/admin/doctors`
-   `/admin/faqs`
-   `/admin/clinic-settings`
-   `/admin/team` --- super-admin/tenant-admin permission dependent

Protect admin routes in the UI for usability, but also enforce
authorization in Firestore Rules and trusted server functions.

## 8. Public Website Requirements

### 8.1 Global header and navigation

-   Clinic logo/name, primary navigation, and prominent "Book an
    Appointment" CTA.
-   Mobile menu with keyboard support and clear focus indicators.
-   Sticky header may be used if it does not obstruct content.
-   Header and footer content must be tenant-configured.

### 8.2 Home page

-   Hero headline, short supporting copy, primary appointment CTA,
    secondary call/WhatsApp CTA.
-   Clinic image or approved visual, without misleading before/after
    imagery.
-   Trust section: verified credentials, years of experience,
    facilities, or patient feedback only where supplied and approved by
    the clinic.
-   Featured treatments.
-   Doctor preview.
-   Clinic benefits / process section.
-   Testimonials only when genuine, authorized, and compliant with
    applicable rules.
-   Opening hours, address, and contact CTA.
-   FAQ preview and complete footer.

### 8.3 About page

-   Clinic introduction, care philosophy, facilities, and verified
    qualifications.
-   Do not invent awards, credentials, experience, patient counts, or
    clinical outcomes.

### 8.4 Services / treatments

Each service supports: - Name, slug, short summary, full description,
optional image/alt text, display order, published state, SEO
title/description. - Suggested categories: General Dentistry, Cleaning &
Scaling, Root Canal Treatment, Dental Fillings, Teeth Whitening,
Braces/Orthodontics, Dental Implants, Crowns & Bridges, Pediatric
Dentistry, Dentures. Only show services offered by the actual clinic. -
Treatment content must be approved by the clinic's qualified clinician.
Do not promise guaranteed results or present the site as a substitute
for professional advice.

### 8.5 Doctors / team

-   Name, role, approved qualification/credentials, bio, languages
    (optional), photo, display order, published state.
-   Credentials must be verified by the clinic before publication.

### 8.6 Appointment request

Fields: - Patient name (required) - Phone number (required; validate
sensible format, do not assume all numbers are Indian) - Email
(optional) - Preferred date (optional) - Preferred time window
(optional) - Requested service (optional; list from published tenant
services) - Short note (optional, max 300 characters; display warning:
"Please do not include sensitive medical details.") - Consent checkbox
(required): permission for the clinic to contact the visitor about this
request, linked to the privacy policy.

Behavior: - Validate on client and trusted backend where used. - Save a
pending enquiry with server timestamp and tenant ID. - Show confirmation
with expected next step; do not claim a confirmed appointment until
staff confirms it. - Provide call/WhatsApp alternatives if the form
fails. - Add rate limiting/abuse prevention, honeypot and/or App
Check/reCAPTCHA as appropriate. - Do not expose appointment data in
public queries or URLs.

### 8.7 Contact page

-   Address, phone, email, opening hours, WhatsApp, and directions link,
    all tenant-specific.
-   Embed a map only when the clinic provides a valid location and
    accepts the third-party embed/privacy implications; otherwise use a
    directions link.
-   Display emergency guidance only if supplied and approved by the
    clinic; do not imply the website is an emergency service.

### 8.8 Footer

-   Clinic name, contact details, quick links, opening hours, privacy
    policy, social links.
-   Include "Website by iCoded Automation Pvt. Ltd." only if agreed in
    the client contract.
-   Never hardcode one clinic's details into shared components.

## 9. Admin Dashboard Requirements

### Authentication

-   Firebase Authentication sign-in for provisioned users.
-   No public admin account creation.
-   Sign out, session-aware route handling, loading state, and friendly
    authentication errors.
-   Disable or remove access promptly when a staff member leaves.

### Dashboard overview

-   Counts of new, contacted, confirmed, completed, and cancelled
    requests, scoped to current tenant.
-   Counts are informational and must use tenant-scoped authorized
    queries.

### Appointment management

-   List requests with pagination; filter by status/date and search by
    name/phone only within tenant.
-   Detail view shows submitted fields and consent timestamp.
-   Status values: `new`, `contacted`, `confirmed`, `completed`,
    `cancelled`, `spam`.
-   Authorized staff can update status and add an internal note that is
    not visible publicly.
-   Record `updatedAt`, `updatedBy`, and status changes where feasible.
-   Do not store clinical notes or diagnoses in this module.

### Content management

-   Create/edit/publish/unpublish services, doctors, and FAQs.
-   Validate required fields and slug uniqueness within the tenant.
-   Preview before publishing where practical.
-   Clinic settings: display name, slug/domain mapping (restricted),
    logo, contact info, address, hours, social links, theme tokens, SEO
    defaults.
-   Changes to tenant ID, membership, domain mapping, or super-admin
    permissions must not be editable by ordinary clinic staff.

### Team and permissions

-   Suggested roles: `tenantAdmin`, `staff`, `platformAdmin`.
-   `tenantAdmin`: manage clinic content and appointment enquiries;
    invite staff only if a trusted invitation flow is implemented.
-   `staff`: view/update appointment status; read-only content by
    default.
-   `platformAdmin`: provision and suspend tenants through a trusted
    server-only workflow.
-   Never let a user grant themselves a role by writing their own
    profile document.

## 10. UI / UX Design Requirements

-   Visual direction: clean, premium, calm, trustworthy dental-care
    brand.
-   Suggested palette: white/off-white backgrounds, deep teal or navy
    primary, restrained aqua accent; confirm against the clinic brand.
-   Typography: readable sans-serif with clear heading hierarchy.
-   Use generous spacing, clear cards, consistent buttons, and visible
    contact CTAs.
-   Mobile-first layout; ensure tap targets are comfortable and no
    horizontal overflow.
-   Provide skeleton/loading states, empty states, form validation,
    success/error alerts, and not-found states.
-   Use semantic HTML, keyboard navigation, visible focus states,
    accessible labels, meaningful alt text, and sufficient color
    contrast.
-   Respect reduced-motion preferences; animations must not delay
    content or obscure controls.
-   Do not use fake testimonials, fabricated review counts, stock photos
    presented as the actual clinic, or unverified "No. 1 / best dentist"
    claims.

## 11. Firestore Data Model

Use collection names consistently. Example schema:

### `tenants/{tenantId}`

``` js
{
  name: "Example Dental Clinic",
  slug: "example-dental",
  status: "active", // active | suspended
  published: true,
  domain: "clinic.example.com", // optional
  branding: {
    logoUrl: "",
    primaryColor: "#0F766E",
    accentColor: "#5EEAD4"
  },
  contact: {
    phone: "",
    email: "",
    whatsapp: "",
    address: "",
    directionsUrl: ""
  },
  openingHours: [
    { day: "Monday", open: "09:00", close: "18:00", closed: false }
  ],
  seo: { title: "", description: "" },
  createdAt: "server timestamp",
  updatedAt: "server timestamp"
}
```

### `tenants/{tenantId}/services/{serviceId}`

``` js
{
  tenantId: "exampleTenant",
  name: "Teeth Cleaning",
  slug: "teeth-cleaning",
  summary: "",
  description: "",
  imageUrl: "",
  imageAlt: "",
  published: true,
  displayOrder: 1,
  seoTitle: "",
  seoDescription: "",
  createdAt: "server timestamp",
  updatedAt: "server timestamp"
}
```

### `tenants/{tenantId}/doctors/{doctorId}`

``` js
{
  tenantId: "exampleTenant",
  name: "",
  role: "Dentist",
  qualifications: [],
  bio: "",
  photoUrl: "",
  photoAlt: "",
  languages: [],
  published: true,
  displayOrder: 1,
  createdAt: "server timestamp",
  updatedAt: "server timestamp"
}
```

### `tenants/{tenantId}/faqs/{faqId}`

``` js
{
  tenantId: "exampleTenant",
  question: "",
  answer: "",
  published: true,
  displayOrder: 1,
  createdAt: "server timestamp",
  updatedAt: "server timestamp"
}
```

### `tenants/{tenantId}/appointments/{appointmentId}`

``` js
{
  tenantId: "exampleTenant",
  patientName: "",
  phone: "",
  email: "",
  preferredDate: null,
  preferredTime: "",
  serviceId: null,
  serviceNameSnapshot: "",
  note: "",
  consent: true,
  consentAt: "server timestamp",
  status: "new",
  internalNote: "", // staff-only
  source: "website",
  createdAt: "server timestamp",
  updatedAt: "server timestamp",
  updatedBy: ""
}
```

### `tenants/{tenantId}/members/{uid}`

``` js
{
  uid: "firebase-auth-uid",
  role: "tenantAdmin", // tenantAdmin | staff
  active: true,
  createdAt: "server timestamp"
}
```

### Optional platform collection: `platformAdmins/{uid}`

Only trusted server-managed accounts should be placed here. Do not allow
clients to create or edit platform-admin membership.

**Data model note:** Use Firestore Timestamp values, not date strings,
for timestamps. The string examples above are placeholders for server
timestamps. For strict isolation, a tenant-scoped subcollection
structure is preferred over a global appointments collection. A tenant
ID field is still useful for auditing and validation.

## 12. Security Rules --- Requirements

Implement and test Firestore Security Rules before launch. At minimum: -
Deny all access by default. - Public read access only for active,
published tenant profile and published public content. - Public clients
cannot read appointments, member lists, internal notes, or
platform-admin data. - Prefer creating appointment requests through a
trusted Cloud Function that validates tenant status, sanitizes fields,
applies abuse controls, and assigns `tenantId`/timestamps server-side.
If direct client writes are used, rules must strictly validate the
schema and tenant path; understand that rules alone do not provide
robust rate limiting. - Tenant staff can access only documents under
their authorized tenant path and only while their membership is
active. - Role checks must use trusted membership/claims and never
client-supplied role values. - Prevent tenant ID, role, `createdAt`, and
ownership fields from being changed by unauthorized users. - Restrict
updateable fields by role; staff should not edit clinic settings or
membership. - Protect uploaded media with storage rules if Firebase
Storage is added. - Never ship service-account keys or Admin SDK
credentials to the browser.

Illustrative rule logic (adapt and test before production; this is not a
complete drop-in ruleset):

``` text
isTenantMember(tenantId) =
  request.auth != null
  && exists(/databases/$(database)/documents/tenants/$(tenantId)/members/$(request.auth.uid))
  && get(/databases/$(database)/documents/tenants/$(tenantId)/members/$(request.auth.uid)).data.active == true

isTenantAdmin(tenantId) =
  isTenantMember(tenantId)
  && get(/databases/$(database)/documents/tenants/$(tenantId)/members/$(request.auth.uid)).data.role == 'tenantAdmin'
```

Create actual Firestore Rules with correct syntax, public-read policy,
field validation, and emulator tests. Do not deploy the illustrative
pseudocode as a rules file.

## 13. Application Structure

Suggested structure:

``` text
src/
  app/
    App.jsx
    router.jsx
  components/
    layout/
      PublicLayout.jsx
      AdminLayout.jsx
      Header.jsx
      Footer.jsx
      MobileNav.jsx
    common/
      Button.jsx
      FormField.jsx
      LoadingState.jsx
      EmptyState.jsx
      ErrorState.jsx
      ConfirmDialog.jsx
  features/
    tenant/
      TenantProvider.jsx
      tenantResolver.js
      tenantService.js
    home/
    services/
    doctors/
    faq/
    contact/
    appointments/
      AppointmentForm.jsx
      appointmentService.js
    admin/
      auth/
      dashboard/
      appointments/
      services/
      doctors/
      faqs/
      settings/
  lib/
    firebase.js
    firestorePaths.js
    validators.js
    dateUtils.js
  hooks/
  styles/
  tests/
```

Keep components reusable and feature modules separated. Avoid placing
all pages, Firebase calls, and form logic in a single file.

## 14. Core Functional Requirements

-   **FR-01 Tenant resolution:** Resolve approved tenant from host/path
    before rendering tenant-specific content.
-   **FR-02 Tenant status:** Block public content for suspended or
    unpublished tenants.
-   **FR-03 Public content:** Fetch and render only published content
    for the resolved tenant.
-   **FR-04 Appointment request:** Validate and submit a request;
    associate it with the resolved tenant server-side.
-   **FR-05 Confirmation:** Show "request received," not "appointment
    confirmed," until clinic staff confirms it.
-   **FR-06 Admin authentication:** Only provisioned users can sign in.
-   **FR-07 Tenant authorization:** Enforce tenant membership on every
    protected data operation.
-   **FR-08 Appointment management:** Authorized staff can
    list/filter/update status for their tenant only.
-   **FR-09 CMS:** Tenant admins can create, edit, publish, and
    unpublish services, doctors, and FAQs.
-   **FR-10 Clinic settings:** Tenant admins can edit permitted
    branding/contact settings.
-   **FR-11 Responsive UI:** All supported pages work at mobile, tablet,
    and desktop widths.
-   **FR-12 SEO:** Unique title/description, canonical URL where
    applicable, Open Graph metadata, sitemap/robots configuration,
    structured data only for verified facts.
-   **FR-13 Accessibility:** Semantic landmarks, keyboard access, form
    labels, focus indicators, useful error messages, and alt text.
-   **FR-14 Observability:** Log actionable errors without logging
    patient contact details or free-text notes.
-   **FR-15 Auditability:** Track creation/update timestamps and the
    staff UID for administrative changes where practical.

## 15. SEO and Performance

-   Use unique page titles and meta descriptions per tenant and page.
-   Use readable URLs and one canonical URL per tenant/page.
-   Provide `robots.txt` and sitemap generation strategy for each
    domain/tenant.
-   Add appropriate `Dentist` / `LocalBusiness` structured data only
    when fields are accurate and visible on the page.
-   Include image alt text and optimize image dimensions/formats.
-   Lazy-load below-the-fold images; do not lazy-load the main hero
    image if that harms LCP.
-   Avoid unnecessary dependencies and oversized animations.
-   If server-rendered HTML is required for robust SEO, consider a
    framework with SSR/prerendering; a pure React SPA can have SEO
    limitations depending on crawlers and deployment setup.

## 16. Privacy and Data Retention

-   Publish a clinic-approved privacy policy identifying the data
    collected, purpose, who can access it, retention, contact details,
    and relevant service providers.
-   Collect only information needed to respond to an appointment
    request.
-   Ask for consent to be contacted and store consent timestamp.
-   Restrict access to appointment enquiries; avoid logging phone
    numbers or notes.
-   Define a retention and deletion policy with the clinic before
    production.
-   Use HTTPS and secure Firebase configuration.
-   Confirm applicable Indian privacy and data-protection obligations
    with the clinic/legal adviser before launch. This PRD is not legal
    advice.
-   Do not send patient data to analytics, ad platforms, or third-party
    tools without an appropriate purpose, disclosure, and consent/legal
    basis.

## 17. Error, Empty, and Edge Cases

-   Tenant slug/domain is unknown, suspended, or unpublished.
-   Clinic has no published services, doctors, or FAQs.
-   Appointment form is submitted with missing/invalid fields.
-   Network is offline or Firestore/function request fails.
-   Duplicate submissions or spam attempts.
-   User session expires while in admin.
-   Staff account is inactive or has wrong-tenant access.
-   A referenced service is unpublished/deleted after a form is opened.
-   Uploaded image URL is broken.
-   Appointment status update fails; preserve the user's input and show
    retry feedback.

## 18. Testing Plan

### Unit/component tests

-   Validators for phone, email, required fields, note length, and date.
-   Tenant resolver for valid/unknown/suspended tenant.
-   Public content components with empty/loading/error states.
-   Appointment form validation and confirmation behavior.
-   Role-based UI visibility.

### Security tests (Firebase Emulator Suite)

-   Unauthenticated users cannot read appointment documents.
-   Tenant A staff cannot read or modify Tenant B data.
-   Staff cannot edit tenant settings or grant roles.
-   Tenant admins cannot access platform-admin privileges.
-   Public users can read only published content for active tenants.
-   Appointment submission cannot assign arbitrary tenant IDs or
    statuses.
-   Suspended tenant access is blocked.

### End-to-end tests

-   Visitor navigates services and submits an appointment request.
-   Request appears only in the correct tenant admin.
-   Staff changes status and the list reflects it.
-   Unauthorized admin route redirects to login/access denied.
-   Mobile navigation and form work on a narrow viewport.

### Manual QA

-   Test Chrome, Safari, Firefox, and Edge where practical.
-   Test keyboard-only navigation and screen-reader labels.
-   Verify all phone, WhatsApp, maps, email, social, and privacy links.
-   Verify clinic owner has approved all copy, credentials, imagery, and
    service claims.

## 19. Acceptance Criteria

The MVP is accepted when: 1. The site renders correct tenant content
using approved tenant resolution. 2. Public pages and admin dashboard
are responsive and usable. 3. Visitors can submit a valid appointment
request and receive an accurate request confirmation. 4. Only authorized
staff for the matching tenant can view/manage that tenant's requests. 5.
Cross-tenant access tests pass in the Firebase Emulator Suite. 6. CMS
changes publish correctly without changing another tenant's content. 7.
No fake clinical claims or unapproved testimonials appear. 8. SEO
metadata, contact links, privacy policy, loading/error states, and basic
accessibility are checked. 9. Production environment variables, hosting
routes, Firestore Rules, and rollback/deployment steps are documented.
10. Clinic representative signs off on content and test results.

## 20. Implementation Phases

### Phase 1 --- Foundation

-   Create React + Vite app, configure Tailwind, router, linting, and
    tests.
-   Configure Firebase project and environments.
-   Implement tenant resolver/provider and shared layouts.
-   Define Firestore schema and initial security rules.

### Phase 2 --- Public website

-   Build Home, About, Services, Doctors, FAQ, Contact, Privacy Policy.
-   Implement responsive navigation and reusable CTA components.
-   Add tenant-based branding, content loading, SEO metadata.

### Phase 3 --- Appointment flow

-   Build form, validation, consent, confirmation/error states.
-   Implement trusted submission endpoint where appropriate.
-   Add spam protection and verify private-by-default appointment data.

### Phase 4 --- Admin dashboard

-   Implement Firebase Auth and protected routes.
-   Build appointment list/detail/status management.
-   Build content CRUD and clinic settings.
-   Add role and tenant isolation checks.

### Phase 5 --- QA and launch

-   Run unit, emulator security, and end-to-end tests.
-   Optimize assets, metadata, accessibility, and performance.
-   Configure domains, HTTPS, environment variables, monitoring,
    backups/export strategy, and deployment documentation.
-   Obtain clinic approval and production sign-off.

## 21. Definition of Done

A feature is done only when: - Requirements and acceptance criteria are
met. - Loading, empty, success, and error states are handled. -
Responsive and keyboard interaction checks pass. - Tenant isolation and
authorization are tested for data-touching features. - No secrets or
sensitive data are exposed in logs/client bundles. - Code is reviewed,
linted, and tested. - Setup and configuration notes are updated.

## 22. Environment Variables and Setup Notes

Example `.env.example`:

``` bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Do not put Firebase Admin SDK credentials in `VITE_` variables or
frontend code. Keep trusted server secrets in the server/Cloud Functions
environment. Configure Firebase Auth authorized domains and hosting
rewrites for SPA routes.

## 23. Open Decisions Before Production

-   Domain model: one subdomain/custom domain per clinic or path-based
    tenants.
-   Whether receptionist/staff role is needed in first release.
-   Whether clinic image uploads require Firebase Storage.
-   Whether appointment requests need email/SMS notifications; choose a
    trusted provider and consent policy.
-   Whether online calendar integration is required in a later phase.
-   Exact retention period and deletion workflow for appointment
    enquiries.
-   Final brand palette, logo, clinic copy, verified dentist
    credentials, service list, address, and hours.
-   Whether SSR/prerendering is needed for SEO requirements.

------------------------------------------------------------------------

## Final Development Instruction

Build the product in small, testable phases. Prioritize tenant isolation
and security rules before exposing any real patient enquiry data. Treat
the appointment form as a **request**, not a confirmed booking. Use
clinic-approved information only; never invent clinical credentials,
testimonials, results, or claims.
