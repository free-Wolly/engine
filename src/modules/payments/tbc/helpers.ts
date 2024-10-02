import axios from 'axios';

export const getPaymentToken = async () => {
  const formData = new URLSearchParams();
  formData.append('client_id', '7001088');
  formData.append('client_secret', '2DitzLmhu0Jk8HOP');

  const response = await axios.post('https://api.tbcbank.ge/v1/tpay/access-token', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey: 'PekAIu7AoR4qgPpA3AEheMyuxgmnksA8',
    },
  });

  const { data } = response;

  return data.access_token;
};
