"use client";

import { SharedLayout, UserProvider, useNotification } from "@repo/shared";
import { useUser } from "@repo/shared/components/UserContext";
import { use, useEffect, useRef } from "react";

const postContent: Record<string, { title: string; body: string }> = {
  "getting-started-with-multi-zones": {
    title: "Getting Started with Next.js Multi-Zones",
    body: `Multi-Zones allow you to have multiple Next.js applications that are merged together on a single domain. Each "zone" is a separate Next.js app that owns a set of paths.

The main zone uses "rewrites" in next.config.ts to proxy certain URL patterns to other zones. Each zone defines a "basePath" so it knows its URL prefix.

This approach is ideal for large organizations where different teams own different parts of the application. Each team can develop, test, and deploy their zone independently.`,
  },
  "microfrontend-patterns": {
    title: "Microfrontend Patterns in Practice",
    body: `There are several approaches to microfrontends:

1. **Build-time integration** — shared npm packages consumed at build time
2. **Server-side integration** — reverse proxy or edge functions compose pages
3. **Run-time integration** — iframe or Web Components load separate apps
4. **Multi-Zones** — Next.js native approach using rewrites and basePath

Next.js Multi-Zones is a server-side integration pattern where the main app proxies requests to independent Next.js applications. Each zone has its own build pipeline and can be deployed separately.`,
  },
  "sharing-state-across-zones": {
    title: "Sharing State Across Zones",
    body: `Since each zone is a separate application, sharing state requires mechanisms that work across page loads:

- **Cookies** — Simple key-value data readable by all zones on the same domain
- **URL parameters** — Pass data through query strings when navigating
- **Backend APIs** — A shared API layer that all zones can call
- **Local Storage** — Browser storage accessible by all zones on the same origin

In this PoC, we use cookies to share user identity across all three zones. When you set your name in the home zone, it appears in blog and dashboard zones too.`,
  },
};

function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user } = useUser();
  const { notify } = useNotification();
  const notifiedRef = useRef(false);
  const post = postContent[slug];

  useEffect(() => {
    if (post && !notifiedRef.current) {
      notifiedRef.current = true;
      notify(`Now reading: "${post.title}"`, {
        type: "info",
        source: "blog",
        duration: 4000,
      });
    }
  }, [post, notify]);

  if (!post) {
    return (
      <SharedLayout currentZone="blog">
        <h1>Post not found</h1>
        <a href="/blog" style={{ color: "#3b82f6" }}>
          &larr; Back to blog
        </a>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout currentZone="blog">
      <a href="/blog" style={styles.back}>
        &larr; Back to all posts
      </a>
      <article style={styles.article}>
        <h1 style={styles.title}>{post.title}</h1>
        {user && (
          <p style={styles.reader}>
            Reading as <strong>{user.name}</strong>
          </p>
        )}
        {post.body.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            style={styles.paragraph}
            dangerouslySetInnerHTML={{
              __html: paragraph.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
              ),
            }}
          />
        ))}
      </article>
    </SharedLayout>
  );
}

export default function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <UserProvider>
      <PostContent params={props.params} />
    </UserProvider>
  );
}

const styles: Record<string, React.CSSProperties> = {
  back: {
    display: "inline-block",
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: 14,
    marginBottom: 24,
    fontWeight: 500,
  },
  article: {
    maxWidth: 700,
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 16,
    lineHeight: 1.3,
  },
  reader: {
    color: "#059669",
    fontSize: 13,
    marginBottom: 24,
    paddingBottom: 24,
    borderBottom: "1px solid #e2e8f0",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 1.8,
    color: "#334155",
    marginBottom: 20,
  },
};
