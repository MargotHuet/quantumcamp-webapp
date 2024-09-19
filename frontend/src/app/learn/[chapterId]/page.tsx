'use client'
import React, { useEffect, useState } from "react";
import BackButton from "@/components/backButton";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function ChapterPage({ params }: { params: { chapterId: string } }) {
  const { chapterId } = params;
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`http://localhost:5001/courses/${chapterId}`, {
          headers: {
            Accept: 'application/json',
            method: "GET",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);  // Log the received data
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
    <div className="flex h-screen">
      <div id="1" className="flex flex-col items-center justify-center w-3/5 bg-sky-100">
        <div className="flex">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold">Titre du chapitre: {chapter.title}</h1>
        <p>{chapter.content}</p>
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
  );
}