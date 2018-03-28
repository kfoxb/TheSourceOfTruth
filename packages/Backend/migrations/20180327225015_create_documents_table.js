const DOCUMENTS = 'documents';

exports.up = function up(knex) {
  return knex.schema.createTable(DOCUMENTS, (table) => {
    table.increments('document_id');
    table.string('status', 30);
    table.timestamps(true, true);
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable(DOCUMENTS);
};
