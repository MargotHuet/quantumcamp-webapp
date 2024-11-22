import React from "react";
import text from "../../text/text";

export default function About(): JSX.Element {
    return (
        <div className="bg-creamWhite flex flex-col items-center justify-start min-h-screen py-12 px-8 text-center">
            {/* Conteneur avec texte raccourci */}
            <div className="w-full max-w-screen-sm laptop:max-w-screen-md desktop:max-w-4xl mx-auto">
                <p className="text-4xl font-extrabold mb-20">{text.page.components.about.title1}</p>
                <p className="text-lg mb-16">{text.page.components.about.text1}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.about.title2}</p>
                <p className="text-lg">{text.page.components.about.text2}</p>
            </div>
        </div>
    );
}
