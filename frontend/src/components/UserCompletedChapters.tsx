'use client';
import React, { useEffect, useState } from 'react';

interface CompletedChapter {
  chapter_id: string;
  is_finished: boolean;
  chapterTitle: string;
}

const UserCompletedChapters: React.FC<{ userId: string }> = ({ userId }) => {
  const [completedChapters, setCompletedChapters] = useState<CompletedChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompletedChapters = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await fetch(`${apiUrl}/progress/completed-chapters/${userId}`, {
          headers: {
            Accept: 'application/json',
          },
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCompletedChapters(data || []);
      } catch (err) {
        console.error('Unexpected error fetching completed chapters:', err);
        setError('Une erreur est survenue lors de la récupération des chapitres complétés.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedChapters();
  }, [userId]);

  if (loading) {
    return <p>Chargement des chapitres complétés...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (completedChapters.length === 0) {
    return <p>Aucun chapitre complété pour le moment.</p>;
  }

  return (
    <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Chapitres complétés :</h3>
      <ul className="list-disc list-inside">
      {completedChapters.map((chapter, index) => (
          <ul key={index}>
            ✅ {chapter.chapterTitle} {chapter.is_finished}
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default UserCompletedChapters;
