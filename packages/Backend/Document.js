import knex from './db';

const createId = () => knex.insert({}).into('documents').returning('id');

export default class Documents {
  constructor({ id }) {
    if (!id) {
      this.id = createId();
    } else {
      this.id = id;
    }
  }
}
