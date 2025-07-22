"use client";
import { useRouter } from "next/navigation"; 
import React from "react";
import { useTranslation } from 'next-i18next';

// Should only be added to learning content.

export default function BackButton() {
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleBack = () => {
      router.push("/learn");
  };

  return (
    <div className="">
      <button onClick={handleBack} className="text-xl font-normal text-black pb-4 pt-2">
        {t('common.back')}
      </button>
    </div>
  );
}