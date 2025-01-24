'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../clientSupabase";
import { Session } from "@supabase/supabase-js"; 
import UserCompletedChapters from "@/components/UserCompletedChapters";
import Modal from "@/components/Modals";

interface UserData {
  name: string;
  email: string;
}

export default function Profile() {
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Récupérer la session utilisateur
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();
  }, []);

  // Récupérer les données utilisateur
  useEffect(() => {
    if (session) {
      const getUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserData({
            name: user.user_metadata?.name || "N/A",
            email: user.email || "N/A",
          });
        }
      };

      getUserData();
    }
  }, [session]);

  // Supprimer le compte utilisateur
  const handleDeleteAccount = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

      // Obtenir la session pour obtenir le token JWT
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Session missing or user not logged in");
      }

      // Appeler l'API pour supprimer l'utilisateur
      const response = await fetch(`${apiUrl}/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la suppression du compte");
      }

      // Déconnecter l'utilisateur et rediriger
      await supabase.auth.signOut();
      setSession(null);
      router.push("/signup");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
      alert("Une erreur est survenue lors de la suppression du compte.");
    }
  };

  if (loading) {
    return (
      <section className="bg-creamWhite flex flex-col justify-center items-center min-h-screen">
        <div className="mx-auto bg-blueBg p-4 rounded-lg shadow-lg space-y-8">
          <p>Chargement...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {session ? (
        <section className="bg-creamWhite flex flex-col items-center relative pt-4" style={{ minHeight: "100vh" }}>
          <p className="tracking-tight font-extrabold text-gray-900 text-4xl text-center w-full mb-6 mt-12">
            {userData?.name}
          </p>
          <div
            className="bg-none md:bg-blueBg p-6 rounded-lg md:shadow-lg space-y-6 w-full max-w-md"
            style={{ position: "relative", top: "4vh" }}
          >
            <p>Nom : {userData?.name}</p>
            <p>Email : {userData?.email}</p>
            <UserCompletedChapters userId={session.user.id} />
            <button
              onClick={() => router.push('/updatePassword')}
              className="border border-orange-300 bg-orange-100 rounded-lg w-full p-2 hover:bg-orange-200 hover:border-orange-400 hover:text-white"
            >
              Modifier le mot de passe
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="border border-orange-300 bg-orange-100 rounded-lg w-full p-2 hover:bg-orange-200 hover:border-orange-400 hover:text-white"
            >
              Supprimer votre compte
            </button>
          </div>
        </section>
      ) : (
        <section className="bg-creamWhite flex flex-col justify-center items-center min-h-screen">
          <div className="mx-auto bg-blueBg p-4 rounded-lg shadow-lg space-y-8">
            <p>Vous devez être connecté pour voir cette page.</p>
          </div>
        </section>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <p className="text-center mb-4">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et vos données seront perdues.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Confirmer
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </Modal>
    </>
  );
}
