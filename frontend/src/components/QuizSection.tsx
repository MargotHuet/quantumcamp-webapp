'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function QuizSection({ chapterId }: { chapterId: string }) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchChapterAndQuiz = async () => {
      try {
        setLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

        // Récupérer les informations du chapitre actuel
        const chapterResponse = await fetch(`${apiUrl}/chapters/${chapterId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!chapterResponse.ok) {
          throw new Error(`Échec de la récupération du chapitre : ${chapterResponse.statusText}`);
        }

        const chapterData: Chapter = await chapterResponse.json();
        setChapter(chapterData);

        // Récupérer le quiz associé au chapitre
        const questionResponse = await fetch(`${apiUrl}/answers/quiz/${chapterId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!questionResponse.ok) {
          throw new Error(`Échec de la récupération de la question : ${questionResponse.statusText}`);
        }

        const questionData = await questionResponse.json();

        const answersResponse = await fetch(`${apiUrl}/answers/answers/${chapterId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!answersResponse.ok) {
          throw new Error(`Échec de la récupération des réponses : ${answersResponse.statusText}`);
        }

        const answersData = await answersResponse.json();

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

  const handleAnswerClick = (answerId: number, isCorrect: boolean) => {
    setSelectedAnswerId(answerId);
    setIsCorrect(isCorrect);

    if (isCorrect) {
      setShowNextButton(true);
    }
  };

  const handleNextQuiz = () => {
    if (chapter?.next_chapter_id) {
      console.log("Redirection vers le chapitre suivant :", chapter.next_chapter_id);
      router.push(`/learn/${chapter.next_chapter_id}`);
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
        <h1 className="bg-blue-700 text-white px-4 py-3 font-bold rounded-t-md text-center">
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
