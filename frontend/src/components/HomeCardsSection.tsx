import { motion } from "framer-motion";
import React from "react";

interface HomeCardsProps {
    name: string;
    description: string;
    color: string;
}

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomeCardsSection({ name, description, color }: HomeCardsProps) {
    return (
        <motion.div
            style={{ backgroundColor: color }}
            className="w-[80%] max-w-4xl lg:w-full lg:h-80 rounded-3xl p-8 flex items-center justify-center"
            variants={cardVariants}
        >
            <p className="text-center text-xl lg:text-2xl">{description}</p>
        </motion.div>
    );
}
