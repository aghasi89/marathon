import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/fr';
import 'moment/locale/hy-am';

export const momentLocale = (lang: string) => {
  switch (lang) {
    case 'uk':
      moment.locale('en');
      break;
    case 'ru':
      moment.locale('ru');
      break;
    case 'fr':
      moment.locale('fr');
      break;
    case 'am':
      moment.locale('hy-am');
      break;
    default:
      break;
  }
};
