require('dotenv').config()
const client = require('./db/client.cjs');
client.connect();

const { getAllFlavors, getFlavor, createFlavor, deleteFlavor,updateFlav } = require('./db/flavors.cjs')

const express = require('express')
const app = express();

app.use(express.json());

app.get('/api/flavors', async(req, res, next) => {
  try{
    const flavors = await getAllFlavors();
    res.send(flavors);
  } catch(err){
    next(err);
  }
})

app.get('/api/flavors/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const flavor = await getFlavor(id);
    res.send(flavor);
  } catch (err){
    next(err);
  }
})

app.post('/api/flavors', async (req, res, next) => {
  try {
    const { flavorName, is_favorite } = req.body;
    const flavor = await createFlavor(flavorName, is_favorite);
    res.send(flavor);
  } catch (err){
    next(err);
  }
})

app.delete('/api/flavors/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    await deleteFlavor(id);
    res.send('deleted flavor');
  } catch (err){
    next(err);
  }
})

app.put('/api/flavors/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const { flavorName, is_favorite } = req.body;
    const updatedFlav = await updateFlav(id, flavorName, is_favorite);
    res.send(updatedFlav);
  } catch (err){
    next(err);
  }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`))