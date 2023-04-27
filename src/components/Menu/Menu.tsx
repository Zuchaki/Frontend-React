import React from "react";
import style from "./Menu.module.scss"
import * as icons from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { TFunction, changeLanguage } from 'i18next';

const Menu:React.FC = () => {
  
    //Change language i18next
    const { t }:{t:TFunction} = useTranslation();

    //Change language
    //That function change lng: "__" in src/services/i18next.ts
    const handlerOnChange = (e:any):void => {
        changeLanguage(e.target.value);
    } 


    return(
        <>
        <div className={style.constiner}>
            <div className={style.logo}>{t("logo")}</div>
            <div className={style.items}>
                <NavLink to="/main" className={({isActive, isPending})=>isActive?style.itemActive:style.item}>{t("menu_Main")}</NavLink>
                <NavLink to="/views" className={({isActive, isPending})=>isActive?style.itemActive:style.item}>{t("menu_views")}</NavLink>
            </div>
            <div className={style.language}>
                <icons.GlobalOutlined className={style.icon}/>
                <select onChange={(e) => {handlerOnChange(e)}} className={style.select}>
                    <option  value={"pl"}><div className={style.option}>{"Język (PL)"}</div></option>
                    <option value={"en"}>{"Language (EN)"}</option>
                </select>
                {/*<span>{t("language")}</span>*/}
            </div>
        </div>
        </>
    )
}

export default Menu