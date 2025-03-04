'use client'
import React, { useEffect, useState } from "react";
import BackButton from "@/components/backButton";
import QuizSection from "@/components/QuizSection";
import { useParams, useRouter } from "next/navigation";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function ChapterPage() {
  const { chapterId } = useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [userId, setUserId] = useState<string| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les informations utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await fetch(`${apiUrl}/users/account`, {
          credentials: "include",
        });

        if (!response.ok) {
          setUserId(null);
          return;
        }

        const data = await response.json();
        if (data.user && data.user.id) {
          setUserId(data.user.id);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        setUserId(null);
      }
    };

    fetchUser();
  }, []);

  // Récupérer les données du chapitre
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await fetch(`${apiUrl}/chapters/${chapterId}`, {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setChapter(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setChapter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!chapter) {
    return <p>No chapter available.</p>;
  }

  if (!userId) {
    return <p>Error: User not logged in.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        id="1"
        className="flex flex-col items-center justify-center bg-blueBg p-4 md:w-3/5 md:p-8"
      >
        <div className="w-full pt-8 desktop:h-1/5">
          <BackButton />
        </div>
        <div className="desktop:h-5/6">
        <h1 className="text-xl md:text-3xl font-bold mb-4 text-center">{chapter.title}</h1>
        <p className="text-sm  md:text-base text-justify desktop:px-44 desktop:p-8 desktop:w-4/4">{chapter.content}</p>
      </div>
      </div>
      <div
        id="2"
        className="flex flex-col items-center justify-center bg-creamWhite p-4 md:w-2/5 md:p-8"
      >
        <QuizSection chapterId={String(chapterId)} userId={userId} />
      </div>
    </div>
  );
}
