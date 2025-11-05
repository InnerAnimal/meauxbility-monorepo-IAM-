import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Meauxbility Foundation - Transform Your Pain into Purpose",
  description: "Supporting spinal cord injury survivors across Acadiana with grants for adaptive equipment and accessibility services. 501(c)(3) EIN: 33-4214907"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
