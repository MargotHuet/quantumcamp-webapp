import React from "react";

interface PricingCardProps {
    name: string,
    description: string,
    buttonText?: string,
    price: number,
    color: string,
    features?: string[],
}

export default function PricingCard({name, description, price, color, features, buttonText = 'Start trial'}: PricingCardProps) {
    return (
        <>
            <div 
                style={{ backgroundColor: color}}
                className="flex min-h-[428px] w-[320px] flex-col rounded-3xl p-8"
            >
                <h2 className="mb-5 text-xl font-medium">{name}</h2>
                <div className="mb-5 flex items-end text-6xl font-black">
                    <div>${price}</div>
                </div>
                <p className="mb-5">{description}</p>
                <ul className="mb-10 flex flex-col gap-y-2">
                    {features?.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                className="mr-3 h-7 w-7"
                                stroke="#000000" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
                <button className="mt-auto rounded-xl bg-black py-3 px-6 text-lg font-medium text-white">
                    {buttonText}
                </button>
            </div>
        </>
    )
}