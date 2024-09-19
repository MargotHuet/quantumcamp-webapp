"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/backButton";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function ChapterPage() {
  const { chapterId } = useParams();  // Récupérer l'ID du chapitre depuis les paramètres
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`http://localhost:5001/courses/${chapterId}`, {  // Injecter dynamiquement l'ID dans l'URL
          headers: {
            Accept: 'application/json',
          },
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du chapitre");
        }

        const data = await response.json();
        setChapter(data);  // Stocker les données du chapitre dans l'état
      } catch (error) { 
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);  // Refaire la requête si l'ID change

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!chapter) {
    return <p>No chapters available.</p>;
  }

  return (
    <>
      <div className="flex h-screen">
        <div id="1" className="flex flex-col items-center justify-center w-3/5 bg-sky-100">
          <div className="flex">
              <BackButton />
          </div>
          <h1 className="text-3xl font-bold">Titre du chapitre: {chapter.title}</h1>
          <p>{chapter.content}</p>  {/* Afficher le contenu du chapitre */}
        </div>
        <div id="2" className="flex flex-col bg-sky-500 w-2/5 flex items-center justify-center">
          <h1>  </h1>
         
          <a
            className="border border-orange-300 text-center bg-orange-100 rounded-lg w-1/6 p-2 hover:bg-orange-200 hover:border-orange-400 hover:text-white" 
            href={""}
          >
            Submit
          </a>
        </div>
      </div>
    </>
  );
}
