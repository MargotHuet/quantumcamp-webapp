'use client';
import React, { useState } from "react";

interface ForgotPasswordData {
  email: string;
}

export default function ForgotPassword() {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      const response = await fetch(`${apiUrl}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la réinitialisation du mot de passe");
      }

      setMessage("Un email de réinitialisation a été envoyé.");
      setError(""); // Efface l'erreur si la requête réussit
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
      setMessage(""); // Efface le message de succès si la requête échoue
    }
  };

  return (
    <div className="text-lg">
      <p>Mot de passe oublié ? Saisissez votre email pour réinitialiser votre mot de passe.</p>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="bg-blue-200 w-80 h-10 my-2 px-2"
        type="email"
        name="email"
        placeholder="Adresse email"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handlePasswordReset}
      >
        Réinitialiser le mot de passe
      </button>
    </div>
  );
}
