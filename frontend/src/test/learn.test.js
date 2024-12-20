import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Learn from '../app/learn/page';
import '@testing-library/jest-dom';

// Mock fetch to prevent real API calls during the test
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: '1', title: 'Course 1', is_finished: true, chapter_id: 1, created_at: 123 },
      { id: '2', title: 'Course 2', is_finished: false, chapter_id: 2, created_at: 124 }
    ])
  })
);

describe('Learn Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading message initially', () => {
    // Wrap in act to ensure all updates are handled
    act(() => {
      render(<Learn />);
    });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays course list after loading', async () => {
    render(<Learn />);

    // Wait for the loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    
    // Check if the courses are rendered
    expect(screen.getByText('Course 1')).toBeInTheDocument();
    expect(screen.getByText('Course 2')).toBeInTheDocument();
  });

  test('displays No courses available if no courses are fetched', async () => {
    // Mock fetch to return an empty array
    fetch.mockImplementationOnce(() => 
      Promise.resolve({ json: () => Promise.resolve([]) })
    );
    
    render(<Learn />);
    
    // Wait for the loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    expect(screen.getByText('No courses available.')).toBeInTheDocument();
  });

  test('displays check icon if the course is finished', async () => {
    render(<Learn />);
    
    // Wait for the loading to complete
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    
    // Check if the FontAwesome icon is rendered
    const checkIcons = screen.getAllByRole('img', { hidden: true });
    expect(checkIcons.length).toBe(1); // Should only show one check icon
  });
});
