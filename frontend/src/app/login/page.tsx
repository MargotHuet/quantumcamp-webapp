'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../../clientSupabase";
import { useRouter } from "next/navigation";
import ForgotPassword from "@/components/forgotPassword";

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter();

    const [ formData, setFormData ] = useState<LoginData>({
        email: '',
        password: ''
    })

    console.log(formData);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]:value,
        }));
      }

      async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword(
                {
                    email: formData.email,
                    password: formData.password,
                }
            )

        if (error) throw error 
            console.log(data);
            alert('you are logged in');
            router.push('/');
        }

        catch (error) {
            alert(error);
        }
      }

    return (
        <>
        <form onSubmit={handleSubmit}>
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
                        <p className="flex text-4xl font-firaSans">Connectez-vous</p>
                </div>
                <div className="absolute flex flex-col justify-end top-48 left-44">
                        <p className="text-sm text-gray-600 font-anekDeva">Vous n'avez pas de compte?<Link href={"/signup"} className="font-anekDeva text-blue-500 font-bold"> Créez le votre</Link></p>
                </div>
                <div className="absolute flex flex-col gap-4 justify-end top-72 left-44">
                    <label className="text-md font-firaSans">Email</label>
                    <input 
                        className="bg-blue-200 w-80 h-10" 
                        type="text" 
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                        required>
                    </input>
                    <label className="text-md font-firaSans">Mot de passe</label>
                    <input 
                        className="bg-blue-200 w-80 h-10" 
                        type="password" 
                        name="password"
                        placeholder="Mot de passe"
                        onChange={handleChange}
                        value={formData.password}
                        required>
                    </input>
                    <ForgotPassword />
                    <button 
                        className="text-md w-1/2 font-firaSans border border-orange-500 bg-orange-100 rounded-md"
                        type="submit"
                    >
                        Connexion
                    </button>
                </div>
            </div>
        </div>
        </form>
        </>
    )
};