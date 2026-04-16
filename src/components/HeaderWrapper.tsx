"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div className="h-16" />,
  ssr: false,
});

export default function HeaderWrapper() {
  return <Header />;
}
