"use client"
import HomeCardsSection from "@/components/HomeCardsSection"
import React from "react";
import text from "@/text/text";


export default function HomeCardFullSection() {
    return (
        <>
        <section className="bg-creamWhite">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-center text-gray-900">{text.page.components.homeCardsFullSection.title}</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">{text.page.components.homeCardsFullSection.description}</p>
            </div>
            <HomeCardsSection 
                name="Lorem"
                description="Learn and earn a certification"
                color="#e4d2fc"
            />
            <HomeCardsSection 
                name="Lorem"
                description="Learn and earn a certification"
                color="#e4d2fc"
            />
            <HomeCardsSection 
                name="Lorem"
                description="Learn and earn a certification"
                color="#e4d2fc"
            />
        </section>
        </>
    )
}