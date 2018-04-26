import { firestore } from 'firebase-functions';
import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FB_DATABASE_URL,
});

exports.updatePermissions = firestore
  .document('permissions/{userId}')
  .onCreate((snapshot) => {
    // Get the userId from the document id
    const { id } = snapshot;
    // Use the userId to get the user's current claims
    return admin.auth().getUser(id).then((user) => {
      const currentCustomClaims = user.customClaims;
      const newCustomClaims = snapshot.data();
      return admin.auth().setCustomUserClaims(id, Object.assign({}, currentCustomClaims, newCustomClaims));
    }).catch((error) => {
      console.log(error);
    });
    // Use the document content to add/remove claims
    // Write a new permissionUpdateTime key to users/userId
    // Delete permissions/{userId}
    // access a particular field as you would any JS property
    const { title } = newValue;
    // perform desired operations ...
  });
