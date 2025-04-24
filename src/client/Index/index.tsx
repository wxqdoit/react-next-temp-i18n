'use client';

import {useTranslation} from "react-i18next";
import {usePathname, useRouter} from "next/navigation";
import {SUPPORTED_LANGUAGES} from "@/constants";

export const Index = () => {

    const {t, i18n} = useTranslation('common')
    const router= useRouter()
    const pathname = usePathname();

    const handleChangeLanguage = (lng: string) => {
        if (lng === i18n.language) return;
        const newPath = pathname.replace(i18n.language, lng);
        i18n.changeLanguage(lng);
        history.pushState({}, '', newPath);
    };

    return <>{t('title')}
        <button onClick={()=>{
            router.push(i18n.language+'/login')
        }}>login</button>
        <div >
            {SUPPORTED_LANGUAGES.map(({ code, label }) => (
                <button
                    key={code}
                    onClick={() => handleChangeLanguage(code)}
                >
                    {label}
                </button>
            ))}
        </div>
    </>;
};