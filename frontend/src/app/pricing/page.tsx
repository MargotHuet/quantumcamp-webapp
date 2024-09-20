import React from "react";
import PricingCard from "@/components/pricingCard";

export default function Pricing() {
    return (
        <div className="flex flex-col items-center bg-purpleBg px-4 py-8 sm:py-12">
            <div className="mb-4 text-center">
                <h1 className="mb-4 text-5xl sm:text-5xl font-black text-black">Pricing</h1>
                <p className="text-sm sm:text-2xl">Choose the right pricing for your needs and get started.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 w-full sm:px-10 lg:w-2/3 lg:p-8">
                <PricingCard 
                    name="Free"
                    description="Learn for free"
                    color="#f5f0fc"
                    price={0}
                    features={[ 'Free courses', 'Hello', 'Bye']}
                    buttonText= {"Get Started"}
                />
                <PricingCard 
                    name="Premium"
                    description="Learn and earn a certification"
                    color="#f5f0fc"
                    price={10}
                    features={[ "All courses", "Hello", "Bye"]}
                    buttonText= {"Get Started"}
                />
            </div>
        </div>
    )
};
