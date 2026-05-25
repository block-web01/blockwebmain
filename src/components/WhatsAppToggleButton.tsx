"use client";

import Link from "next/link";

export default function WhatsAppToggleButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919939580371";
  const message = encodeURIComponent("Hi, I would like to discuss about a Project...😊");
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-500 transition-colors"
    >
      Lets Chat
    </Link>
  );
}
