"use client";
import React, { useEffect, useState } from "react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  next_chapter_id: string | null;
}

interface Answer {
  id: number;
  possible_answer: string;
  is_correct: boolean;
}

interface Quiz {
  question: string;
  answers: Answer[];
}

export default function QuizSection({
  chapterId,
  userId,
}: {
  chapterId: string;
  userId: string;
}) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  useEffect(() => {
    const fetchChapterAndQuiz = async () => {
      try {
        setLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

        const [chapterResponse, questionResponse, answersResponse] = await Promise.all([
          fetch(`${apiUrl}/chapters/${chapterId}`, { credentials: "include" }),
          fetch(`${apiUrl}/answers/quiz/${chapterId}`, { credentials: "include" }),
          fetch(`${apiUrl}/answers/answers/${chapterId}`, { credentials: "include" })
        ]);

        if (!chapterResponse.ok || !questionResponse.ok || !answersResponse.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const chapterData: Chapter = await chapterResponse.json();
        const questionData = await questionResponse.json();
        const answersData = await answersResponse.json();

        setChapter(chapterData);
        setQuiz({
          question: questionData.question,
          answers: answersData,
        });

      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setChapter(null);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterAndQuiz();
  }, [chapterId]);

  const handleAnswerClick = async (answerId: number, isCorrect: boolean) => {
    if (!userId) {
      console.error("Utilisateur non connecté.");
      return;
    }
  
    setSelectedAnswerId(answerId);
    setIsCorrect(isCorrect);
  
    if (isCorrect) {
      setShowNextButton(true);
  
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  
        const response = await fetch(`${apiUrl}/progress/save-progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", 
          body: JSON.stringify({ userId, answerId }),
        });
  
        if (!response.ok) {
          throw new Error(`Erreur API : ${response.statusText}`);
        }
      } catch (error) {
        throw new Error("Erreur lors de la sauvegarde de la progression.");
      }
    }
  };
  

  const handleNextQuiz = () => {
    if (chapter?.next_chapter_id) {
      window.location.href = `/learn/${chapter.next_chapter_id}`;
    } else {
      alert("Vous avez terminé tous les chapitres !");
    }
  };

  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!quiz || !quiz.question) {
    return <p className="text-center">Aucun quiz disponible pour ce chapitre.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 mb-24">
      <div className="bg-white rounded-md shadow-lg w-full max-w-md">
        <h1 className="bg-purpleBg text-gray-800 px-4 py-3 font-bold rounded-t-md text-center">
          {quiz.question}
        </h1>
        <ul className="flex flex-col gap-3 mt-4 p-4">
          {quiz.answers.map((answer) => (
            <li key={answer.id} className="flex items-center">
              <button
                onClick={() => handleAnswerClick(answer.id, answer.is_correct)}
                className={`w-full rounded-lg p-3 transition-all duration-200 text-center ${
                  selectedAnswerId === answer.id
                    ? answer.is_correct
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {answer.possible_answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedAnswerId !== null && (
        <p className="text-center mt-4 font-bold">
          {isCorrect ? "Bonne réponse ! 🎉" : "Mauvaise réponse. 😢"}
        </p>
      )}
      {showNextButton && (
        <button
          onClick={handleNextQuiz}
          className="border border-blue-500 bg-blue-100 rounded-lg w-40 p-2 hover:bg-blue-200 hover:border-blue-600 hover:text-white mt-4"
        >
          Suivant
        </button>
      )}
    </div>
  );
}
