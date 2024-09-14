import React from "react";
import PricingCard from "@/components/pricingCard";

export default function Pricing() {
    return (
        <>
        <div className="flex flex-col items-center bg-black p-4">
            <div className="mb-2 mt-12 text-center">
                <h1 className="mb-4 text-7xl font-black text-white">Pricing</h1>
                <p>Choose the right pricing for your needs and get started.</p>
            </div>
            <div className="flex flex-row gap-8 px-10">
                <PricingCard 
                    name="Free"
                    description="Learn for free"
                    color="#78E3CF"
                    price={0}
                    features={[ 'Free courses', 'Hello', 'Bye']}
                    buttonText= {"Get Started"}
                />
                <PricingCard 
                    name="Premium"
                    description="Learn and earn a certification"
                    color="#78E3CF"
                    price={10}
                    features={[ "All courses", "Hello", "Bye"]}
                    buttonText= {"Get Started"}/>
            </div>
        </div>
        </>
    )
};