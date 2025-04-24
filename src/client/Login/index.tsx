"use client"

import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";

export const Login = () => {
  const {t,i18n} = useTranslation('common')
    const router = useRouter()
    return <>
        <button onClick={()=>{
            router.push('/')
        }}>index</button>


        <h2>{t('login')}</h2>
    </>
};