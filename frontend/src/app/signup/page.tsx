'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fonction pour évaluer la force du mot de passe
  function evaluatePasswordStrength(password: string) {
    let strength = 0;

    if (password.length >= 12) strength += 1; // Longueur minimale
    if (/[A-Z]/.test(password)) strength += 1; // Une majuscule
    if (/[a-z]/.test(password)) strength += 1; // Une minuscule
    if (/\d/.test(password)) strength += 1; // Un chiffre
    if (/[!@#$%^&*()_\-+={}[\]:;"'<>,.?/\\|~`]/.test(password)) strength += 1; // Un caractère spécial

    setPasswordStrength(strength);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (passwordStrength < 5) {
      setError("Le mot de passe doit contenir au minimum 12 caractères dont majuscules, miniscules, chiffres et caractères spéciaux.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    await handleUserSignup();
  }

  async function handleUserSignup() {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          name: formData.name,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création du compte.");
      }

      // Succès
      setMessage(data.message || "Votre compte a été créé avec succès.");
      setError(""); // Efface les erreurs
      setTimeout(() => {
        router.push("/login"); // Redirige l'utilisateur vers la page de connexion
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
      setMessage(""); // Efface le message de succès en cas d'erreur
    }
  }

  // Obtenir la couleur de la jauge
  function getStrengthColor() {
    switch (passwordStrength) {
      case 0: return "bg-gray-200";
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-400";
      case 4: return "bg-blue-500";
      case 5: return "bg-green-500";
      default: return "bg-gray-200";
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex h-screen">
          <div className="relative bg-blue-200 w-2/5">
            <div className="absolute flex justify-start top-24">
              <Link href={"/"}>
                <Image
                  src="/assets/QuantumCamp.png"
                  alt="QuantumCamp logo"
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
          </div>
          <div className="relative w-3/5">
            <div className="absolute flex flex-col gap-6 justify-end top-24 left-44">
              <p className="flex text-4xl font-firaSans">Créez votre compte</p>
            </div>
            <div className="absolute flex flex-col justify-end top-36 left-44">
              <p className="text-sm text-gray-600 font-anekDeva">
                Vous avez déjà un compte?
                <Link href={"/login"} className="font-anekDeva text-blue-500 px-2 font-bold">Connexion</Link>
              </p>
            </div>
            <div className="absolute flex flex-col gap-2 justify-end top-52 left-44">
              <label className="text-md font-firaSans">Prénom</label>
              <input
                className="bg-blue-200 w-80 h-10"
                type="text"
                name="name"
                placeholder="Prénom"
                onChange={handleChange}
                value={formData.name}
                required
              />
              <label className="text-md font-firaSans">Email</label>
              <input
                className="bg-blue-200 w-80 h-10"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              <label className="text-md font-firaSans">Mot de passe</label>
              <input
                className="bg-blue-200 w-80 h-10"
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                value={formData.password}
                required
              />
              {/* Jauge de force du mot de passe */}
              <div className="w-80 h-2 mt-2 rounded-md bg-gray-200">
                <div
                  className={`h-2 rounded-md transition-all ${getStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Force : {["Très faible", "Faible", "Moyenne", "Bonne", "Très bonne"][passwordStrength]}
              </p>
              <label className="text-md font-firaSans mt-2">Confirmez votre mot de passe</label>
              <input
                className="bg-blue-200 w-80 h-10"
                type="password"
                name="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                onChange={handleChange}
                value={formData.confirmPassword}
                required
              />
              <div className="flex items-start mt-2">
                <input
                  className="mt-1"
                  type="checkbox"
                  id="terms"
                  required
                />
                <label htmlFor="terms" className="text-sm ml-2">
                  En vous inscrivant, vous acceptez les{" "} <br />
                  <Link
                    href="/cgu"
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    conditions générales d&apos;utilisation
                  </Link>.
                </label>
              </div>
              <button
                className="text-md w-1/2 font-firaSans border border-orange-500 bg-orange-100 mt-4 rounded-md"
                type="submit"
              >
                Inscription
              </button>
              {message && <p className="text-green-500 mt-4">{message}</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
