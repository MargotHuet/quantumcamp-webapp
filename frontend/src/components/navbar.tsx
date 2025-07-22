import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from 'next-i18next';

export default function Navbar() {
  const { t } = useTranslation('common');
  const [user, setUser] = useState<{ id: string; name?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
      const checkAuth = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
          const response = await fetch(`${apiUrl}/users/check-auth`, {
            credentials: "include",
          });
    
          if (response.ok) {
            setUser({ id: "authenticated" });
          } else {
            setUser(null);
          }
        } catch (error) {
          setUser(null);
        }
      };
    
      checkAuth();
    }, []);



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      await fetch(`${apiUrl}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
  
      setUser(null);
      closeMenu();
      router.push("/login");
    } catch (error) {
      throw new Error("Erreur lors de la déconnexion.");
    }
  };
  

  return (
    <div className="relative flex items-center justify-between h-16 border-b-2 py-6 px-6 w-full md:w-4/5 lg:w-3/4 mx-auto">
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
      </div>
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className={`lg:flex ${menuOpen ? "block" : "hidden"} absolute lg:relative top-16 left-0 lg:top-auto lg:left-auto w-full lg:w-auto bg-white lg:bg-transparent z-10`}>
        <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
          <Link href="/learn" className="px-4 py-2 text-black cursor-pointer" onClick={closeMenu}>
            {t('navigation.learn')}
          </Link>
          <Link href="/pricing" className="px-4 py-2 text-black cursor-pointer" onClick={closeMenu}>
            {t('navigation.pricing')}
          </Link>
          <Link href="/blog" className="px-4 py-2 text-black cursor-pointer" onClick={closeMenu}>
            {t('navigation.blog')}
          </Link>
          <Link href="/about" className="px-4 py-2 text-black cursor-pointer" onClick={closeMenu}>
            {t('navigation.about')}
          </Link>
          <Link href="/contact" className="px-4 py-2 text-black cursor-pointer" onClick={closeMenu}>
            {t('navigation.contact')}
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 w-full lg:w-auto">
          {user ? (
            <>
              <Link href="/profile" className="px-4 py-2 text-black cursor-pointer" onClick={closeMenu}>
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500 bg-red-100 text-black rounded-lg hover:bg-red-200"
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 text-black cursor-pointer" onClick={closeMenu}>
                {t('navigation.login')}
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 border border-sky-500 bg-blue-100 text-black rounded-lg hover:bg-blue-200 hover:border-sky-600 hover:text-white cursor-pointer" 
                onClick={closeMenu}
              >
                {t('navigation.signup')}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
