'use client';
import React, { useState, useEffect } from 'react';
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
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await fetch(`${apiUrl}/users/verify-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken, refreshToken }),
        });

        if (!response.ok) {
          throw new Error('Impossible de valider la session. Veuillez réessayer.');
        }

        setMessage('Token vérifié. Vous pouvez mettre à jour votre mot de passe.');
      } catch (err: any) {
        setError(err.message || 'Une erreur est survenue.');
      }
    };

    verifyToken();
  }, [searchParams]);

  const handlePasswordUpdate = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      const response = await fetch(`${apiUrl}/users/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Une erreur est survenue lors de la mise à jour du mot de passe.');
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
