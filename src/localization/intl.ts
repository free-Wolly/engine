import enLocale from './locales/en';
import kaLocale from './locales/ka';
import { get } from 'lodash';

const locales = {
  EN: enLocale,
  KA: kaLocale,
  RU: kaLocale,
};

type Languages = 'KA' | 'EN' | 'RU';

export default (locale: Languages, id: string, values?: any) => {
  let message = get(locales[locale] ?? 'KA', id, 'Missing translation!');
  if (values) {
    Object.keys(values).forEach(k => {
      const val = values[k];
      message = message.replace(`{${k}}`, val);
    });
  }

  return message;
};
