"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from 'next-i18next';

// Composant de prévisualisation d'un article de blog. 

interface BlogArticle {
  id: string;
  name: string;
  content: string;
  image_url: string;
  slug: string;
}

export default function BlogList() {
  const { t } = useTranslation('common');
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await fetch(`${apiUrl}/blog`);
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>{t('blog.loading')}</p>;
  if (articles.length === 0) return <p>{t('blog.noArticles')}</p>;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <article
          key={article.id}
          className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
        >
          <div className="relative w-full h-48">
            <Image
              src={`/assets/${article.image_url}`}
              alt={`Image pour le visuel de l'article ${article.name}`}
              fill
              className="object-none"
            />
          </div>

          <div className="p-6 flex flex-col space-y-3">
            <h3 className="text-xl font-bold text-gray-900">{article.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {article.content.slice(0, 150)}...
            </p>
            <a
              href={`/blog/${article.slug}`}
              className="mt-2 inline-block text-purple-600 hover:underline font-medium text-sm"
            >
              {t('blog.readArticle')}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
