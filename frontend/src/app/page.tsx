"use client";

import Image from "next/image";
import React from "react";
import text from '@/text/text';
import HomeCardsFullSection from "./homeCardSection/page";

export default function Home() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-purple-100 via-blue-50 to-white rounded-3xl shadow-2xl p-8 md:p-16 min-h-[80vh] overflow-hidden">

        {/* Image à gauche */}
        <div className="hidden md:w-full md:w-1/3 md:ml-20 md:flex md:justify-center md:justify-start mb-8 md:mb-0">
          <Image  
            src="/assets/quantum.png" 
            alt="Quantum Camp Logo" 
            width={400}
            height={400}
            className="w-60 md:w-80 object-contain"
            priority
          />
        </div>

        {/* Texte à droite */}
        <div className="flex flex-col items-center mt-20 md:mt-12 md:items-start text-center md:text-left w-full md:w-1/2 space-y-10">
          <h1 className="font-anekDeva text-5xl md:text-6xl font-extrabold leading-tight">
            {text.page.components.homePage.title}
          </h1>
          <p className="font-firaSans text-lg md:text-xl text-gray-700 max-w-lg">
            {text.page.components.homePage.description}
          </p>
          <a
            className="border border-orange-400 text-center bg-orange-200 rounded-lg md:w-1/6 p-4 hover:bg-orange-200 hover:border-orange-400 hover:text-white" 
            href={"/learn"}
          >
              {text.page.components.homePage.button}
          </a>
        </div>

      </section>

      <HomeCardsFullSection />
    </>
  );
}
