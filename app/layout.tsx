import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/config";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1B1238",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description:
      "Party games where the crowd is the game. Be Unique, Titans, Tipping Point and more.",
    images: ["/social/og-image.png"],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon-180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
