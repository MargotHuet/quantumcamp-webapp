import React from "react";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/data";

export default function Footer() {
    return (
        <div className="relative flex items-center h-16 px-4 w-full desktop:h-24 hidden mx-auto md:flex desktop:w-3/4"> {/* Utilisation de flex uniquement pour les éléments enfants */}
            <div className="mr-8"> {/* Section logo alignée à gauche */}
                <Link href={"/"}>
                    <Image
                        src="/assets/QuantumCamp.png"
                        alt="QuantumCamp logo"
                        width={100}
                        height={100}
                    />
                </Link>
            </div>
            <div className="flex flex-wrap md:flex-row items-start space-x-4"> {/* Alignement strictement à gauche pour les liens */}
                {data.navigation.map((item, index) => (
                    <Link
                        key={`nav-${index}`}
                        href={`${item.href}`}
                        className="text-black cursor-pointer" 
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};
