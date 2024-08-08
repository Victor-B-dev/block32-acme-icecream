const client = require('./client.cjs');

const createFlavor = async(name, isfav) => {
  try {
    const createdFlav = await client.query(`
      INSERT INTO flavors (name, isfav)
      VALUES ($1, $2)
      RETURNING *;
    `, [name, isfav]);
    return createdFlav
  } catch(err) {
    console.log(err);
  }
}

const getAllFlavors = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM flavors;
    `);

    return rows;
  } catch(err){
    console.log(err)
  }
}

const getFlavor = async (id) => {
  try{
    const { rows: [ flavor ] } = await client.query(`
      SELECT * FROM flavors
      WHERE id= '${id}';
      `)

    return flavor
  } catch (err){
    console.log(err)
  }
}

const deleteFlavor = async(id) => {
  try{
    await client.query(`
      DELETE FROM flavors
      WHERE id='${id}';
      `);
  } catch (err){
    console.log(err)
  }
}

const updateFlav = async (id, flavorName, isfav) => {
  try{
    const updatedFlav = await client.query(`
      UPDATE flavors
      SET name='${flavorName}',
          isfav='${isfav}'
      WHERE id='${id}'
      RETURNING *;
      `);
    return updatedFlav
  } catch (err){
    console.log(err)
  }
}


module.exports = {
  createFlavor,
  getAllFlavors,
  getFlavor,
  deleteFlavor,
  updateFlav
}