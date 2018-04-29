import { firestore } from 'firebase-functions';
import * as admin from 'firebase-admin';

const USERID = 'userId';

const updatePermissions = firestore
  .document(`permissions/{${USERID}}`)
  .onUpdate((change, context) => {
    console.log('context', context);
    const id = context.params[USERID];
    const snapshot = change.after;
    console.log('snapshot', snapshot);
    return admin.auth().getUser(id).then((user) => {
      const currentCustomClaims = user.customClaims;
      const newCustomClaims = snapshot.data();
      console.log('newCustomClaims', newCustomClaims);
      return admin.auth().setCustomUserClaims(
        id,
        Object.assign({}, currentCustomClaims, newCustomClaims),
      );
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
      .catch((err) => {
        if (err instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(err);
        } else {
          // eslint-disable-next-line no-console
          console.error(new Error(err));
        }
      });
  });

export default updatePermissions;
