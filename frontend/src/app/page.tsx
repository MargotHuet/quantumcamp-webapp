
import Image from "next/image";
import React from "react";
import HomeCardsFullSection from "./homeCardSection/page";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';


export const metadata = {
  title: 'Apprendre l\'informatique quantique - QuantumCamp',
  description: 'Apprenez les bases de l\'informatqiue quantique de façon interactive grâce à nos cours d\'introduction.',
  keywords: ['informatique quantique', 'apprendre l\'informatique quantique', 'c\'est quoi l\'informatique quantique?', 'apprendre l\'informatique quantique en ligne'],
  openGraph: {
    title: 'Apprendre l\'informatique quantique - QuantumCamp',
    description: 'Apprenez les bases de l\'informatqiue quantique de façon interactive grâce à nos cours d\'introduction.',
    url: 'https://quantumcamp.fr',
    siteName: 'QuantumCamp',
    images: [
      {
        url: 'https://www.quantumcamp.fr/_next/image?url=%2Fassets%2FQuantumCamp.png&w=828&q=75',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-purple-100 via-blue-50 to-white rounded-3xl shadow-2xl p-8 md:p-16 min-h-[80vh] overflow-hidden">

        <div className="hidden md:w-1/2 md:ml-20 md:flex md:justify-center md:justify-start mb-8 md:mb-0">
          <Image  
            src="/assets/quantum.png" 
            alt="Quantum Camp Logo" 
            width={400}
            height={400}
            className="w-60 md:w-80 object-contain"
            priority
          />
        </div>

        <div className="flex flex-col items-center mt-20 md:mt-12 md:items-start text-center md:text-left w-full md:w-1/2 space-y-10">
          <h1 className="font-anekDeva text-5xl md:text-6xl font-extrabold leading-tight">
            {t('homePage.title')}
          </h1>
          <p className="font-firaSans text-lg md:text-xl text-gray-700 max-w-lg">
            {t('homePage.description')}
          </p>
          <a
            className="border border-orange-400 text-center bg-orange-200 rounded-lg md:w-1/6 p-4 hover:bg-orange-200 hover:border-orange-400 hover:text-white" 
            href={"/learn"}
          >
              {t('homePage.button')}
          </a>
        </div>
      </section>

      <HomeCardsFullSection />
    </>
  );
}
