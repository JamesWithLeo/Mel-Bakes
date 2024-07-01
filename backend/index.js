// core module;
import * as dotenv from 'dotenv';
dotenv.config({ debug: true });
// API
import express, { json } from 'express';
import { MongoClient, ServerApiVersion, ObjectId, } from 'mongodb';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dupzzryrz',
  api_key: '267777685656854',
  api_secret: 'Veky4CcT0jwKbpDLF2APg9EATRg'
})

const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);

    return result.url;
  } catch (error) {
    console.error(error);
  }
};
// database
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const DB_URI = `mongodb+srv://${user}:${password}@clusterleo.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const CLIENT = new MongoClient(DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
// reference access to the database and collection
const DATABASE = CLIENT.db("MelBake");
const ORDER_COLLECTION = DATABASE.collection("ORDER");
const ACCOUNT_COLLECTION = DATABASE.collection("ACCOUNT");
const CUPCAKE_COLLECTION = DATABASE.collection("CUPCAKES");


function rawAccount(firstName, lastName, gmail, password) {
  this.FirstName = firstName;
  this.LastName = lastName
  this.Gmail = gmail;
  this.Password = password;
}
let createdAccount = new rawAccount('Emma', 'Alma', 'Eagmail.com', 'boom')
// createUser(createdAccount);

async function createUser(accountData) {
  try {
    await ACCOUNT_COLLECTION.insertOne(accountData);
  } catch (error) {
    console.log(error);
  }
}
async function findUser(gmail) {
  try {
    const accountData = { Gmail: gmail }
    return await ACCOUNT_COLLECTION.findOne(accountData);
  } catch (error) {
    console.log(error);
  }
}
async function fetchCupcake(cupcakeId) {
  try {
    return await CUPCAKE_COLLECTION
      .findOne({ "_id": new ObjectId(cupcakeId) });

  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function fetchCupcakes() {
  try {
    // fetch all document in the collection
    return await CUPCAKE_COLLECTION.find().toArray();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const port = process.env.PORT || 2024;
const app = express();


// app.use(home);
app.use(express.json())
app.get('/melbake', async (req, res) => {
  const cupcakes = await fetchCupcakes();
  res.status(200).json(cupcakes);
});

app.get('/melbake/cupcake/:id', async (req, res) => {
  let cupcake = await fetchCupcake(req.params.id);
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
  const account = await findUser(req.params.gmail);
  if (account) {
    res.status(200).json(account);
  } else {
    throw new Error('Cant find fetch document')
  }
})

app.get('/signin/create', (req, res) => {
  res.status(200).json({ mssg: "GET REQUEST TO /melbake" });
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})