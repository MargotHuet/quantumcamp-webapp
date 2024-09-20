import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import '@/fontawesomeconfig';
import ClientLayout from "@/components/ClientLayout"; 


export const metadata: Metadata = {
  title: "Quantum Camp",
  description: "Learn quantum computing the easy way",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, sans-serif' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
