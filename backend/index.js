// core module;
import * as dotenv from 'dotenv';
dotenv.config({ debug: false });
// API
import express from 'express';

// database for images
import cloudinaryConfigure, { getAssetInfo } from './cloudinary.js'
cloudinaryConfigure();

// database . use dotenv
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const DB_URI = `mongodb+srv://${user}:${password}@clusterleo.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;

import mongoDB, { findUser, fetchCupcake, fetchCupcakes, insertDocument } from './database.js';
const CLIENT = mongoDB(DB_URI);
// reference access to the database and collection
const DATABASE = CLIENT.db("MelBake");
const ORDER_COLLECTION = DATABASE.collection("ORDER");
const ACCOUNT_COLLECTION = DATABASE.collection("ACCOUNT");
const CUPCAKE_COLLECTION = DATABASE.collection("CUPCAKES");

const port = process.env.PORT || 2024;
const app = express();

// app.use(home);
app.use(express.json())
app.get('/melbake', async (req, res) => {
  const cupcakes = await fetchCupcakes(CUPCAKE_COLLECTION);
  res.status(200).json(cupcakes);
});

app.get('/melbake/cupcake/:id', async (req, res) => {
  let cupcake = await fetchCupcake(CUPCAKE_COLLECTION, req.params.id);
  // convert the document to json then to object
  cupcake = JSON.stringify(cupcake);
  cupcake = JSON.parse(cupcake);
  await getAssetInfo(cupcake.PublicId).then((value) => {
    // reference the Url to the cupcake object
    cupcake.Url = value
    cupcake = JSON.stringify(cupcake)
  })
  if (cupcake) {
    res.status(200).json(cupcake);
  } else {
    throw new Error('Cant find fetch document')
  }
})

app.get('/melbake/login/:gmail', async (req, res) => {
  const account = await findUser(ACCOUNT_COLLECTION, req.params.gmail);
  if (account) {
    res.status(200).json(account);
  } else {
    throw new Error('Cant find fetch document')
  }
})
app.post('/melbake/admin/product/append', async (req, res) => {
  insertDocument(CUPCAKE_COLLECTION, req.body).finally(
    res.status(200).json({ result: "Document Added to the Database!" })
  )
})
app.post('/melbake/signin/create', async (req, res) => {
  insertDocument(ACCOUNT_COLLECTION, req.body).finally(
    res.status(200).json({ result: "Document Added to the Database" })
  )
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})