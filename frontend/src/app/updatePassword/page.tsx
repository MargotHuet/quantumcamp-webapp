'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setMessage('Vous pouvez maintenant définir un nouveau mot de passe.');
      }
    });
  }, []);

  const handlePasswordUpdate = async () => {
    if (!password) {
      setError('Veuillez entrer un mot de passe.');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setMessage('Mot de passe mis à jour avec succès. Vous pouvez maintenant vous connecter.');
      setPassword('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    }
  };

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
  );
}
