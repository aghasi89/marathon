
import i18 from "i18next";

const translationByCode = (el: any) => {
  const language = i18.language
  switch (language) {
    case 'uk':
      return el.name_en ?? el.name;
    case 'ru':
      return el.name_ru ?? el.name;
    case 'am':
      return el.name_hy ?? el.name;
    case 'fr':
      return el.name_fr ?? el.name;
    default:
      return el.name;
  }
};

export default translationByCode