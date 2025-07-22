import React from "react";
import BlogCard from "@/components/blog/BlogCard";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

// Page Blog qui regroupe la liste des articles
export default function Blog() {
    const { t } = useTranslation('common');

    return(
        <>
        <div className="flex flex-col items-center bg-creamWhite px-4 py-8 sm:py-12 min-h-screen">
        <div className="mb-4 text-center">
                <h1 className="mb-4 text-5xl sm:text-5xl font-black text-black">{t('blog.title')}</h1>
            </div>
            <div className="md:grid md:grid-cols-2 ml-2 mr-2">
                <div className="md:col-span-2">
                    <BlogCard />
                </div>
            </div>
        </div>
        </>
    )
};