import { firestore } from 'firebase-functions';
import { DOC_PATH, setClaims } from './helpers';

const deletePermissions = firestore
  .document(DOC_PATH)
  .onDelete((snapshot, context) =>
    setClaims({ editor: false, author: false }, context));

export default deletePermissions;
