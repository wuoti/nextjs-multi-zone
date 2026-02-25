"use client";

import { SharedLayout, UserProvider } from "@repo/shared";

export default function AboutPage() {
  return (
    <UserProvider>
      <SharedLayout currentZone="home">
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a" }}>
          About This PoC
        </h1>
        <div style={{ maxWidth: 700, lineHeight: 1.8, color: "#475569" }}>
          <p>
            This application demonstrates <strong>Next.js Multi-Zones</strong>,
            a feature that lets you compose multiple Next.js applications under
            a single domain.
          </p>

          <h2 style={{ color: "#0f172a", fontSize: 22, marginTop: 32 }}>
            Architecture
          </h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Zone</th>
                <th style={styles.th}>Routes</th>
                <th style={styles.th}>Port</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Home</td>
                <td style={styles.td}>
                  <code>/</code>, <code>/about</code>
                </td>
                <td style={styles.td}>3000</td>
              </tr>
              <tr>
                <td style={styles.td}>Blog</td>
                <td style={styles.td}>
                  <code>/blog</code>, <code>/blog/[slug]</code>
                </td>
                <td style={styles.td}>3001</td>
              </tr>
              <tr>
                <td style={styles.td}>Dashboard</td>
                <td style={styles.td}>
                  <code>/dashboard</code>, <code>/dashboard/settings</code>
                </td>
                <td style={styles.td}>3002</td>
              </tr>
            </tbody>
          </table>

          <h2 style={{ color: "#0f172a", fontSize: 22, marginTop: 32 }}>
            Cross-Zone Integration
          </h2>
          <ul>
            <li>
              <strong>Shared UI:</strong> Navigation and layout from{" "}
              <code>@repo/shared</code>
            </li>
            <li>
              <strong>Shared State:</strong> User identity persisted in cookies,
              readable by all zones
            </li>
            <li>
              <strong>Routing:</strong> The home zone uses <code>rewrites</code>{" "}
              to proxy requests to other zones
            </li>
          </ul>
        </div>
      </SharedLayout>
    </UserProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 12,
    fontSize: 14,
  },
  th: {
    textAlign: "left",
    padding: "10px 16px",
    backgroundColor: "#f1f5f9",
    borderBottom: "2px solid #e2e8f0",
    fontWeight: 700,
    color: "#0f172a",
  },
  td: {
    padding: "10px 16px",
    borderBottom: "1px solid #e2e8f0",
  },
};
