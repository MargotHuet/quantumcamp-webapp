"use client";
import React from "react";
import text from "@/text/text";
import { useParams } from "next/navigation";
import BackButton from "@/components/backButton";

export default function Chapter() {
  const params = useParams();
//  const chapterId = params.chapterId;

  return (
    <>
      <div className="flex h-screen">
        <div id="1" className="flex flex-col items-center justify-center w-3/5 bg-sky-100">
          <div className="flex">
              <BackButton />
          </div>
          <h1 className="text-3xl font-bold">Titre du chapitre: {text.page.components.learnPage.chapter}</h1>
          <p>{text.page.components.learnPage.content}</p>
        </div>
        <div id="2" className="flex flex-col bg-sky-500 w-2/5 flex items-center justify-center">
          <h1> {text.page.components.learnPage.question} </h1>
          {/**Boucle foreach or map */}
          <div className="flex flex-row gap-2">
            <input type="checkbox"></input>
            <label> {text.page.components.learnPage.answer[0]} </label>
            </div>
            <div className="flex flex-row gap-2">
            <input type="checkbox"></input>
            <label>{text.page.components.learnPage.answer[1]} </label>
            </div>
            <div className="flex flex-row gap-2">
            <input type="checkbox"></input>
            <label> {text.page.components.learnPage.answer[2]} </label>
            </div>
            <div className="flex flex-row gap-2">
            <input type="checkbox"></input>
            <label> {text.page.components.learnPage.answer[3]} </label>
            </div>
            <a
              className="border border-orange-300 text-center bg-orange-100 rounded-lg w-1/6 p-2 hover:bg-orange-200 hover:border-orange-400 hover:text-white" 
              href={""}
            >
              {text.page.components.learnPage.button}
            </a>
          </div>
      </div>
    </>
  );
}