import React from "react";
import PricingCard from "@/components/pricingCard";

export default function Pricing() {
    return (
        <div className="flex flex-col items-center bg-creamWhite px-4 py-8 sm:py-12 min-h-screen">
            <div className="mb-4 text-center">
                <h1 className="mb-4 text-5xl sm:text-5xl font-black text-black">Tarifs</h1>
                <p className="text-sm sm:text-2xl">Choisissez la formule qui répond à vos besoins.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 w-full sm:px-10 lg:w-2/3 lg:p-8">
                <PricingCard 
                    name="Gratuit"
                    description="Apprenez gratuitement"
                    color="#e4d2fc"
                    price={0}
                    features={[ 'Accès gratuit' ]}
                    buttonText= {"Get Started"}
                />
                <PricingCard 
                    name="Premium"
                    description="Apprenez et obtenez une certification"
                    color="#e4d2fc"
                    price={10}
                    features={[ "Tous les cours"]}
                    buttonText= {"Get Started"}
                />
            </div>
        </div>
    )
};
