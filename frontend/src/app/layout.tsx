import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import '@/fontawesomeconfig';
import ClientLayout from "@/components/ClientLayout"; // Nouveau composant pour gérer le rendu côté client

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quantum Camp",
  description: "Learn quantum computing the easy way",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}