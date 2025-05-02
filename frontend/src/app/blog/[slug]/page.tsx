// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import BlogDetailClient from './BlogDetail';
import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog/${params.slug}`);
  if (!res.ok) {
    return {
      title: 'Article introuvable',
      description: 'Aucun contenu disponible.',
    };
  }
  const article = await res.json();

  return {
    title: article.name,
    description: article.content.slice(0, 150),
    openGraph: {
      title: article.name,
      description: article.content.slice(0, 150),
      images: [`/assets/${article.image_url}`], // mets une URL absolue si besoin
    },
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return <BlogDetailClient slug={params.slug} />;
}
