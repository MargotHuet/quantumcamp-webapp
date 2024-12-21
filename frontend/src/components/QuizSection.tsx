'use client';
import React, { useEffect, useState } from "react";

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
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

        // Étape 1 : Récupérer la question depuis la table `chapters`
        const chapterQuestionResponse = await fetch(`${apiUrl}/answers/quiz/${chapterId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        });

        if (!chapterQuestionResponse.ok) {
          throw new Error(`Échec de la récupération de la question : ${chapterQuestionResponse.statusText}`);
        }

        const questionData = await chapterQuestionResponse.json();

        if (!questionData.question) {
          throw new Error("La réponse du backend ne contient pas de question.");
        }

        // Étape 2 : Récupérer les réponses depuis la table `answers`
        console.log(`Fetching answers from: ${apiUrl}/answers/answers/${chapterId}`);
        const answersResponse = await fetch(`${apiUrl}/answers/answers/${chapterId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        });

        if (!answersResponse.ok) {
          throw new Error(`Échec de la récupération des réponses : ${answersResponse.statusText}`);
        }

        const answersData = await answersResponse.json();

        if (!Array.isArray(answersData)) {
          throw new Error("La réponse du backend ne contient pas un tableau de réponses.");
        }

        // Mise à jour de l'état avec la question et les réponses
        setQuiz({
          question: questionData.question,
          answers: answersData,
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [chapterId]);

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!quiz || !quiz.question) {
    return <p className="text-center">Aucun quiz disponible pour ce chapitre.</p>;
  }

  // Rendu de la section du quiz
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
                className="w-full rounded-lg p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-center"
              >
                {answer.possible_answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
