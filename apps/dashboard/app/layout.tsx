import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Zone App — Dashboard",
  description: "Dashboard zone of the Multi-Zone PoC",
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
