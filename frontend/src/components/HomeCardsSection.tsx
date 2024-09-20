import React from "react";

interface HomeCardsProps {
    name: string,
    description: string,
    color: string,
}

export default function HomeCardsSection({name, description, color}: HomeCardsProps) {
    return (
        <div 
            style={{ backgroundColor: color}}
            className="flex flex-col md:flex-row w-[280px] md:min-h-[100px] md:w-[150px] rounded-3xl p-8 mx-auto mb-5"
        >
            <h2 className="mb-5 text-xl font-medium md:w-1/3">{name}</h2>
            <div className="mb-5 flex items-end text-6xl font-black md:w-1/3">
                {/* Place content here if needed */}
            </div>
            <p className="mb-5 md:w-1/3">{description}</p>
        </div>
    )
}
