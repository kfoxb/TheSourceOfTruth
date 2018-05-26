import * as admin from 'firebase-admin';
import { config } from 'firebase-functions';

admin.initializeApp(config().firebase);

export * from './permissions';
export { default as submit } from './journal/submit';
