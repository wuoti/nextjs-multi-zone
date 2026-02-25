"use client";

import React from "react";
import { Navigation } from "./Navigation";
import { NotificationProvider } from "./NotificationContext";

interface SharedLayoutProps {
  currentZone: "home" | "blog" | "dashboard";
  children: React.ReactNode;
}

export function SharedLayout({ currentZone, children }: SharedLayoutProps) {
  return (
    <NotificationProvider>
      <div style={styles.wrapper}>
        <Navigation currentZone={currentZone} />
        <main style={styles.main}>{children}</main>
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Next.js Multi-Zone PoC &mdash; Each section is a separate Next.js
            application served via{" "}
            <code style={styles.code}>rewrites</code>
          </p>
        </footer>
      </div>
    </NotificationProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8fafc",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  main: {
    flex: 1,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 24px",
    width: "100%",
  },
  footer: {
    borderTop: "1px solid #e2e8f0",
    padding: "24px",
    textAlign: "center" as const,
  },
  footerText: {
    color: "#64748b",
    fontSize: 13,
    margin: 0,
  },
  code: {
    backgroundColor: "#e2e8f0",
    padding: "2px 6px",
    borderRadius: 4,
    fontSize: 12,
    fontFamily: "monospace",
  },
};
