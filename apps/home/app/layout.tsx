import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Zone App — Home",
  description: "Next.js Multi-Zone Microfrontend PoC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
