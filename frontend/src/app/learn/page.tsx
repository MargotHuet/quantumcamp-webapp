'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

interface Course {
  id: string;
  title: string;
  is_finished: boolean;
  chapter_id: number;
  created_at: number;
}

export default function Learn() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5001/courses', {
          headers: {
            Accept: 'application/json',
            method: "GET",
            },
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) { 
        console.log(error);
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
      <div className="relative flex flex-col items-center justify-center bg-light-blue rounded-lg mx-10 my-8 h-[650px]">
        <div className="absolute top-8 left-20">
        </div>
        <h1 className="absolute top-28 left-20 font-anekDeva text-3xl">Summary</h1>
        <div className="flex flex-col items-center justify-center bg-blue-500 rounded-lg p-6 text-center">
        {courses.map(course => (
  <div key={course.id} className="flex items-center justify-between w-full">
   <Link href={`/learn/${course.chapter_id}`} className="cursor-pointer hover:text-white">
      <h1 className="font-firaSans text-3xl px-4">Chapitre {course.id}: {course.title}</h1>
      {course.is_finished && (
        <FontAwesomeIcon 
          icon={faCircleCheck}
          width={26}
          height={26}
          color="green" 
        />
      )}
    </Link>
  </div>
))}
        </div>
      </div>
    </>
  );
}
