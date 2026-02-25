"use client";

import { SharedLayout, UserProvider } from "@repo/shared";
import { useUser } from "@repo/shared/components/UserContext";

const posts = [
  {
    slug: "getting-started-with-multi-zones",
    title: "Getting Started with Next.js Multi-Zones",
    excerpt:
      "Learn how to split your Next.js application into independently deployable zones.",
    date: "2026-02-20",
    author: "Team",
  },
  {
    slug: "microfrontend-patterns",
    title: "Microfrontend Patterns in Practice",
    excerpt:
      "Explore different approaches to building microfrontend architectures with Next.js.",
    date: "2026-02-18",
    author: "Team",
  },
  {
    slug: "sharing-state-across-zones",
    title: "Sharing State Across Zones",
    excerpt:
      "Strategies for maintaining consistent state across independently deployed Next.js applications.",
    date: "2026-02-15",
    author: "Team",
  },
];

function BlogContent() {
  const { user } = useUser();

  return (
    <SharedLayout currentZone="blog">
      <h1 style={styles.heading}>Blog</h1>
      {user && (
        <p style={styles.welcome}>
          Reading as <strong>{user.name}</strong>
        </p>
      )}
      <p style={styles.subtitle}>
        This page is served by the <strong>blog zone</strong> (port 3001), a
        completely separate Next.js application.
      </p>
      <div style={styles.list}>
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={styles.card}
          >
            <div style={styles.meta}>
              <span>{post.date}</span>
              <span>&middot;</span>
              <span>{post.author}</span>
            </div>
            <h2 style={styles.cardTitle}>{post.title}</h2>
            <p style={styles.cardExcerpt}>{post.excerpt}</p>
          </a>
        ))}
      </div>
    </SharedLayout>
  );
}

export default function BlogPage() {
  return (
    <UserProvider>
      <BlogContent />
    </UserProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heading: {
    fontSize: 32,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 8,
  },
  welcome: {
    color: "#059669",
    fontSize: 14,
    marginBottom: 8,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 1.6,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    display: "block",
    padding: 24,
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    backgroundColor: "#fff",
    textDecoration: "none",
    color: "inherit",
    transition: "border-color 0.2s",
  },
  meta: {
    display: "flex",
    gap: 8,
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 8px 0",
  },
  cardExcerpt: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.6,
    margin: 0,
  },
};
