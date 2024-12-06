import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import data from "../data/data";
import { supabase } from "../../clientSupabase";
import { Session } from "@supabase/supabase-js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    // Gérer les mises à jour de session (connexion / déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe(); // Nettoyage du listener quand le composant est démonté
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null); // Mise à jour de l'état après déconnexion
    closeMenu();
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
          {data.navigation.map((item, index) => (
            <Link
              key={`nav-${index}`}
              href={`/${item.href}`}
              className="px-4 py-2 text-black cursor-pointer"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 w-full lg:w-auto">
          {session ? (
            <>
              <Link href="/profile" className="px-4 py-2 text-black cursor-pointer" onClick={closeMenu}>
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500 bg-red-100 text-black rounded-lg hover:bg-red-200"
              >
                Déconnexion
              </button>
            </>
          ) : (
            data.account.map((item, index) => (
              <Link
                key={`account-${index}`}
                href={`/${item.href}`}
                className={`px-4 py-2 ${
                  item.href === "signup"
                    ? "border border-sky-500 bg-blue-100 text-black rounded-lg hover:bg-blue-200 hover:border-sky-600 hover:text-white"
                    : "text-black"
                } cursor-pointer`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
