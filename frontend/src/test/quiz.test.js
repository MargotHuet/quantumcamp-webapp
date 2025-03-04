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
        { answer: "L'informatique quantique n'applique pas les principes de la physique quantique.", correct: false },
        { answer: "L'informatique quantique utilise des bits qui ne peuvent être que 1 ou 0 ", correct: false },
        { answer: "L'informatique quantique est plus lente pour résoudre des problèmes que l'informatique classique.", correct: false },
        { answer: "L'informatique quantique utilise des qubits, capables d'être 0 et 1 simultanément grâce à la superposition.", correct: true },
      ],
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
      fetch.resetMocks();
    });
  
    it('should display the correct answer message when the correct answer is selected', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockQuiz));
  
      await act(async () => {
        render(<QuizSection chapterId={mockChapterId} userId={mockUserId} />);
      });
  
      // Wait for the question to be displayed
      const questionElement = await screen.findByText(mockQuiz.question);
      expect(questionElement).toBeInTheDocument();
  
      // Simulate the clicking on the right answer
      const selectCorrectAnswer = screen.getByText("L'informatique quantique utilise des qubits, capables d'être 0 et 1 simultanément grâce à la superposition.");
      fireEvent.click(selectCorrectAnswer);
  
      // Simulate the correct answer message
      const displayCorrectAnswerMessage = await screen.findByText('Bonne réponse ! 🎉');
      expect(displayCorrectAnswerMessage).toBeInTheDocument();
    });
  });