import { firestore } from 'firebase-functions';
import { DOC_PATH, setClaims } from './helpers';

const updatePermissions = firestore
  .document(DOC_PATH)
  .onUpdate((change, context) => {
    console.log('context', context);
    const snapshot = change.after;
    console.log('snapshot', snapshot);
    return setClaims(snapshot, context);
  });

export default updatePermissions;
