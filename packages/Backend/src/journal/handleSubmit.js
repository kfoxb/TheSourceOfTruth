import { database } from 'firebase-admin';
import { CHANGING_PHASE, CREATE, EDIT, JOURNAL_BACKUPS, JOURNALS, PUBLISHED } from '../constants';
import PromiseFirepad from './PromiseFirepad';

const phaseOrder = [CREATE, EDIT, PUBLISHED];
const getNextPhase = currentPhase => phaseOrder[phaseOrder.findIndex(p => p === currentPhase) + 1];

const createBackup = refToBackup =>
  refToBackup.once('value')
    .then((snapshot) => {
      console.log('creating backup');
      const newRef = database().ref(JOURNAL_BACKUPS).push();
      return newRef
        .set(snapshot.val())
        .then(() => newRef);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

const checkPermissions = (claims, phase) => (claims.author && phase === 'create') || (claims.editor && phase === 'edit');

const handleSubmit = (payload, context) => {
  console.log('in handleSubmit');
  const ref = database().ref(JOURNALS).child(payload.id);
  return ref.once('value')
    .then((snapshot) => {
      console.log('received snapshot');
      const data = snapshot.val();
      const prevPhase = data.phase;
      const isAllowed = checkPermissions(context.auth.token, prevPhase);
      if (isAllowed) {
        const nextPhase = getNextPhase(prevPhase);
        const pageRefFirepad = new PromiseFirepad(ref);
        console.log('waiting for html, text, and backup');
        return Promise.all([
          pageRefFirepad.getHtml(),
          pageRefFirepad.getText(),
          createBackup(ref),
        ]).then(([html, text, backupRef]) => {
          console.log('got html, text, and backup, updating doc');
          console.log('backupRef', backupRef);
          console.log('backupRef.key', backupRef.key);
          return ref.update({
            phase: nextPhase,
            [CHANGING_PHASE]: false,
            [`${prevPhase}PhaseBackup`]: {
              id: backupRef.key,
              html,
              text,
            },
          });
        });
      }
      throw new Error('Insufficient permissions for this task');
    });
};

export default handleSubmit;
