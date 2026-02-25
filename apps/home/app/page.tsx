"use client";

import { SharedLayout, UserProvider, useNotification } from "@repo/shared";
import { UserGreeting } from "./UserGreeting";

function HomeContent() {
  const { notify } = useNotification();

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={styles.heading}>Next.js Multi-Zone Microfrontends</h1>
      <p style={styles.subtitle}>
        This proof-of-concept demonstrates how multiple independent Next.js
        applications can be composed into a single unified experience using{" "}
        <strong>Multi-Zones</strong>.
      </p>

      <UserGreeting />

      <div style={styles.notifySection}>
        <h4 style={styles.notifySectionTitle}>
          Cross-Zone Notifications
        </h4>
        <p style={styles.notifyDesc}>
          Trigger a notification here, then navigate to another zone — it
          will appear there too (persisted via localStorage).
        </p>
        <div style={styles.notifyButtons}>
          {(
            [
              ["info", "Info"],
              ["success", "Success"],
              ["warning", "Warning"],
              ["error", "Error"],
            ] as const
          ).map(([type, label]) => (
            <button
              key={type}
              onClick={() =>
                notify(`${label} notification from home zone`, {
                  type,
                  source: "home",
                })
              }
              style={{
                ...styles.notifyBtn,
                ...notifyBtnColors[type],
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.grid}>
            <a href="/blog" style={styles.card}>
              <h3 style={styles.cardTitle}>Blog Zone &rarr;</h3>
              <p style={styles.cardDesc}>
                A separate Next.js app serving <code>/blog/*</code> routes with
                its own build and deployment.
              </p>
              <span style={styles.tag}>Port 3001</span>
            </a>
            <a href="/dashboard" style={styles.card}>
              <h3 style={styles.cardTitle}>Dashboard Zone &rarr;</h3>
              <p style={styles.cardDesc}>
                Another independent Next.js app serving{" "}
                <code>/dashboard/*</code> routes.
              </p>
              <span style={styles.tag}>Port 3002</span>
            </a>
          </div>

          <div style={styles.infoBox}>
            <h4 style={styles.infoTitle}>How it works</h4>
            <ul style={styles.infoList}>
              <li>
                Each zone is a <strong>separate Next.js application</strong>{" "}
                running on its own port
              </li>
              <li>
                The home zone uses <code>rewrites</code> in{" "}
                <code>next.config.ts</code> to proxy <code>/blog</code> and{" "}
                <code>/dashboard</code> to other zones
              </li>
              <li>
                A <strong>shared package</strong> provides the navigation bar
                and layout for visual consistency
              </li>
              <li>
                <strong>Cross-zone state</strong> is shared via cookies (try
                setting your name above — it persists across zones)
              </li>
            </ul>
          </div>
        </div>
  );
}

export default function HomePage() {
  return (
    <UserProvider>
      <SharedLayout currentZone="home">
        <HomeContent />
      </SharedLayout>
    </UserProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: {
    fontSize: 36,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: "#475569",
    lineHeight: 1.7,
    marginBottom: 32,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
    marginBottom: 40,
  },
  card: {
    padding: 28,
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    backgroundColor: "#fff",
    textDecoration: "none",
    color: "inherit",
    transition: "box-shadow 0.2s, border-color 0.2s",
    cursor: "pointer",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    marginTop: 0,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: 12,
  },
  tag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 600,
    color: "#6366f1",
    backgroundColor: "#eef2ff",
    padding: "3px 10px",
    borderRadius: 9999,
    textTransform: "uppercase" as const,
  },
  infoBox: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: "24px 28px",
    border: "1px solid #e2e8f0",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
    marginTop: 0,
    marginBottom: 12,
  },
  infoList: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.8,
    paddingLeft: 20,
    margin: 0,
  },
  notifySection: {
    backgroundColor: "#faf5ff",
    border: "1px solid #e9d5ff",
    borderRadius: 12,
    padding: "20px 24px",
    marginBottom: 32,
  },
  notifySectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
    marginTop: 0,
    marginBottom: 6,
  },
  notifyDesc: {
    fontSize: 14,
    color: "#6b21a8",
    margin: "0 0 14px 0",
    lineHeight: 1.5,
  },
  notifyButtons: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap" as const,
  },
  notifyBtn: {
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    color: "#fff",
  },
};

const notifyBtnColors: Record<string, React.CSSProperties> = {
  info: { backgroundColor: "#3b82f6" },
  success: { backgroundColor: "#10b981" },
  warning: { backgroundColor: "#f59e0b", color: "#0f172a" },
  error: { backgroundColor: "#ef4444" },
};
