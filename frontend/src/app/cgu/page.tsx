import React from "react";
import text from "../../text/text";

export default function About(): JSX.Element {
    return (
        <div className="bg-creamWhite flex flex-col items-center justify-start min-h-screen py-12 px-8 text-center">
            <div className="w-full max-w-screen-sm laptop:max-w-screen-md desktop:max-w-4xl mx-auto">
                <p className="text-4xl font-extrabold mb-20">{text.page.components.cgu.mainTitle}</p>
                <p className="text-4xl font-extrabold mb-20">{text.page.components.cgu.title1}</p>
                <p className="text-lg mb-16">{text.page.components.cgu.content1}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title2}</p>
                <p className="text-lg mb-20 ">{text.page.components.cgu.content2}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title3}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content3}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title4}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content4}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title5}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content5}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title6}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content6}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title7}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content7}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title8}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content8}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title9}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content9}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title10}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content10}</p>
                <p className="text-4xl font-extrabold mb-16">{text.page.components.cgu.title11}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.content11}</p>
                <p className="text-lg mb-20">{text.page.components.cgu.last_maj}</p>
            </div>
        </div>
    );
}
