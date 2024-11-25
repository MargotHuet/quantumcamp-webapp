import Link from "next/link";
import React from "react";

export default function ForgotPassword() {
    return(
        <>
            <div className="bg-red-500">
                <Link href="/">Mot de passe oublié?</Link>
            </div>
        </>
    )
}