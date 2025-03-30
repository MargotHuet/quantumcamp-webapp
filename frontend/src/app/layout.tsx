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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hasConsent = useConsent()
  return (
    <html lang="fr">
      <head>
        {hasConsent && (
          <>
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-TPVMTZQ4');f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-XXXXXXX');
              `,
              }}
            />
          </>
        )}
      </head>
      <body style={{ fontFamily: 'Inter, sans-serif' }}>
        {hasConsent && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TPVMTZQ4"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        )}

        <ClientLayout>
          <Suspense fallback={<div>Chargement...</div>}>
            {children}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}



