'use client';
import React, {useRef, useState} from 'react';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import {createInstance} from 'i18next';
import {resources} from "@/i18n/resources";
import {FALLBACK_LNG} from "@/constants";

interface Props {
    children: React.ReactNode;
    lng: string;
}

export function I18nProvider({children, lng}: Props) {

    const i18nRef = useRef(
        createInstance().use(initReactI18next)
    );

    useState(() => i18nRef.current.init({
        lng,
        resources,
        fallbackLng: FALLBACK_LNG,
        interpolation: {escapeValue: false},
    }));

    return <I18nextProvider i18n={i18nRef.current}>{children}</I18nextProvider>;
}
