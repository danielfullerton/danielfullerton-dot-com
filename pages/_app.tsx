import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollReveal from "@/components/ScrollReveal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Fraunces, IBM_Plex_Mono, Newsreader } from "next/font/google";

// Self-hosted via next/font (CSP-safe - no runtime CDN request).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-fraunces",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-newsreader",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div
      className={`${fraunces.variable} ${newsreader.variable} ${plexMono.variable} font-body bg-paper min-h-screen flex flex-col`}
    >
      <GoogleAnalytics />
      <ScrollReveal />
      <main className="flex-grow">
        <div key={router.asPath} className="route-fade">
          <Component {...pageProps} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
