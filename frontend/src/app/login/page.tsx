import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <>
        <div className="flex h-screen">
            <div className="relative bg-blue-200 w-2/5">
                <div className="absolute flex justify-start top-24">
                    <Link href={"/"}>
                        <Image
                            src="/assets/QuantumCamp.png"
                            alt="QuantumCamp logo"
                            width={1000}
                            height={1000}
                        />
                    </Link>
                </div>
            </div>
            <div className="relative w-3/5">
                <div className="absolute flex flex-col gap-6 justify-end top-24 left-44">
                        <h1 className="flex text-lg font-firaSans">Welcome back !</h1>
                        <p className="flex text-4xl font-firaSans">Join to your account</p>
                </div>
                <div className="absolute flex flex-col justify-end top-48 left-44">
                        <p className="text-sm text-gray-600 font-anekDeva">Don&apos;t have an account?<Link href={"/signup"} className="font-anekDeva text-blue-500 font-bold"> Create your account</Link></p>
                </div>
                <div className="absolute flex flex-col gap-4 justify-end top-72 left-44">
                    <label className="text-md font-firaSans">Email</label>
                    <input className="bg-blue-200 w-80 h-10" type="text" required></input>
                    <label className="text-md font-firaSans">Password</label>
                    <input className="bg-blue-200 w-80 h-10" type="password" required></input>
                    <button className="text-md w-1/2 font-firaSans border border-orange-500 bg-orange-100 rounded-md">Login</button>
                </div>
            </div>
        </div>
        </>
    )
};