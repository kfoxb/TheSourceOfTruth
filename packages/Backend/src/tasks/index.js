import { database as databaseFunction } from 'firebase-functions';
import { database as databaseAdmin } from 'firebase-admin';
import handleSubmit from '../journal/handleSubmit';

const handleFailure = (error, docRef) => {
  console.log('in handleFailure');
  const errorObj = {};
  ['code', 'message', 'stack'].forEach((key) => {
    const val = error[key];
    if (val) {
      errorObj[key] = val;
    }
  });
  return docRef.update({
    error: errorObj,
  });
};

const finish = (docRef, context) => {
  console.log('in finish');
  return docRef
    .update({
      completedTime: new Date(databaseAdmin.ServerValue.TIMESTAMP),
      startTime: new Date(Date.parse(context.timestamp)),
    });
};

const handleTask = databaseFunction
  .ref('/tasks/{task}')
  .onCreate((snapshot, context) => {
    console.log('in handleTask');
    console.log('context.timestamp', context.timestamp);
    console.log('new date', new Date(context.timestamp));
    const taskId = context.params.task;
    const { payload, type } = snapshot.val();
    const docRef = databaseAdmin().ref(`/tasks/${taskId}`);
    console.log('checking type');
    if (type === 'submit') {
      console.log('type is submit');
      return handleSubmit(payload, context)
        .catch(error => handleFailure(error, docRef))
        .finally(() => finish(docRef, context));
    }
    return null;
  });

export default handleTask;
