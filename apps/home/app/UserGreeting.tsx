"use client";

import React, { useState } from "react";
import { useUser } from "@repo/shared/components/UserContext";

export function UserGreeting() {
  const { user, setUser } = useUser();
  const [name, setName] = useState("");

  if (user) {
    return (
      <div style={styles.greeting}>
        <span>
          Welcome, <strong>{user.name}</strong>! (role: {user.role})
        </span>
        <button onClick={() => setUser(null)} style={styles.logoutBtn}>
          Log out
        </button>
        <p style={styles.hint}>
          Navigate to other zones — your identity follows via cookies.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.loginBox}>
      <p style={styles.loginLabel}>
        Try the cross-zone integration: set your name and it will appear in all
        zones.
      </p>
      <div style={styles.loginForm}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={styles.input}
        />
        <button
          onClick={() => {
            if (name.trim()) {
              setUser({ name: name.trim(), role: "viewer" });
            }
          }}
          style={styles.loginBtn}
        >
          Set Identity
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  greeting: {
    backgroundColor: "#ecfdf5",
    border: "1px solid #a7f3d0",
    borderRadius: 12,
    padding: "16px 24px",
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    fontSize: 15,
    color: "#065f46",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    border: "1px solid #a7f3d0",
    borderRadius: 6,
    padding: "4px 12px",
    cursor: "pointer",
    fontSize: 13,
    color: "#065f46",
  },
  hint: {
    width: "100%",
    margin: 0,
    fontSize: 13,
    color: "#047857",
  },
  loginBox: {
    backgroundColor: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 12,
    padding: "20px 24px",
    marginBottom: 32,
  },
  loginLabel: {
    fontSize: 14,
    color: "#1e40af",
    margin: "0 0 12px 0",
  },
  loginForm: {
    display: "flex",
    gap: 8,
  },
  input: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid #93c5fd",
    fontSize: 14,
    flex: 1,
    outline: "none",
  },
  loginBtn: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
};
