"use client"
import React from "react";
import { motion } from "framer-motion";
import HomeCardsSection from "@/components/HomeCardsSection";
import text from "@/text/text";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default function HomeCardFullSection() {
    return (
        <section className="bg-creamWhite pb-28">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-center text-gray-900">
                    {text.page.components.homeCardsFullSection.title}
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
                    {text.page.components.homeCardsFullSection.description}
                </p>
            </div>

            <motion.div
                className="flex flex-col gap-8 items-center lg:grid lg:grid-cols-3 lg:gap-8 lg:px-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <HomeCardsSection
                    name=""
                    description="Dépasser les limites des ordinateurs classiques"
                    color="#e4d2fc"
                />
                <HomeCardsSection
                    name=""
                    description="Opportunités de carrière en pleine expansion"
                    color="#e4d2fc"
                />
                <HomeCardsSection
                    name=""
                    description="Comprendre le futur de la technologie"
                    color="#e4d2fc"
                />
            </motion.div>
        </section>
    );
}
