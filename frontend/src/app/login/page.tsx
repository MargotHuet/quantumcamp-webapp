'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modals";
import { useTranslation } from 'next-i18next';

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: ''
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
    
        try {
            const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
            const response = await fetch(`${apiUrl}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",  
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur inconnue");
    
            router.push('/profile'); 
        } catch (error) {
            setError("Email ou mot de passe incorrects.");
            setMessage("");
            setOpen(true);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col desktop:flex-row h-screen">
                    {/* Desktop view logo */}
                    <div className="hidden desktop:flex relative bg-blue-200 w-2/5 h-full flex-col justify-center items-center">
                    <Link href={"/"}>
                        <Image
                            src="/assets/QuantumCamp.png"
                            alt="QuantumCamp logo"
                            width={300}
                            height={300}
                            className="desktop:w-auto desktop:h-auto"
                        />
                    </Link>
                    </div>
                    {/* Form */}
                    <div className="flex flex-col h-screen w-full items-center py-44 desktop:w-3/5 desktop:h-5/6 desktop:justify-center">

                    {/* Mobile logo centré au-dessus du texte */}
                     <div className="desktop:hidden mb-6">
                        <Link href={"/"}>
                            <Image
                                src="/assets/QuantumCamp.png"
                                alt="QuantumCamp logo, returning home page"
                                width={120}
                                height={120}
                                className="mx-auto"
                            />
                        </Link>
                        </div>
                        <div className="text-center desktop:text-left mb-2">
                            <h1 className="text-xl desktop:text-lg font-firaSans">{t('auth.welcomeBack')}</h1>
                            <p className="text-2xl desktop:text-4xl font-firaSans">{t('auth.signIn')}</p>
                        </div>

                        <div className="mb-6 text-center desktop:text-left">
                            <p className="text-sm text-gray-600 font-anekDeva">
                                {t('auth.noAccount')}
                                <Link href={"/signup"} className="text-blue-500 font-bold">
                                    {' '}{t('auth.signUp')}
                                </Link>
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 w-8/12 max-w-sm">
                            <label className="text-md font-firaSans">{t('auth.email')}</label>
                            <input
                                className="bg-blueBg w-full h-10 px-2"
                                type="text"
                                name="email"
                                placeholder={t('auth.email')}
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                            <label className="text-md font-firaSans">{t('auth.password')}</label>
                            <input
                                className="bg-blueBg w-full h-10 px-2"
                                type="password"
                                name="password"
                                placeholder={t('auth.password')}
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                            <div className="text-xs font-anekDeva text-blue-500 text-right">
                                <Link href="/forgotPassword">{t('auth.forgotPassword')}</Link>
                            </div>
                            <button
                                className="text-md font-firaSans border border-orange-500 bg-orange-100 mt-2 rounded-md py-2"
                                type="submit"
                            >
                                {t('auth.login')}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <Modal open={open} onClose={() => setOpen(false)}>
                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}
            </Modal>
        </>
    );
}
