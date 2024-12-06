import type { Metadata } from "next";
import "./globals.css";
import React, { Suspense } from "react";
import '@/fontawesomeconfig';
import ClientLayout from "@/components/ClientLayout"; 

export const metadata: Metadata = {
  title: "Quantum Camp",
  description: "Apprennez l'informatique quantique facilement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, sans-serif' }}>
        <ClientLayout>
          <Suspense fallback={<div>Chargement...</div>}>
            {children}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
