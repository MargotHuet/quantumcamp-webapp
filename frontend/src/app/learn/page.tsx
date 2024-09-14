import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import text from "@/text/text";

export default function Learn() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center bg-light-blue rounded-lg mx-10 my-8 h-[650px]">
        <div className="absolute top-8 left-20">
         {/* <button>← Back</button> */}
        </div>
        <h1 className="absolute top-28 left-20 font-anekDeva text-3xl">Summary</h1>
        <div className="flex flex-col items-center justify-center bg-blue-500 rounded-lg p-6 text-center">
          <Link href="/learn/1" className="cursor-pointer hover:text-white">
            <div className="flex items-center justify-between w-full">
              <h1 className="font-firaSans text-3xl px-4">Chapitre 1 :  {text.page.components.sommaire.chapter}</h1>
              <FontAwesomeIcon 
                icon={faCircleCheck}
                width={26}
                height={26}
                color="green" 
              />
            </div>
          </Link>
          <p>Sous chapitre: {text.page.components.sommaire.sousChapitre}</p>
          <p>Sous chapitre: {text.page.components.sommaire.sousChapitre2}</p>
        </div>
      </div>
    </>
  );
}