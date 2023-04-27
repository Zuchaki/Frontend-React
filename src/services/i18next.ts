import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import PL from "./languages/PL.json";
import EN from "./languages/EN.json"

//Type of resources
type Language = "en" | "pl";
type Translation = "translation"
const keys = [
    "logo",
    "menu_Main",
    "menu_views",
    "language",
    "name_col",
    "age_col",
    "birth_date_col",
    "cv_col",
    "options_col",
    "add_button",
    "delete_button",
    "add_form_title",
    "edit_form_title",
    "name",
    "surname",
    "birth_date",
    "cv",
    "edit",
    "number_of_elements",
    "no_data"
  ] as const;
  
  type Words = {
    [K in typeof keys[number]]: string;
  };


const resources: Record<Language, Record<Translation, Words>> = {
    en: {
        translation: EN
    },
    pl: {
        translation: PL
    }
}

i18next.use(initReactI18next).init({
    resources,
    lng: "pl",
    interpolation: {
      escapeValue: true,
    },
})