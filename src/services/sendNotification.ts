// var admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.cert({
//     type: 'service_account',
//     project_id: 'wolly-366508',
//     private_key_id: process.env.PRIVATE_KEY_ID_FIREBASE,
//     private_key: process.env.PRIVATE_KEY_FIREBASE ? process.env.PRIVATE_KEY_FIREBASE.replace(/\\n/gm, '\n') : undefined,
//     client_email: 'firebase-adminsdk-qck15@wolly-366508.iam.gserviceaccount.com',
//     client_id: process.env.CLIENT_ID_FIREBASE,
//     auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//     token_uri: 'https://oauth2.googleapis.com/token',
//     auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//     client_x509_cert_url:
//       'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qck15%40wolly-366508.iam.gserviceaccount.com',
//   }),
// });

var admin: any = undefined;

export default async ({
  pushToken,
  body,
  type,
  data,
}: {
  pushToken: string;
  body: string;
  type: string;
  data?: any;
}) => {
  const notification = {
    title: 'Wolly',
    body,
  };

  await admin.messaging().sendToDevice(
    pushToken,
    {
      data: {
        type,
        ...data,
      },
      notification,
    },
    {
      contentAvailable: true,
      priority: 'high',
    },
  );
};
