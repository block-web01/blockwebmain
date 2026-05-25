"use client";

import Link from "next/link";

export default function FloatingWhatsAppButton() {
  const href = "https://wa.me/919939580371?text=Hi%2C%20I%20have%20a%20project%20idea%20can%20we%20discuss%20about%20this%20%3F";
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 overflow-hidden glossy-btn"
    >
      {/* simple WhatsApp icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .02 5.35.02 12c0 2.12.55 4.13 1.53 5.88L0 24l6.26-1.64A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12a11.94 11.94 0 00-3.48-8.52zM12 22c-2.33 0-4.5-.64-6.36-1.74l-.45-.27-3.72 1 1-3.64-.28-.46A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z" />
        <path d="M16.59 13.34c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.64.14-.19.28-.73.91-.9 1.09-.17.19-.34.21-.62.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.64-1.55-.88-2.12-.24-.57-.48-.5-.64-.51-.16 0-.35-.02-.54-.02-.19 0-.5.07-.76.35-.26.28-1.01 1-1.01 2.44 0 1.44 1.05 2.84 1.19 3.04.14.19 2.07 3.2 5.02 4.48.7.3 1.25.48 1.68.61.7.23 1.34.2 1.85.12.56-.09 1.66-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.54-.33z" />
      </svg>
    </Link>
  );
}
