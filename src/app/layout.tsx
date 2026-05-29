import type { Metadata } from "next";
import { Cinzel, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DadFlix — A Lifetime of Memories | Father's Day Tribute",
  description: "Experience DadFlix, a world-class cinematic Father's Day web tribute. Celebrating the greatest story ever told: the life, lessons, and achievements of Dad. Streaming in our hearts forever.",
  keywords: ["Fathers Day", "DadFlix", "Tribute", "Netflix Tribute", "Fatherly Love", "Nostalgia", "Cinematic Tribute"],
  authors: [{ name: "DadFlix" }],
  openGraph: {
    title: "DadFlix — A Lifetime of Memories",
    description: "Experience DadFlix, a world-class cinematic Father's Day web tribute. Celebrating the greatest story ever told.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${caveat.variable} font-sans h-full antialiased text-white select-none`}
      style={{ backgroundColor: "#000000" }}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                var div = document.createElement('div');
                div.style.position = 'fixed';
                div.style.top = '0';
                div.style.left = '0';
                div.style.width = '100%';
                div.style.background = 'red';
                div.style.color = 'white';
                div.style.padding = '10px';
                div.style.zIndex = '999999';
                div.style.fontSize = '14px';
                div.style.fontFamily = 'monospace';
                div.style.whiteSpace = 'pre-wrap';
                div.innerText = 'Client-Side Error:\\n' + e.message + '\\nSource: ' + e.filename + ':' + e.lineno + '\\nCol: ' + e.colno + '\\nStack: ' + (e.error ? e.error.stack : 'No stack available');
                document.body.appendChild(div);
              });
            `,
          }}
        />
      </head>
      <body className="bg-black text-neutral-100 min-h-full flex flex-col font-sans overflow-x-hidden selection:bg-amber-500 selection:text-black">
        {/* Cinematic Film Grain Overlay */}
        <div className="film-grain" aria-hidden="true" />
        
        {/* Lenis Smooth Scrolling container */}
        <SmoothScroll>
          <div className="relative min-h-screen flex flex-col w-full z-10">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
