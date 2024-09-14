import React from "react";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/data";

export default function Footer() {
    return (
        <>
        <div className="absolute flex w-screen border">
            <div className="relative flex flex-col basis-1/3">
                <Link href={"/"}>
                    <Image
                        src="/assets/QuantumCamp.png"
                        alt="QuantumCamp logo"
                        width={100}
                        height={100}
                    >
                    </Image>
                </Link>
            </div>
            <div className="relative flex flex-col basis-2/3">
            {data.navigation.map((item, index) => (
                    <Link
                        key={`nav-${index}`}
                        href={`${item.href}`}
                        className="px-4 py-2 text-black cursor-pointer" 
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            <div className="relative flex flex-col basis-3/3">
            {data.account.map((item, index) => (
                    <Link
                        key={`nav-${index}`}
                        href={`${item.href}`}
                        className="px-4 py-2 text-black cursor-pointer" 
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
        </>
    )
};