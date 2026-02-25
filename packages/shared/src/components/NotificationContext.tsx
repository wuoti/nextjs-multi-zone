"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  source?: string;
  createdAt: number;
  /** ms before auto-dismiss; 0 = manual only */
  duration: number;
}

interface NotifyOptions {
  type?: NotificationType;
  /** Zone that originated the notification — shown as a badge */
  source?: string;
  /** Auto-dismiss after ms (default 5000, 0 = sticky) */
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  notify: (message: string, opts?: NotifyOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const STORAGE_KEY = "mz_notifications";

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  notify: () => "",
  dismiss: () => {},
  dismissAll: () => {},
});

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readPending(): Notification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items: Notification[] = JSON.parse(raw);
    const cutoff = Date.now() - 30_000;
    return items.filter((n) => n.createdAt > cutoff);
  } catch {
    return [];
  }
}

function writePending(items: Notification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const scheduleAutoDismiss = useCallback(
    (n: Notification) => {
      if (n.duration > 0) {
        const timer = setTimeout(() => dismiss(n.id), n.duration);
        timersRef.current.set(n.id, timer);
      }
    },
    [dismiss]
  );

  const notify = useCallback(
    (message: string, opts: NotifyOptions = {}): string => {
      const id = generateId();
      const notification: Notification = {
        id,
        message,
        type: opts.type ?? "info",
        source: opts.source,
        createdAt: Date.now(),
        duration: opts.duration ?? 5000,
      };
      setNotifications((prev) => [...prev, notification]);
      scheduleAutoDismiss(notification);

      const pending = readPending();
      pending.push(notification);
      writePending(pending);

      return id;
    },
    [scheduleAutoDismiss]
  );

  const dismissAll = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current.clear();
    setNotifications([]);
  }, []);

  useEffect(() => {
    const pending = readPending();
    if (pending.length > 0) {
      writePending([]);
      setNotifications((prev) => [...prev, ...pending]);
      pending.forEach(scheduleAutoDismiss);
    }
  }, [scheduleAutoDismiss]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, notify, dismiss, dismissAll }}
    >
      {children}
      <ToastContainer notifications={notifications} onDismiss={dismiss} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}

/* ── Toast UI ─────────────────────────────────────────── */

const typeConfig: Record<
  NotificationType,
  { bg: string; border: string; icon: string; accent: string }
> = {
  info: {
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: "\u2139\uFE0F",
    accent: "#2563eb",
  },
  success: {
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: "\u2705",
    accent: "#059669",
  },
  warning: {
    bg: "#fffbeb",
    border: "#fde68a",
    icon: "\u26A0\uFE0F",
    accent: "#d97706",
  },
  error: {
    bg: "#fef2f2",
    border: "#fecaca",
    icon: "\u274C",
    accent: "#dc2626",
  },
};

function ToastContainer({
  notifications,
  onDismiss,
}: {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}) {
  if (notifications.length === 0) return null;

  return (
    <div style={toastStyles.container} role="status" aria-live="polite">
      {notifications.map((n) => {
        const cfg = typeConfig[n.type];
        return (
          <div
            key={n.id}
            style={{
              ...toastStyles.toast,
              backgroundColor: cfg.bg,
              borderColor: cfg.border,
            }}
          >
            <span style={toastStyles.icon}>{cfg.icon}</span>
            <div style={toastStyles.body}>
              <span style={toastStyles.message}>{n.message}</span>
              {n.source && (
                <span
                  style={{ ...toastStyles.source, color: cfg.accent }}
                >
                  from {n.source}
                </span>
              )}
            </div>
            <button
              onClick={() => onDismiss(n.id)}
              style={toastStyles.closeBtn}
              aria-label="Dismiss"
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
}

const toastStyles: Record<string, React.CSSProperties> = {
  container: {
    position: "fixed",
    top: 76,
    right: 20,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: 400,
    width: "100%",
    pointerEvents: "none",
  },
  toast: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    pointerEvents: "auto",
    animation: "mz-slide-in 0.25s ease-out",
  },
  icon: {
    fontSize: 18,
    lineHeight: "22px",
    flexShrink: 0,
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  message: {
    fontSize: 14,
    fontWeight: 500,
    color: "#0f172a",
    lineHeight: "20px",
  },
  source: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: 0.4,
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    color: "#94a3b8",
    padding: "0 2px",
    lineHeight: "20px",
    flexShrink: 0,
  },
};
