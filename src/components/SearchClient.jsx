"use client";

import { useSearchParams } from "next/navigation";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return <div>Query: {query}</div>;
}