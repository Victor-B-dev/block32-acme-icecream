const client = require('./client.cjs');

const createFlavor = async(name, isfav) => {
  try {
    await client.query(`
      INSERT INTO flavors (name, isfav)
      VALUES ($1, $2);
    `, [name, isfav]);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {createFlavor}