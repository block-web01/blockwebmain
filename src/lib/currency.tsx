"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyConfig = {
  countryCode: string;
  code: string;
  symbol: string;
  locale: string;
  name: string;
};

export const CURRENCY_MAP: Record<string, CurrencyConfig> = {
  IN: { countryCode: "IN", code: "INR", symbol: "₹", locale: "en-IN", name: "India" },
  US: { countryCode: "US", code: "USD", symbol: "$", locale: "en-US", name: "United States" },
};

export const DEFAULT_CURRENCY = CURRENCY_MAP.US;

type CurrencyContextType = {
  currency: CurrencyConfig;
  setCurrencyByCountry: (countryCode: string) => void;
  formatPrice: (amount: number) => string;
  isLoading: boolean;
  mounted: boolean;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyConfig>(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function detectLocation() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        const country = data.country_code?.toUpperCase();
        if (country && CURRENCY_MAP[country]) {
          setCurrency(CURRENCY_MAP[country]);
        } else if (country === "IN") {
          setCurrency(CURRENCY_MAP.IN);
        } else {
          setCurrency(DEFAULT_CURRENCY);
        }
      } catch (err) {
        console.warn("Auto country detection failed, falling back to timezone/locale", err);
        // Fallback to Timezone
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (
            tz &&
            (tz.includes("Kolkata") ||
              tz.includes("Calcutta") ||
              tz.startsWith("Asia/Kolkata") ||
              tz.startsWith("Asia/Calcutta"))
          ) {
            setCurrency(CURRENCY_MAP.IN);
          } else {
            // Fallback to browser language
            const languages = window.navigator.languages || [window.navigator.language];
            const hasIN = languages.some(
              (lang) => lang.toUpperCase().includes("IN") || lang.toUpperCase().endsWith("IN")
            );
            if (hasIN) {
              setCurrency(CURRENCY_MAP.IN);
            } else {
              setCurrency(DEFAULT_CURRENCY);
            }
          }
        } catch (tzErr) {
          console.warn("Timezone resolution failed, falling back to USD", tzErr);
          setCurrency(DEFAULT_CURRENCY);
        }
      } finally {
        setIsLoading(false);
      }
    }

    detectLocation();
  }, []);

  const setCurrencyByCountry = (countryCode: string) => {
    const upper = countryCode.toUpperCase();
    if (CURRENCY_MAP[upper]) {
      setCurrency(CURRENCY_MAP[upper]);
    } else {
      setCurrency(DEFAULT_CURRENCY);
    }
  };

  const formatPrice = (amount: number) => {
    // Avoid SSR hydration issues by returning a static fallback during SSR
    const activeConfig = mounted ? currency : DEFAULT_CURRENCY;
    const formatter = new Intl.NumberFormat(activeConfig.locale, {
      style: "currency",
      currency: activeConfig.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrencyByCountry,
        formatPrice,
        isLoading: !mounted || isLoading,
        mounted,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
