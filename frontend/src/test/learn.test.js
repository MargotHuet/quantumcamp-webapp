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
  if (url.includes('/chapters/courses')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: '1', title: 'Course 1', is_finished: true, chapter_id: 1, created_at: 123 },
          { id: '2', title: 'Course 2', is_finished: false, chapter_id: 2, created_at: 124 },
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
    await act(async () => {
      render(<Learn />);
    });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    await waitFor(() => {
      expect(screen.getByText('Course 1')).toBeInTheDocument();
      expect(screen.getByText('Course 2')).toBeInTheDocument();
    });
  });

  test('displays No courses available if user is not logged in', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    );

    await act(async () => {
      render(<Learn />);
    });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.getByText('No courses available.')).toBeInTheDocument();
  });
});
