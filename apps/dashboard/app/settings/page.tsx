"use client";

import { SharedLayout, UserProvider, useNotification } from "@repo/shared";
import { useUser } from "@repo/shared/components/UserContext";
import React, { useState } from "react";

function SettingsContent() {
  const { user, setUser } = useUser();
  const { notify } = useNotification();
  const [name, setName] = useState(user?.name ?? "");
  const [role, setRole] = useState(user?.role ?? "viewer");
  const [saved, setSaved] = useState(false);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
    }
  }, [user]);

  const handleSave = () => {
    if (name.trim()) {
      setUser({ name: name.trim(), role });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      notify(`Settings saved for ${name.trim()} (${role})`, {
        type: "success",
        source: "dashboard",
      });
    }
  };

  return (
    <SharedLayout currentZone="dashboard">
      <a
        href="/dashboard"
        style={{ color: "#3b82f6", textDecoration: "none", fontSize: 14 }}
      >
        &larr; Back to dashboard
      </a>
      <h1 style={styles.heading}>Settings</h1>
      <p style={styles.subtitle}>
        Changes here are stored in cookies and reflected across all zones.
      </p>

      <div style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Display Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Your name"
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button onClick={handleSave} style={styles.saveBtn}>
          {saved ? "Saved!" : "Save Settings"}
        </button>
        {saved && (
          <p style={styles.savedMsg}>
            Settings saved. Navigate to other zones to see the changes.
          </p>
        )}
      </div>
    </SharedLayout>
  );
}

export default function SettingsPage() {
  return (
    <UserProvider>
      <SettingsContent />
    </UserProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: {
    fontSize: 28,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 4,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 15,
    marginBottom: 32,
  },
  form: {
    maxWidth: 440,
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 28,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    outline: "none",
    backgroundColor: "#fff",
    boxSizing: "border-box" as const,
  },
  saveBtn: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
  },
  savedMsg: {
    color: "#059669",
    fontSize: 13,
    marginTop: 12,
    marginBottom: 0,
  },
};
