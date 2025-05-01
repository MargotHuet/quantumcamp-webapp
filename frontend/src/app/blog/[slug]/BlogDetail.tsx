// app/blog/[slug]/BlogDetailClient.tsx
'use client';

import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Article {
  name: string;
  image_url: string;
  content: string;
  slug: string;
}

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchArticle = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog/${slug}`);
      if (!res.ok) {
        notFound();
      } else {
        const data = await res.json();
        setArticle(data);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) return <p>Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 md:text-5xl md:pb-10">{article.name}</h1>
      <div className="flex justify-center items-center pt-10 pb-10 md:pb-20">
        <Image
          src={`/assets/${article.image_url}`}
          alt={`Image pour l'article ${article.name}`}
          width={420}
          height={80}
          className=""
        />
      </div>
      <p className="text-gray-700 whitespace-pre-line md:text-xl">{article.content}</p>
    </div>
  );
}
