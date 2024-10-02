import axios from 'axios';

export default (mobile: string, code: number | string, androidSignature: string | undefined | null, prefix: string = 'აქტივაციის კოდი: ') => {
  const content = `Wolly code is: ${code}${androidSignature ?  `  ${androidSignature}` : ''}`;

  axios.get(process.env.SMS_SENDER_API_URL_NEW, {
    params: {
      apikey: process.env.SMS_SENDER_API_KEY_NEW,
      smsno: 2,
      destination: mobile,
      content,
    },
    headers: {
      apiKey: process.env.SMS_SENDER_API_KEY_NEW,
    },
  });
};
