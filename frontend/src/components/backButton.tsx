"use client";
import { useRouter } from "next/navigation"; 
import React from "react";

// Should only be added to learning content.

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
      router.push("/learn");
  };

  return (
    <div className="">
      <button onClick={handleBack} className="text-xl bg-red-500 font-normal text-black pb-4 pt-2">
        ← Back
      </button>
    </div>
  );
}