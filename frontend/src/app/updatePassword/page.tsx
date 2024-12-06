'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../clientSupabase';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');

      if (!accessToken || !refreshToken) {
        setError('Le lien est invalide ou expiré. Veuillez demander une nouvelle réinitialisation.');
        return; // Pas de redirection immédiate
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        setError('Impossible de valider la session. Veuillez réessayer.');
      }
    };

    verifyToken();
  }, [searchParams]);

  const handlePasswordUpdate = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setMessage('Mot de passe mis à jour avec succès. Vous pouvez maintenant vous connecter.');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div>
      <h1>Saisissez un nouveau mot de passe</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={() => router.push('/')}>Retour à l&apos;accueil</button>
        </div>
      )}
      {!error && (
        <>
          <input
            type="password"
            placeholder="Entrez votre nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordUpdate}>Mettre à jour</button>
        </>
      )}
    </div>
  );
}
