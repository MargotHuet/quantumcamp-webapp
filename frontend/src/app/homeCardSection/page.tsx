"use client"
import HomeCardsSection from "@/components/HomeCardsSection"
import React from "react";
import text from "@/text/text";

export default function HomeCardFullSection() {
    return (
        <>
        <section className="bg-creamWhite pb-28">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-center text-gray-900">
                    {text.page.components.homeCardsFullSection.title}
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
                    {text.page.components.homeCardsFullSection.description}
                </p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center lg:grid lg:grid-flow-col lg:grid-rows-3 lg:gap-8 lg:items-center lg:justify-center lg:pl-32">
                <div className="lg:row-span-2 lg:row-start-2 w-1/2">
                    <HomeCardsSection 
                        name=""
                        description="Dépasser les limites des ordinateurs classiques"
                        color="#e4d2fc"
                    />
                </div>
                <div className="lg:row-span-2 lg:row-end-3 w-1/2">
                    <HomeCardsSection 
                        name=""
                        description="Opportunités de carrière en pleine expansion"
                        color="#e4d2fc"
                    />
                </div>
                <div className="lg:row-start-1 lg:row-end-4 w-1/2">
                    <HomeCardsSection 
                        name=""
                        description="Comprendre le futur de la technologie"
                        color="#e4d2fc"
                    />
                </div>
            </div>
        </section>
        </>
    )
}
