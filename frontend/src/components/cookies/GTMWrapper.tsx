// src/components/cookies/GTMWrapper.tsx
'use client';

import { GTM } from "./GTM";
import React, { useEffect, useState } from "react";

export function GTMWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <GTM />;
}
