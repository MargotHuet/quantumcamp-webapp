jest.mock('../../clientSupabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(() => Promise.resolve({ data: { session: { user: { id: '123' } } } })),
    },
  },
}));

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Learn from '../app/learn/page';
import '@testing-library/jest-dom';

global.fetch = jest.fn((url) => {
  if (url.includes('/users/check-auth')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "User authenticated" }),
    });
  }
  if (url.includes('/courses/courses')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: '1', title: 'Introduction à l\'informatique quantique: notions', is_finished: true, chapter_id: 1, created_at: 123 },
          { id: '2', title: 'Algorithmes quantiques', is_finished: false, chapter_id: 2, created_at: 124 },
        ]),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve({}),
  });
});

describe('Learn Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays course if user is logged in', async () => {
    fetch.mockImplementationOnce((url) => {
      if (url.includes('/users/check-auth')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: "User authenticated" }),  
        });
      }
      if (url.includes('/courses/courses')) {
        return Promise.resolve({
          json: () => Promise.resolve([
            { id: '1', title: "Introduction à l'informatique quantique: notions", is_finished: true, chapter_id: 1, created_at: 123 },
            { id: '2', title: "Algorithmes quantiques", is_finished: false, chapter_id: 2, created_at: 124 },
          ]),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });

    await act(async () => {
      render(<Learn />);
    });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    await waitFor(() => {
      expect(screen.getByText('Introduction à l\'informatique quantique: notions')).toBeInTheDocument();
      expect(screen.getByText('Algorithmes quantiques')).toBeInTheDocument();
    });
  });

  test('displays link to login or signup if user is not logged in', async () => {
    fetch.mockImplementationOnce((url) => {
      if (url.includes('/users/check-auth')) {
        return Promise.resolve({
          ok: false, 
          json: () => Promise.resolve({}),
        });
      }
      if (url.includes('/courses/courses')) {
        return Promise.resolve({
          json: () => Promise.resolve([]), 
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });

    await act(async () => {
      render(<Learn />);
    });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.getByText(/Vous devez être connecté pour voir cette page/i)).toBeInTheDocument();
    expect(screen.getByText('Inscrivez-vous')).toBeInTheDocument();
    expect(screen.getByText('Connectez-vous')).toBeInTheDocument();
  });
});
