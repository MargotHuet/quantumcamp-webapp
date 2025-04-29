import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import '@/fontawesomeconfig';
import { GTMWrapper } from "@/components/cookies/GTMWrapper";

export const metadata: Metadata = {
  title: "Quantum Camp",
  description: "Apprenez l'informatique quantique facilement.",
  icons: {
    icon: "/assets/quantum.png",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body style={{ fontFamily: 'Inter, sans-serif' }}>
        <GTMWrapper /> {/* C'est un composant client */}
        <ClientLayout>
          <Suspense fallback={<div>Chargement...</div>}>
            {children}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
