import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import { VisualEditsMessenger } from "orchids-visual-edits";


export const metadata: Metadata = {
  title: "Block Web | Premium Web Development & UI/UX Design Agency",
  description:
    "Block Web is a premium web development and UI/UX design agency. We build fast, responsive, and SEO-optimized websites, portfolios, and e-commerce applications designed to help businesses grow.",
};

import { Providers } from "@/components/Providers";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Providers session={session}>
          <SmoothScrollProvider>
            {/* 🔥 MAIN BACKGROUND WRAPPER */}
        <div className="relative min-h-screen">
          {children}
        </div>
          </SmoothScrollProvider>
        </Providers>

        {/* <VisualEditsMessenger /> */}
      </body>
    </html>
  );
}