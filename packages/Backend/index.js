import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FB_DATABASE_URL,
});

export * from './permissions';
