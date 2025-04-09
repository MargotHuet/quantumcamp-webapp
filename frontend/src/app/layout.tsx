import { GTM } from "@/components/cookies/GTM";
import type { Metadata } from "next";
import "./globals.css";
import React, { Suspense } from "react";
import '@/fontawesomeconfig';
import ClientLayout from "@/components/ClientLayout"; 
import { useConsent } from "@/components/cookies/useConsent";
import Script from 'next/script'


export const metadata: Metadata = {
  title: "Quantum Camp",
  description: "Apprennez l'informatique quantique facilement.",
  icons: {
    icon: "/assets/quantum.png",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hasConsent = useConsent()
  return (
    <html lang="fr">
      <head>
      <link rel="icon" type="image/png" href="/public/assets/favicon.png" />
     </head>
      <body style={{ fontFamily: 'Inter, sans-serif' }}>
        <GTM />
        <ClientLayout>
          <Suspense fallback={<div>Chargement...</div>}>
            {children}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}



