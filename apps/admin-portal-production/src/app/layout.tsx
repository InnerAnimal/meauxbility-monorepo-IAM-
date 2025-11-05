import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meauxbility Admin Portal",
  description: "Administrative portal for Meauxbility Foundation operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
