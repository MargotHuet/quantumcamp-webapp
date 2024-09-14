"use client";
import Image from "next/image";
import React   from "react";
import text from '@/text/text';

// Landing page
export default function Home() {

  return (
    <>
      <div className="relative h-screen w-full ">
        <div className="absolute flex justify-end right-36 bottom-56">
          <Image  
            src="/assets/atom.jpg" 
            alt="Landing Page" 
            width={380}
            height={380} 
          />
        </div>
        <div className="absolute flex flex-items flex-col flex-start p-28">
          <h1 className="font-anekDeva text-5xl font-bold py-4">{text.page.components.homePage.title}</h1>
          <p className="w-1/2 font-firaSans text-xl py-8">{text.page.components.homePage.description}</p>
          <a
            className="border border-orange-300 text-center bg-orange-100 rounded-lg w-1/6 p-2 hover:bg-orange-200 hover:border-orange-400 hover:text-white" 
            href={"/learn"}
          >
              {text.page.components.homePage.button}
          </a>
        </div>
      </div>
    </>
  );
};