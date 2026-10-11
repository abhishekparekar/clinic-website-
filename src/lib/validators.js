// Patient Form & Admin Validation Utilities
// Adheres to PRD Section 8.6 (Appointment request fields & anti-abuse)

/**
 * Validates international / national phone numbers sensibly.
 * Allows +, spaces, dashes, parentheses and 7 to 15 digits.
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  // Matches phone numbers with optional + and between 8 and 15 digits
  const phoneRegex = /^\+?[0-9]{8,15}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Validates standard email addresses.
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates required text fields.
 */
export function validateRequired(val) {
  if (val === undefined || val === null) return false;
  if (typeof val === 'string') return val.trim().length > 0;
  return true;
}

/**
 * Validates appointment notes (max 300 characters as per PRD Section 8.6).
 */
export function validateNoteLength(note, maxLength = 300) {
  if (!note) return true;
  return note.length <= maxLength;
}

/**
 * Checks for sensitive clinical terms to alert user per PRD Section 8.6:
 * "Please do not include sensitive medical details"
 */
export function containsSensitiveMedicalKeywords(text) {
  if (!text) return false;
  const sensitiveList = [
    'cancer', 'biopsy', 'hiv', 'hepatitis', 'pregnancy', 
    'psychiatric', 'chemo', 'radiation', 'surgery report'
  ];
  const lower = text.toLowerCase();
  return sensitiveList.some(keyword => lower.includes(keyword));
}
