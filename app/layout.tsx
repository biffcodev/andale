import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { CookieUi } from "@/components/cookie-ui";
import { Loader } from "@/components/loader";
import { Nav } from "@/components/nav";
import { SiteProvider } from "@/components/site-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andale — Branding & Strategy",
  description: "An independent studio shaping identities, narratives and experiences for companies with ambition.",
  icons: { icon: "/uploads/isologo.svg" },
};

const themeInit = `try{var t=localStorage.getItem("andaleTheme");document.documentElement.dataset.theme=(t==="dark"||t==="light")?t:"light"}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={inter.variable}>
        <SiteProvider>
          <Loader />
          <Nav />
          {children}
          <CookieUi />
        </SiteProvider>
      </body>
    </html>
  );
}
