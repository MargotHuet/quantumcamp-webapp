import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function About(): JSX.Element {
    const { t } = useTranslation('common');

    return (
        <div className="bg-creamWhite flex flex-col items-center justify-start min-h-screen py-12 px-8 text-center">
            {/* Conteneur avec texte raccourci */}
            <div className="w-full max-w-screen-sm laptop:max-w-screen-md desktop:max-w-4xl mx-auto">
                <p className="text-4xl font-extrabold mb-20">{t('about.title1')}</p>
                <p className="text-lg mb-16">{t('about.text1')}</p>
                <p className="text-4xl font-extrabold mb-16">{t('about.title2')}</p>
                <p className="text-lg">{t('about.text2')}</p>
            </div>
        </div>
    );
}
