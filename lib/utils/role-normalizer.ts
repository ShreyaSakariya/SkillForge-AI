/**
 * Smart Role Title Normalizer for SkillForge AI.
 * Strips conversational lead-ins (e.g. "I wanna become a...", "I want to be...", "My goal is to work as a...")
 * to isolate clean, professional role names like "Security Analyst".
 */
export function cleanRoleTitle(rawGoal: string): string {
  if (!rawGoal || !rawGoal.trim()) return 'Software Engineer';

  let cleaned = rawGoal.trim();

  // Strip common conversational prefix patterns
  const prefixPatterns = [
    /^(i\s+(wanna|want|would\s+like|am\s+aiming|hope)\s+to\s+(become|be|work\s+as|get\s+a\s+job\s+as)\s+(a|an)?\s*)/i,
    /^(my\s+goal\s+is\s+to\s+(be|become|work\s+as)\s+(a|an)?\s*)/i,
    /^(i\s+am\s+looking\s+to\s+(become|be|work\s+as)\s+(a|an)?\s*)/i,
    /^(i\s+want\s+a\s+job\s+as\s+(a|an)?\s*)/i,
    /^(becoming\s+(a|an)?\s*)/i,
    /^(as\s+(a|an)?\s*)/i
  ];

  for (const pattern of prefixPatterns) {
    cleaned = cleaned.replace(pattern, '');
  }

  // Strip trailing periods or extra punctuation
  cleaned = cleaned.replace(/[.,!?;:]+$/, '').trim();

  if (!cleaned) return 'Software Engineer';

  // Capitalize properly if all lowercase or uppercase
  if (cleaned === cleaned.toLowerCase() || cleaned === cleaned.toUpperCase()) {
    cleaned = cleaned
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return cleaned;
}
