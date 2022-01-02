const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
} = require('../../src/utils/tableUtils');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.table(tableNames.state, (table) => {
    table.string('code');
    references(table, tableNames.country);
  });

  await knex.schema.table(tableNames.country, (table) => {
    table.string('code');
  });

  await knex.schema.createTable(tableNames.size, (table) => {
    table.increments();
    table.string('name').notNullable();
    table.float('length');
    table.float('width');
    table.float('height');
    table.float('volume');
    references(table, tableNames.shape);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item, (table) => {
    table.increments();
    references(table, tableNames.user);
    table.string('name');
    references(table, tableNames.item_type);
    table.string('description', 1000);
    references(table, tableNames.company);
    references(table, tableNames.size);
    table.string('sku', 50);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item_info, (table) => {
    table.increments();
    references(table, tableNames.user);
    references(table, tableNames.item);
    table.datetime('purchase_date').notNullable();
    table.datetime('expiration_date');
    references(table, tableNames.company);
    table.datetime('last_used');
    table.float('purchase_price').notNullable().defaultTo(0);
    table.float('msrp').notNullable().defaultTo(0);
    references(table, tableNames.location);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item_image, (table) => {
    table.increments();
    references(table, tableNames.item);
    url(table, 'image_url');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.related_item, (table) => {
    table.increments().notNullable();
    references(table, tableNames.item);
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.table(tableNames.state, (table) => {
    table.dropColumn('code');
    table.dropColumn('country_id');
  });

  await knex.schema.table(tableNames.country, (table) => {
    table.dropColumn('code');
  });

  await Promise.all(
    [
      tableNames.size,
      tableNames.item,
      tableNames.item_info,
      tableNames.item_image,
      tableNames.related_item,
    ]
      .reverse()
      .map((name) => knex.schema.dropTableIfExists(name))
  );
};
