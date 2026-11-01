export function CompassIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlaneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m3.8 13.2 7.2-2.1 4.9-6.7c.5-.7 1.5-.9 2.2-.4.7.5.9 1.5.4 2.2L14.2 13l4.6 2.5-1 1.3-5.8-.9-2.8 3.3-1.1-.6 1.3-3.8-4.8-.4-.8-1.2Z" fill="currentColor" />
    </svg>
  );
}

export function SignalIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 9.5a10 10 0 0 1 14 0M8 12.5a5.8 5.8 0 0 1 8 0M10.8 15.3a1.8 1.8 0 0 1 2.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

export function ShieldIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 19 6v5.3c0 4.4-2.8 7.4-7 9.2-4.2-1.8-7-4.8-7-9.2V6l7-2.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="m8.8 12 2.1 2.1 4.5-4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.8c.7 4.9 2.4 6.6 7.2 7.2-4.8.7-6.5 2.4-7.2 7.2-.7-4.8-2.4-6.5-7.2-7.2 4.8-.6 6.5-2.3 7.2-7.2Z" fill="currentColor" />
      <path d="M19 15.5c.3 2 .9 2.7 3 3-2.1.3-2.7 1-3 3-.3-2-.9-2.7-3-3 2.1-.3 2.7-1 3-3Z" fill="currentColor" opacity=".65" />
    </svg>
  );
}

export function CopyIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
