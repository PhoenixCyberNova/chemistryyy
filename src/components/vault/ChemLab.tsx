export function ChemLab() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hex-grid absolute inset-0 opacity-80" />
      <div className="grain absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(45,212,191,0.16),_transparent_58%)]" />
      <div className="lab-glow absolute -right-10 top-8 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -left-16 top-40 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
      <svg className="float-slow absolute right-[-12%] top-6 h-[280px] w-[280px] opacity-50 sm:right-[4%] sm:h-[340px] sm:w-[340px]" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="18" fill="#2dd4bf" fillOpacity="0.35" />
        <circle cx="100" cy="100" r="6" fill="#e8c36a" />
        <g className="orbit-ring">
          <ellipse cx="100" cy="100" rx="72" ry="28" stroke="#2dd4bf" strokeOpacity="0.45" />
          <circle cx="172" cy="100" r="5" fill="#e8c36a" />
        </g>
        <g className="orbit-ring-rev">
          <ellipse cx="100" cy="100" rx="52" ry="78" stroke="#7dd3fc" strokeOpacity="0.3" />
          <circle cx="100" cy="22" r="4" fill="#2dd4bf" />
        </g>
        <path d="M86 118 L100 148 L114 118" stroke="#2dd4bf" strokeOpacity="0.35" />
      </svg>
      <svg className="absolute bottom-[8%] left-[-40px] hidden h-40 w-28 opacity-40 sm:block" viewBox="0 0 80 120" fill="none">
        <path d="M28 8h24v18c0 8-6 14-6 22v8c14 8 22 22 22 38 0 16-12 26-28 26s-28-10-28-26c0-16 8-30 22-38v-8c0-8-6-14-6-22V8z" stroke="#2dd4bf" strokeWidth="2" />
        <path d="M30 78c4 10 20 10 24 0" fill="#2dd4bf" fillOpacity="0.35" />
      </svg>
    </div>
  );
}
