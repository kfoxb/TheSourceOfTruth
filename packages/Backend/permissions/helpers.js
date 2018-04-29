import * as admin from 'firebase-admin';

const USER_ID = 'userId';
export const DOC_PATH = `permissions/{${USER_ID}}`;
export function setClaims(snapshot, context) {
  const id = context.params[USER_ID];
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
    const userDoc = db.collection('users').doc(id);
    return userDoc.set({
      timestamp: new Date(),
    }, { merge: true });
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
}
