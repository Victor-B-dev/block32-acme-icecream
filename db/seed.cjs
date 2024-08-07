require('dotenv').config()
const client = require ('./client.cjs');
const { createFlavor } = require('./flavors.cjs')

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS flavors;
    `);
  } catch(err) {
    console.log(err);
  }
}

const createTable = async() => {
  try {
    await client.query(`
      CREATE TABLE flavors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        isfav BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch(err) {
    console.log(err);
  }
}

const init = async () => {
  await client.connect();
  console.log ('CONNECTED');

  await dropTables();
  console.log(`TABLE DROPPED!`);
  
  await createTable();
  console.log(`TABLE CREATED!`);

  await createFlavor('vanilla', 'FALSE')
  await createFlavor('chocolate', 'FALSE')
  await createFlavor('strawberry', 'FALSE')
  await createFlavor('cookiesncreme', 'TRUE')
  await createFlavor('mint', 'FALSE')
  console.log(`CREATED FIVE FLAVORS`);

  await client.end();
  console.log('DISONNECTED');
}

init();