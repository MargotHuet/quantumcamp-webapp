'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  chapter_id: number;
  created_at: number;
}

export default function Learn() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await fetch(`${apiUrl}/users/check-auth`, {
          credentials: "include",
        });
  
        if (response.ok) {
          setUser({ id: "authenticated" });
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };
  
    checkAuth();
  }, []);
    

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await fetch(`${apiUrl}/chapters/courses`, {
          headers: {
            Accept: 'application/json',
          },
          method: "GET",
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!courses || courses.length === 0) {
    return <p>No courses available.</p>;
  }

  return (
    <>
      {user ? (
        <div className="flex flex-col items-center justify-center bg-creamWhite px-4 py-8 md:px-10 md:py-12 min-h-screen">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">Sommaire</h1>
          <div className="flex flex-col w-full max-w-lg bg-blueBg rounded-lg p-4 md:p-6 text-center">
            {courses.map(course => (
              <div key={course.id} className="flex flex-col md:flex-row items-center justify-between w-full mb-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Link href={`/learn/${course.chapter_id}`} className="w-full md:w-auto cursor-pointer">
                  <h2 className="text-lg md:text-2xl font-medium px-2">
                    {course.title}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
      <div className="flex flex-col text-md font-anekDeva items-center justify-center px-4 py-8 md:px-10 md:py-12 min-h-[75vh]">
        <p>Vous devez être connecté pour voir cette page.
          <div className="text-blue-500">
            <Link href="/signup">Inscrivez-vous</Link>
          </div>
          ou
          <div className="text-blue-500">
            <Link href="/login">Connectez-vous</Link>
          </div>
        </p>
      </div>
      )}
    </>
  );
}
