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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await fetch(`${apiUrl}/chapters/${chapterId}`, {
          headers: {
            Accept: 'application/json',
          },
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Received data:", data);  
        setChapter(data);
      } catch (error) {
        console.error("Fetch error:", error);
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

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        id="1"
        className="flex flex-col items-center justify-center bg-sky-100 p-4 md:w-3/5 md:p-8"
      >
        <div className="w-full mb-4">
          <BackButton />
        </div>
        <h1 className="text-xl md:text-3xl font-bold mb-4 text-center">{chapter.title}</h1>
        <p className="text-sm md:text-base text-justify">{chapter.content}</p>
      </div>
      <div
        id="2"
        className="flex flex-col items-center justify-center bg-sky-500 p-4 md:w-2/5 md:p-8"
      >
        {/* Pass `router` as a prop to `QuizSection` */}
        <QuizSection chapterId={String(chapterId)} />
      </div>
    </div>
  );
}
