const Knex = require('knex');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const tableNames = require('../../src/constants/tableNames');
const orderTableNames = require('../../src/constants/orderedTableNames');
const countries = require('../../src/constants/countries');
const states = require('../../src/constants/states');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await Promise.all(
    orderTableNames.map((table_name) => knex(table_name).del())
  );

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    email: 'pepitos@gmail.com',
    name: 'Lenny',
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

  console.log({ user, password, createdUser });

  await knex(tableNames.country).insert(countries);
  await knex(tableNames.state).insert(states);
};
