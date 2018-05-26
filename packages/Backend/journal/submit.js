import { firestore as firestoreFunction } from 'firebase-functions';
import { database, firestore as firestoreAdmin } from 'firebase-admin';
import PromiseFirepad from './PromiseFirepad';

const JOURNALS = 'journals';
const JOURNAL_BACKUPS = 'journalBackups';
const REALTIME_DATABASE_ID = 'realtimeDatabaseId';
const BACKUP_REALTIME_DATABASE_ID = 'backupRealtimeDatabaseId';
const CHANGING_PHASE = 'changingPhase';
const PHASES = 'phases';

const phases = Object.freeze({
  create: 'create',
  edit: 'edit',
  published: 'published',
  view: 'view',
});

const { create, edit, published } = phases;
const phaseOrder = [create, edit, published];

const getNextPhase = currentPhase => phaseOrder[phaseOrder.findIndex(p => p === currentPhase) + 1];

const createRealtimeDatabaseBackup = refToBackup => new Promise((resolve, reject) => {
  refToBackup.once('value', (snapshot) => {
    const newRef = database().ref(JOURNAL_BACKUPS).push();
    return newRef.set(snapshot.val()).then(() => resolve(newRef));
  }, (error) => {
    reject(error);
  });
});

const submit = firestoreFunction
  .document(`${JOURNALS}/{journalId}`)
  .onUpdate((change, context) => {
    const beforeChangingPhase = change.before.data()[CHANGING_PHASE];
    const afterChangingPhase = change.after.data()[CHANGING_PHASE];
    const isChangingPhase = !beforeChangingPhase && afterChangingPhase;
    if (isChangingPhase) {
      const prevPhase = change.before.data().phase;
      const nextPhase = getNextPhase(prevPhase);
      const realTimeId = change.after.data()[REALTIME_DATABASE_ID];
      const currentRef = database().ref(JOURNALS).child(realTimeId);
      const pageRefFirepad = new PromiseFirepad(currentRef);

      return Promise.all([
        pageRefFirepad.getHtml(),
        pageRefFirepad.getText(),
        createRealtimeDatabaseBackup(currentRef),
      ]).then(([html, text, backupRef]) => {
        const primaryDoc = firestoreAdmin()
          .collection(JOURNALS)
          .doc(context.params.journalId);
        return Promise.all([
          primaryDoc
            .update({
              phase: nextPhase,
              changingPhase: false,
            }),
          primaryDoc
            .collection(PHASES)
            .doc(prevPhase)
            .set({
              html,
              text,
              [BACKUP_REALTIME_DATABASE_ID]: backupRef.key,
            }, { merge: true }),
        ]);
      });
    }
    return null;
  });

export default submit;
