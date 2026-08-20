"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { CurrencyProvider } from "@/lib/currency";

export function Providers({ children, session }: { children: React.ReactNode, session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <CurrencyProvider>
        {children}
      </CurrencyProvider>
    </SessionProvider>
  );
}

