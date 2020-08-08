import admin from 'firebase-admin';

import { googleApplicationCredentials } from './settings'

const serviceAccount = require(googleApplicationCredentials);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://web-chat-72b52.firebaseio.com'
});

export const messaging = admin.messaging();