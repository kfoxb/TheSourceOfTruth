import * as admin from 'firebase-admin';

const USER_ID = 'userId';
const PERMISSIONS = 'permissions';
export const DOC_PATH = `${PERMISSIONS}/{${USER_ID}}`;
export function setClaims(newCustomClaims, context) {
  const id = context.params[USER_ID];
  const db = admin.firestore();
  return admin.auth().getUser(id).then((user) => {
    const currentCustomClaims = user.customClaims;
    return admin.auth().setCustomUserClaims(
      id,
      Object.assign({}, currentCustomClaims, newCustomClaims),
    );
  }).then(() => {
    const userDoc = db.collection('users').doc(id);
    return userDoc.set({
      timestamp: new Date(),
    }, { merge: true });
  })
    .catch((err) => {
      const errMessage = err instanceof Error ? err : new Error(err);
      // eslint-disable-next-line no-console
      console.error(errMessage);
      if (err.code === 'auth/user-not-found') {
        return db.collection(PERMISSIONS).doc(id).delete();
      }
      return null;
    });
}
