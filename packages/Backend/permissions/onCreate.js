import { firestore } from 'firebase-functions';
import { DOC_PATH, setClaims } from './helpers';

const createPermissions = firestore
  .document(DOC_PATH)
  .onCreate((snapshot, context) => {
    console.log('context', context);
    return setClaims(snapshot, context);
  });

export default createPermissions;
