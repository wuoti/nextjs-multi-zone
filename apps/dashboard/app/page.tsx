"use client";

import { SharedLayout, UserProvider } from "@repo/shared";
import { useUser } from "@repo/shared/components/UserContext";

const stats = [
  { label: "Total Views", value: "12,847", change: "+12%", color: "#3b82f6" },
  { label: "Active Users", value: "1,024", change: "+5%", color: "#10b981" },
  { label: "Blog Posts", value: "3", change: "0%", color: "#8b5cf6" },
  { label: "Zones Active", value: "3", change: "—", color: "#f59e0b" },
];

function DashboardContent() {
  const { user } = useUser();

  return (
    <SharedLayout currentZone="dashboard">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={styles.heading}>Dashboard</h1>
          <p style={styles.subtitle}>
            Served by the <strong>dashboard zone</strong> (port 3002)
          </p>
        </div>
        {user && (
          <div style={styles.userBadge}>
            <div style={styles.avatar}>{user.name[0].toUpperCase()}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{user.role}</div>
            </div>
          </div>
        )}
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <div style={{ ...styles.statDot, backgroundColor: stat.color }} />
            <div style={styles.statLabel}>{stat.label}</div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statChange}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div style={styles.sectionGrid}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Recent Activity</h3>
          <div style={styles.activityList}>
            {[
              { text: "Blog zone deployed", time: "2 min ago" },
              { text: "New user registered", time: "15 min ago" },
              { text: "Dashboard zone updated", time: "1 hour ago" },
              { text: "Home zone deployed", time: "3 hours ago" },
            ].map((item, i) => (
              <div key={i} style={styles.activityItem}>
                <span style={styles.activityText}>{item.text}</span>
                <span style={styles.activityTime}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Zone Health</h3>
          {["Home (3000)", "Blog (3001)", "Dashboard (3002)"].map((zone) => (
            <div key={zone} style={styles.healthRow}>
              <span style={styles.healthDot} />
              <span style={{ fontSize: 14 }}>{zone}</span>
              <span style={styles.healthStatus}>Healthy</span>
            </div>
          ))}
          <div style={styles.settingsLink}>
            <a href="/dashboard/settings" style={{ color: "#3b82f6", fontSize: 14, textDecoration: "none" }}>
              Manage settings &rarr;
            </a>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}

export default function DashboardPage() {
  return (
    <UserProvider>
      <DashboardContent />
    </UserProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: {
    fontSize: 32,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 4,
    marginTop: 0,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 15,
    margin: 0,
  },
  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f1f5f9",
    padding: "8px 16px",
    borderRadius: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#6366f1",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 20,
    position: "relative" as const,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    position: "absolute" as const,
    top: 20,
    right: 20,
  },
  statLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: 500,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 800,
    color: "#0f172a",
  },
  statChange: {
    fontSize: 13,
    color: "#10b981",
    fontWeight: 500,
    marginTop: 4,
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
  },
  section: {
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
    marginTop: 0,
    marginBottom: 16,
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  activityItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottom: "1px solid #f1f5f9",
  },
  activityText: {
    fontSize: 14,
    color: "#334155",
  },
  activityTime: {
    fontSize: 12,
    color: "#94a3b8",
  },
  healthRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  healthDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#10b981",
  },
  healthStatus: {
    marginLeft: "auto",
    fontSize: 13,
    color: "#10b981",
    fontWeight: 500,
  },
  settingsLink: {
    marginTop: 16,
  },
};
