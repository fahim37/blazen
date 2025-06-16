import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brazen Kits",
  description: "Brazen Kits",
  generator: "Brazen Kits",
  icons: {
    icon: "/crystal.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
