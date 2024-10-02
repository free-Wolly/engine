var axios = require('axios');

export const sendSlackNotification = async (message: string | null, channelUrl: string) => {
  if (!message) return;

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: channelUrl,
    headers: {
      'Content-type': 'application/json',
    },
    data: JSON.stringify({
      text: message,
    }),
  };

  axios(config)
    .catch(function (error: any) {
      console.error(error);
    });
};
