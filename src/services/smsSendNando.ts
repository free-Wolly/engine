import axios from 'axios';
import qs from 'qs';

export default async (
  mobile: string,
  code: number | string,
  androidSignature: string | undefined | null,
  prefix: string = 'აქტივაციის კოდი: ',
) => {
  const content = `Wolly code is: ${code}${androidSignature ? `  ${androidSignature}` : ''}`;

  let data = qs.stringify({
    apikey: 'c9cc58f021cdfb3fefdb381a53ce66c66d381695027caf026d5bf31eff8a3d3b',
    destination: mobile,
    content: content,
    no_sms: 'false',
    brand_name: 'Wolly',
  });


  try {
    const response = await axios.post('https://nando.ge/api.php', data);
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return '';
  }
};
