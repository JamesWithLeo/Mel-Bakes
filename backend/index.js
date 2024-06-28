// core module;
import * as dotenv from 'dotenv';
dotenv.config({ debug: false });
// API
import express from 'express';
import { auth } from './routes/auth.route.js';
import { home } from './routes/home.route.js';

// database
import mongoDB from './database.js';
import { checkAccountType } from './routes/account.type.js';
const CLIENT = mongoDB();
// reference access to the database and collection
const DATABASE = CLIENT.db("MelBake");
const ORDER_COLLECTION = DATABASE.collection("ORDER");

// function CreateData(name, price) {
//   const nextId = getNextIndex();
//   var newData = { id: nextId, product_name: name, product_price: price }
//   return newData;
// }
// async function getNextIndex() {
//   const countId = await ORDER_COLLECTION.collection("ORDER").countDocuments();
//   return countId;
// }

// async function insertData(data) {
//   await ORDER_COLLECTION.insertOne(data);
//   console.log("1 document inserted");
// }

// async function run() {
//   try {
//     // Send a ping to confirm a successful connection
//     await CLIENT.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment!");
//   }
//   finally {
//     // Ensures that the client will close when you finish/error
//     await CLIENT.close();
//     console.log("MongoDB is Now Close!");
//   }
// }
// run().catch(console.dir);

const port = process.env.PORT || 2024;
const app = express();


// app.use(home);

app.get('/melbake', (req, res) => {
  // res.json({ mssg: "GET REQUEST TO /melbake" });
  res.status(200).json({ mssg: "GET REQUEST TO /melbake" });
});

// app.use('/login/:type', checkAccountType);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})