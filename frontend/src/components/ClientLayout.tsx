"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noNavAndFooter = ["/login", "/signup"].includes(pathname);

  return (
    <>
      {!noNavAndFooter && <Navbar />}
      {children}
      {!noNavAndFooter && <Footer />}
    </>
  );
}
