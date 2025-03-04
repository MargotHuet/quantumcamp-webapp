'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/account`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();
        if (data.user?.id) {
          setUserId(data.user.id);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    };

    fetchUserData();
  }, [apiUrl, router]);

  const handlePasswordUpdate = async () => {
    if (!password) {
      setError('Veuillez entrer un mot de passe.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la sauvegarde du nouveau mot de passe.");
      }
  
      setMessage('Mot de passe mis à jour avec succès. Vous pouvez maintenant vous connecter.');
      setPassword('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    }
  };

  if (!userId) {
    return (
      <section className="bg-creamWhite flex flex-col justify-center items-center min-h-screen">
        <div className="mx-auto bg-blueBg p-4 rounded-lg shadow-lg space-y-8">
          <p>Vous devez être connecté pour voir cette page.</p>
        </div>
      </section>
    );
  }

  return (
    <div className='flex flex-col h-screen text-md font-anekDeva items-center justify-start md:justify-center md:py-46 lg:justify-center lg:h-2/6 px-4 py-64'>
      <h1 className="w-3/4 lg:w-1/6">Réinitialiser votre mot de passe</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        className='bg-blue-200 w-80 h-10 my-6 px-2'
        type="password"
        placeholder="Entrez un nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        onClick={handlePasswordUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Mettre à jour
      </button>
    </div> 
  )
}