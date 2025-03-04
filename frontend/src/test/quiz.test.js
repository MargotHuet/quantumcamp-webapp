// ✅ Définition de l'URL avant toute exécution
process.env = {
  ...process.env,
  NEXT_PUBLIC_BACKEND_API_URL: "http://localhost:3000", // Remplace par ton URL réelle
};

jest.mock('../../clientSupabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(() => Promise.resolve({ data: { session: { user: { id: '123' } } } })),
    },
  },
}));

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import QuizSection from '../components/QuizSection';
import '@testing-library/jest-dom';

describe('QuizSection component', () => {
  const mockChapterId = '1fa97955-666d-4448-91df-87a7e99e46b3';
  const mockUserId = 'user123';

  const mockQuiz = {
    question: "Qu'est-ce qui distingue l'informatique quantique de l'informatique classique ?",
    answers: [
      { id: 1, possible_answer: "Réponse incorrecte 1", is_correct: false },
      { id: 2, possible_answer: "Réponse incorrecte 2", is_correct: false },
      { id: 3, possible_answer: "Réponse incorrecte 3", is_correct: false },
      { id: 4, possible_answer: "Bonne réponse", is_correct: true },
    ],
  };

  const mockChapter = {
    id: mockChapterId,
    title: "Chapitre Test",
    content: "Contenu du chapitre test",
    next_chapter_id: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn((url) => {
      console.log(`🔍 Mocked fetch called with URL: ${url}`);

      if (url.includes(`/chapters/${mockChapterId}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockChapter),
        });
      }

      if (url.includes(`/answers/quiz/${mockChapterId}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ question: mockQuiz.question }),
        });
      }

      if (url.includes(`/answers/answers/${mockChapterId}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockQuiz.answers),
        });
      }

      if (url.includes(`/progress/save-progress`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: "Progress saved successfully" }),
        });
      }

      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Not Found" }),
      });
    });
  });

  it('should display the correct answer message when the correct answer is selected', async () => {
    await act(async () => {
      render(<QuizSection chapterId={mockChapterId} userId={mockUserId} />);
    });

    // Vérifier si la question apparaît bien
    const questionElement = await screen.findByText(mockQuiz.question);
    expect(questionElement).toBeInTheDocument();

    // Simuler le clic sur la bonne réponse
    const correctAnswerButton = screen.getByText("Bonne réponse");
    fireEvent.click(correctAnswerButton);

    // Vérifier si le message de bonne réponse s'affiche
    const correctMessage = await screen.findByText('Bonne réponse ! 🎉');
    expect(correctMessage).toBeInTheDocument();
  });
});
