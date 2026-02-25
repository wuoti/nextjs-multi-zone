"use client";

import React from "react";
import { useNotification } from "./NotificationContext";

const navItems = [
  { href: "/", label: "Home", zone: "home" },
  { href: "/about", label: "About", zone: "home" },
  { href: "/blog", label: "Blog", zone: "blog" },
  { href: "/dashboard", label: "Dashboard", zone: "dashboard" },
];

interface NavigationProps {
  currentZone: "home" | "blog" | "dashboard";
}

export function Navigation({ currentZone }: NavigationProps) {
  const { notifications, notify, dismissAll } = useNotification();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <a href="/" style={styles.brandLink}>
            Multi-Zone App
          </a>
          <span style={styles.badge}>{currentZone} zone</span>
        </div>
        <div style={styles.right}>
          <ul style={styles.links}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  style={{
                    ...styles.link,
                    ...(item.zone === currentZone ? styles.activeLink : {}),
                  }}
                >
                  {item.label}
                  {item.zone !== currentZone && (
                    <span style={styles.externalBadge}>{item.zone}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              notify(`Test notification from ${currentZone} zone`, {
                type: "info",
                source: currentZone,
              })
            }
            style={styles.bellBtn}
            title="Send test notification"
          >
            <span role="img" aria-label="bell">
              &#x1F514;
            </span>
            {notifications.length > 0 && (
              <span style={styles.bellCount}>{notifications.length}</span>
            )}
          </button>
          {notifications.length > 0 && (
            <button
              onClick={dismissAll}
              style={styles.clearBtn}
              title="Clear all"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    backgroundColor: "#0f172a",
    borderBottom: "1px solid #1e293b",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  brandLink: {
    color: "#f8fafc",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 18,
  },
  badge: {
    backgroundColor: "#6366f1",
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 9999,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  links: {
    display: "flex",
    listStyle: "none",
    gap: 4,
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 6,
    transition: "color 0.15s, background 0.15s",
  },
  activeLink: {
    color: "#f8fafc",
    backgroundColor: "#1e293b",
  },
  externalBadge: {
    fontSize: 9,
    color: "#64748b",
    border: "1px solid #334155",
    padding: "1px 5px",
    borderRadius: 4,
    textTransform: "uppercase" as const,
    fontWeight: 600,
  },
  bellBtn: {
    background: "none",
    border: "1px solid #334155",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
    position: "relative" as const,
    color: "#94a3b8",
  },
  bellCount: {
    position: "absolute" as const,
    top: -6,
    right: -6,
    backgroundColor: "#ef4444",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    width: 18,
    height: 18,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtn: {
    background: "none",
    border: "1px solid #334155",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 500,
    color: "#94a3b8",
  },
};
