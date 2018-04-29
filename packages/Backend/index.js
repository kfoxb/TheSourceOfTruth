import { firestore } from 'firebase-functions';
import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FB_DATABASE_URL,
});

exports.updatePermissions = firestore
  .document('permissions/{userId}')
  .onWrite((change, context) => {
    const id = context.params.userId;
    const snapshot = change.after;
    return admin.auth().getUser(id).then((user) => {
      const currentCustomClaims = user.customClaims;
      const newCustomClaims = snapshot.data();
      return admin.auth().setCustomUserClaims(id, Object.assign({}, currentCustomClaims, newCustomClaims));
    }).then(() => {
      const db = admin.firestore();
      if (id) {
        const timeStamp = db.collection('users').doc(id);
        const setWithMerge = timeStamp.set({
          timestamp: new Date(),
        }, { merge: true });
        return (
          setWithMerge
        );
      }
      return (
        db.collection('users').doc(id).set({
          timestamp: new Date(),
        })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error('Error updating timestamp: ', error);
          })
      );
    })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  });
