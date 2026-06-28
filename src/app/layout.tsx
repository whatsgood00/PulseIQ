import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastContainer } from "@/components/ui/Toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PulseIQ — Analytics Dashboard",
  description: "A polished SaaS analytics UI built with Next.js 16, React 19, and TypeScript. Portfolio demo with charts, auth, billing, and notifications.",
  keywords: ["Next.js", "React", "TypeScript", "SaaS", "Dashboard", "Analytics", "Portfolio"],
  authors: [{ name: "PulseIQ" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "PulseIQ — Analytics Dashboard",
    description: "Real-time analytics UI for modern SaaS teams. Portfolio project built with Next.js 16 & React 19.",
    type: "website",
    url: "https://pulseiq-ten.vercel.app",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "PulseIQ Analytics Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseIQ — Analytics Dashboard",
    description: "Polished SaaS analytics UI — portfolio demo with mock data.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("pulseiq-theme");var p=t&&JSON.parse(t);var theme=p&&p.state&&p.state.theme;if(theme==="light"||theme==="dark"){document.documentElement.classList.add(theme);}else{document.documentElement.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`}
        </Script>
        <ThemeProvider>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
