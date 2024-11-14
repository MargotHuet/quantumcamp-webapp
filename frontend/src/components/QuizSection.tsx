'use client';
import React, { useEffect, useState } from "react";
import { supabase } from "../../clientSupabase";
import { useRouter } from 'next/router';

interface Choice {
    text: string;
}

interface Quiz {
    question: string;
    choices: Choice[];
    correct_answer_id: number;
}

export default function QuizSection({ chapterId, router }: { chapterId: number, router: any }) {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showNextButton, setShowNextButton] = useState<boolean>(false);

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

                if (chapterError) throw new Error(chapterError.message);
                if (!chapterData || !chapterData.quiz_id) throw new Error("No quiz associated with this chapter.");

                const quizId = chapterData.quiz_id;

                const { data: quizData, error: quizError } = await supabase
                    .from('quiz')
                    .select(`
                        question,
                        choices,
                        correct_answer_id
                    `)
                    .eq('id', quizId)
                    .single();

                if (quizError) throw new Error(quizError.message);

                let parsedChoices;
                try {
                    parsedChoices = Array.isArray(quizData.choices)
                        ? quizData.choices
                        : JSON.parse(quizData.choices);
                } catch (parseError) {
                    setError("Les choix ne sont pas au format attendu.");
                    return;
                }

                setQuiz({
                    question: quizData.question,
                    choices: parsedChoices,
                    correct_answer_id: quizData.correct_answer_id,
                });
            } catch (error) {
                setError(error instanceof Error ? error.message : String(error));
                setQuiz(null);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizForChapter();
    }, [chapterId]);

    const handleNext = () => {
        if (selectedChoiceIndex !== null && quiz) {
            const isAnswerCorrect = selectedChoiceIndex === quiz.correct_answer_id;
            setIsCorrect(isAnswerCorrect);
            if (isAnswerCorrect) {
                setShowNextButton(true);
            }
        }
    };

    const handleNextQuiz = () => {
        const nextChapterId = chapterId + 1;
        router.push(`/learn/${nextChapterId}`);
    };

    if (loading) {
        return <p className="text-center">Chargement...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!quiz) {
        return <p className="text-center">Aucun quiz disponible pour ce chapitre.</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center p-4 mb-24">
            <div className="bg-white rounded-md shadow-lg w-full max-w-md">
                <h1 className="bg-blue-700 text-white px-4 py-3 font-bold rounded-t-md text-center">
                    {quiz.question}
                </h1>
                <ul className="flex flex-col gap-3 mt-4 p-4">
                    {quiz.choices.map((choice, index) => (
                        <li key={index} className="flex items-center">
                            <button
                                onClick={() => setSelectedChoiceIndex(index)}
                                className={`w-full rounded-lg p-3 transition-all duration-200 text-center
                                    ${
                                        isCorrect !== null
                                            ? index === quiz.correct_answer_id
                                                ? "bg-green-500 text-white"
                                                : selectedChoiceIndex === index && !isCorrect
                                                ? "bg-red-500 text-white"
                                                : "bg-gray-100"
                                            : selectedChoiceIndex === index
                                            ? "bg-gray-400 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }
                                `}
                            >
                                {choice.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex mt-4 space-x-4">
                <button
                    onClick={handleNext}
                    className="border border-orange-300 bg-orange-100 rounded-lg w-40 p-2 hover:bg-orange-200 hover:border-orange-400 hover:text-white"
                >
                    Valider
                </button>
                {showNextButton && (
                    <button
                        onClick={handleNextQuiz}
                        className="border border-blue-500 bg-blue-100 rounded-lg w-40 p-2 hover:bg-blue-200 hover:border-blue-600 hover:text-white"
                    >
                        Suivant
                    </button>
                )}
            </div>
        </div>
    );
}
