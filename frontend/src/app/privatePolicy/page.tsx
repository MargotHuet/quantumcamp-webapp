import React from "react";
import text from "../../text/text";

export default function About(): JSX.Element {
    return (
        <div className="bg-creamWhite flex flex-col items-center justify-start min-h-screen py-12 px-8 text-center">
            <div className="w-full max-w-screen-sm laptop:max-w-screen-md desktop:max-w-4xl mx-auto">
                <p className="text-4xl font-extrabold mb-20">{text.page.components.privacyPolicy.mainTitle}</p>
                <p className="text-lg mb-16">{text.page.components.privacyPolicy.introduction}</p>
                <p className="text-4xl font-extrabold mb-20">{text.page.components.privacyPolicy.title1}</p>
                <p className="text-lg mb-16">{text.page.components.privacyPolicy.content1}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title2}</p>
                <p className="text-lg mb-20 ">{text.page.components.privacyPolicy.content2}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title3}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content3}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title4}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content4}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title5}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content5}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title6}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content6}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title7}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content7}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title8}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content8}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title9}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content9}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title10}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content10}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.privacyPolicy.title11}</p>
                <p className="text-lg mb-20">{text.page.components.privacyPolicy.content11}</p>
            </div>
        </div>
    );
}
