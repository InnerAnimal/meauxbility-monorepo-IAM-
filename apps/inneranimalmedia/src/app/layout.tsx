import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inner Animal Media",
  description: "Stories of resilience, strength, and the warrior spirit within",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
