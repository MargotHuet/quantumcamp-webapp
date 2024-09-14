import React from "react";
import Link from "next/link";
import Image from "next/image";
import data from "../data/data";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between h-16 border-b-2 py-6 px-6">
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src="/assets/QuantumCamp.png"
                        alt="logo"
                        width={80}
                        height={40}
                        loading="eager"
                    />
                </Link>
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
            <div className="flex items-center space-x-4">
                {data.account.map((item, index) => {
                    const baseClass = "px-4 py-2 cursor-pointer";
                    const loginClass = "text-black";
                    const signupClass = "border border-sky-500 bg-blue-100 text-black rounded-lg hover:bg-blue-200 hover:border-sky-600 hover:text-white";

                    const itemClass = item.label.toLowerCase() === 'login' ? `${baseClass} ${loginClass}` : `${baseClass} ${signupClass}`;

                    return (
                        <Link
                            key={`account-${index}`}
                            href={`${item.href}`}
                            className={itemClass}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}