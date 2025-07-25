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

export default function Contact() {
    const { t } = useTranslation('common');

    return (
        <>
        <section className="bg-creamWhite min-h-screen">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">{t('contact.title')}</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">{t('contact.subtitle')}</p>
            <form action="#" className="space-y-8">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">{t('contact.email')}</label>
                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="prenom@exemple.com" required></input>
                </div>
                <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('contact.subject')}</label>
                    <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder={t('contact.subjectPlaceholder')} required></input>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{t('contact.message')}</label>
                    <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder={t('contact.messagePlaceholder')}></textarea>
                </div>
                <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-black rounded-lg bg-orange-100 border border-orange-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">{t('contact.send')}</button>
            </form>
            </div>
        </section>
        </>
    )
};