import React from "react";

interface HomeCardsProps {
    name: string,
    description: string,
    color: string,
}

export default function HomeCardsSection({ name, description, color }: HomeCardsProps) {
    return (
        <div 
            style={{ backgroundColor: color }}
            className="flex flex-col items-center justify-between w-full rounded-3xl p-8 md:flex-row md:w-4/4"
        >
            <h2 className="mb-5 text-xl font-medium">{name}</h2>
            <p className="mb-5">{description}</p>
        </div>
    );
}
