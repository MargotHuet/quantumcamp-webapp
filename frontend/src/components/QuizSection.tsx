'use client';
import React, { useEffect, useState } from "react";
import { supabase } from "../../clientSupabase";

interface Choice {
    id: number;
    text: string;
}

interface Quiz {
    question: string;
    choices: Choice[];
}

export default function QuizSection({ chapterId }: { chapterId: number }) {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizForChapter = async () => {
            try {
                setQuiz(null);
                setLoading(true);

                const { data: chapterData, error: chapterError } = await supabase
                    .from('chapters')
                    .select('quiz_id')
                    .eq('id', chapterId)
                    .single();

                if (chapterError) {
                    throw chapterError;
                }

                if (!chapterData || !chapterData.quiz_id) {
                    throw new Error("No quiz associated with this chapter.");
                }

                const quizId = chapterData.quiz_id;

                const { data: quizData, error: quizError } = await supabase
                    .from('quiz')
                    .select('question, choices')
                    .eq('id', quizId)
                    .single();

                if (quizError) {
                    throw quizError;
                }

                if (quizData) {
                    const formattedQuiz = {
                        question: quizData.question,
                        choices: quizData.choices,
                    };
                    setQuiz(formattedQuiz);
                } else {
                    setQuiz(null);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error instanceof Error ? error.message : String(error));
                setQuiz(null);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizForChapter();
    }, [chapterId]); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!quiz) {
        return <p>No quiz available for this chapter.</p>;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="bg-white rounded-md shadow-lg w-full max-w-md p-4">
                    <h1 className="bg-blue-700 text-white px-4 py-2 font-bold rounded-t-md">{quiz.question}</h1>
                    <ul className="flex flex-col gap-3 mt-4">
                        {quiz.choices && quiz.choices.length > 0 ? (
                            quiz.choices.map((choice) => (
                                <li key={choice.id} className="flex items-center">
                                    <button className="w-full bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all duration-200">
                                        {choice.text}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li>No choices available</li>
                        )}
                    </ul>
                </div>
                <button
                    className="mt-4 border border-orange-300 bg-orange-100 rounded-lg w-40 p-2 hover:bg-orange-200 hover:border-orange-400 hover:text-white"
                >
                    Suivant
                </button>
            </div>
        </>
    );
}
