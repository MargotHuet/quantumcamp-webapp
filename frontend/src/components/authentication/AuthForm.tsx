import React from "react";
import Link from "next/link";

export default function AuthForm() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 py-8 md:px-10 md:py-12">
      <div className="w-full max-w-md bg-almostWhite rounded-2xl shadow-lg p-8 md:p-10 space-y-6 border border-gray-100">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenue sur <span className="text-blue-500">QuantumCamp</span></h1>
          <p className="text-sm text-gray-500">Connectez-vous ou créez un compte pour accéder à la plateforme.</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/signup"
            className="block w-full text-center bg-blue-500 hover:bg-blueBg text-white font-medium py-3 rounded-lg transition duration-150"
          >
            S'inscrire
          </Link>

          <div className="flex items-center gap-2 text-gray-400 text-sm justify-center">
            <span className="h-px w-12 bg-gray-200"></span>
            ou
            <span className="h-px w-12 bg-gray-200"></span>
          </div>

          <Link
            href="/login"
            className="block w-full text-center border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 rounded-lg transition duration-150"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
