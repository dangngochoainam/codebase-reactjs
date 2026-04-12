import type { CSSProperties } from "react";

// Font families
export const MONO: CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
export const SANS: CSSProperties = { fontFamily: "'IBM Plex Sans', system-ui, sans-serif" };
export const SERIF: CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };

// Typography presets — shared patterns used across pages
export const EYEBROW: CSSProperties = {
  ...MONO,
  fontSize: "10px",
  letterSpacing: "0.4em",
  color: "var(--app-accent)",
  textTransform: "uppercase",
};

export const PAGE_HEADING: CSSProperties = {
  ...SERIF,
  fontSize: "2.5rem",
  fontWeight: 400,
  color: "var(--app-text)",
  lineHeight: 1.1,
};

export const FIELD_LABEL: CSSProperties = {
  ...MONO,
  fontSize: "9px",
  letterSpacing: "0.3em",
  color: "var(--app-text-dim)",
  textTransform: "uppercase",
};
