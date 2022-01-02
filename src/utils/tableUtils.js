function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

// se podria deshabilitar agregando una regla buuut elijo no hacerlo :P
// eslint-disable-next-line camelcase
function createNameTable(knex, table_name) {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable();
    table.string('name', 254).notNullable().unique();
    addDefaultColumns(table);
  });
}

function url(table, columName) {
  table.string(columName, 2000);
}
function email(table, columnName) {
  return table.string(columnName, 254);
}

function references(table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
}

module.exports = {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
};
