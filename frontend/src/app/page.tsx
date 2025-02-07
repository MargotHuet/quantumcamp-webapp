"use client";
import Image from "next/image";
import React   from "react";
import text from '@/text/text';
import HomeCardsFullSection from "./homeCardSection/page"
import Pricing from "./pricing/page";

// Landing page
export default function Home() {

  return (
    <>
      <div className="flex flex-col md:flex-row bg-gradient-radial from-purple-200 via-blue-100 to-white">
      <div className="hidden lg:flex w-full lg:w-1/2 justify-start">
          <Image  
            src="/assets/atom.jpg" 
            alt="Landing Page" 
            width={300}
            height={300}
            className="w-[300px] h-[300px]"
          />
        </div>
        <div className="">
          <h1 className="font-anekDeva text-4xl lg:text-5xl font-bold p-4 md:py-4">{text.page.components.homePage.title}</h1>
          <p className="w-full md:w-1/2 font-firaSans text-lg md:text-xl p-4 md:py-8">{text.page.components.homePage.description}</p>
         <div className="flex flex-col items-center md:items-start md:px-4">
          <a
            className="border border-orange-300 text-center bg-orange-100 rounded-lg md:w-1/6 p-4 hover:bg-orange-200 hover:border-orange-400 hover:text-white" 
            href={"/learn"}
          >
              {text.page.components.homePage.button}
          </a>
          </div>
        </div>
      </div>
      <HomeCardsFullSection />
    </>
  );
};