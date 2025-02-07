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
            <div className="grid grid-flow-col grid-rows-3 gap-4 lg:items-center lg:justify-center lg:pl-12">
                <div className="row-span-2 row-start-2">
                    <HomeCardsSection 
                        name=""
                        description="Dépasser les limites des ordinateurs classiques"
                        color="#e4d2fc"
                    />
                </div>
                <div className="row-span-2 row-end-3">
                    <HomeCardsSection 
                        name=""
                        description="Opportunités de carrière en pleine expansion"
                        color="#e4d2fc"
                    />
                </div>
                <div className="row-start-1 row-end-4">
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
