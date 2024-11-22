'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../clientSupabase";
import { Session } from "@supabase/supabase-js"; 

interface UserData {
  name: string,
  email: string
}

export default function Profile() {
    const [session, setSession] = useState<Session | null>(null); 
    const [userData, setUserData] = useState<UserData | null>(null);
    const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();
   })

   useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if(user) {
        setUserData({
          name: user.user_metadata.name || 'N/A',
          email: user.email || 'N/A'
        });
      }
    }

    getUserData();
   })

   const handleRedirection = () => {
    router.push("/");
   }

   const handleDeleteAccount = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  
        // Obtenir le token JWT de la session actuelle
        const { data: { session } } = await supabase.auth.getSession();
  
        if (!session) {
          throw new Error('Session missing or user not logged in');
        }
  
        const response = await fetch(`${apiUrl}/users/delete-user`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`, // Ajouter le token JWT
          }
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de la suppression du compte');
        }
  
        alert("Compte supprimé avec succès.");
        // Redirection
        handleRedirection();
      } catch (error) {
        console.error("Erreur lors de la suppression du compte:", error);
      }
    }
  };
  
  
   
    return (
        <>
            {session ? (
            <>
            <section className="bg-creamWhite flex flex-col justify-center items-center min-h-screen">
              <p>User profile page</p>
              <div className="mx-auto bg-blue-500 p-4 rounded-lg shadow-lg space-y-8">
                <p>Name: {userData?.name}</p>
                <p>Email: {userData?.email}</p>
                <button
                    onClick={handleDeleteAccount}
                    className="border border-orange-300 bg-orange-100 rounded-lg w-40 p-2 hover:bg-orange-200 hover:border-orange-400 hover:text-white"
                  >
                  Supprimer votre compte  
                </button>
              </div>
            </section>
            </>
          ) : (
            <>
            <section className="bg-creamWhite flex flex-col justify-center items-center min-h-screen">
              <div className="mx-auto bg-blue-500 p-4 rounded-lg shadow-lg space-y-8">
                <p>You must be logged in to see this page&apos;s content.</p> 
              </div>
            </section>
            </>
          )}
        </>
    )
}