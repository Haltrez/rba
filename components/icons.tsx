type IconProps = {
  name:
    | "sparkles"
    | "zap"
    | "code"
    | "wrench"
    | "github"
    | "linkedin"
    | "instagram"
    | "arrow-up-right"
    | "arrow-down"
    | "download"
    | "mail"
    | "phone"
    | "menu"
    | "close";
  className?: string;
};

/* Mazas inline SVG ikonas, lai nav vajadzīga ārēja ikonu bibliotēka */
export default function Icon({ name, className = "h-5 w-5" }: IconProps) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
          <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
        </svg>
      );
    case "zap":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M16 18l6-6-6-6" />
          <path d="M8 6l-6 6 6 6" />
        </svg>
      );
    case "wrench":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M14.7 6.3a4.5 4.5 0 106.3 6.3l-3.2-3.2.9-3.2 3.2-.9-3.2-3.2a4.5 4.5 0 00-4 4.2z" />
          <path d="M12.6 12.6L4 21.2a2 2 0 01-2.8-2.8l8.6-8.6" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M7 17L17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M12 5v14" />
          <path d="M19 12l-7 7-7-7" />
        </svg>
      );
    case "download":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M12 3v12" />
          <path d="M7 10l5 5 5-5" />
          <path d="M4 21h16" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.96.3 1.9.6 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.84.5 2.8.6a2 2 0 011.8 2.2z" />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </svg>
      );
  }
}
