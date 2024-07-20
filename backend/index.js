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

import mongoDB, { findUser, fetchCupcake, fetchCupcakes, insertDocument, findUserById, insertToCart, removeFromCart, insertToOrder, removeFromOrder } from './database.js';
const CLIENT = mongoDB(DB_URI);
// reference access to the database and collection
const DATABASE = CLIENT.db("MelBake");
const ACCOUNT_COLLECTION = DATABASE.collection("ACCOUNT");
const CUPCAKE_COLLECTION = DATABASE.collection("CUPCAKES");

const port = process.env.PORT || 2024;
const app = express();

app.use(express.json())



// get all cupcakes in the db
app.get('/melbake', async (req, res) => {
  async function destribute(array) {// destribute img from cloudinary
    let i;
    let cups = []
    for (i = 0; i <= array.length; i++) {
      if (i === array.length) {
        return cups
      }
      await getAssetInfo(array[i].PublicId).then((url) => {
        array[i].Url = url
        cups.push(array[i])
      })
    }
  }
  await fetchCupcakes(CUPCAKE_COLLECTION).then(async (cupcakes) => {
    destribute(cupcakes).then((value) => {
      res.status(200).json(value);
    })
  })
});
// get single cupcake
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
// fetch user 
app.get('/melbake/login/:gmail', async (req, res) => {
  const account = await findUser(ACCOUNT_COLLECTION, req.params.gmail,);
  if (account) {
    res.status(200).json(account);
  } else {
    throw new Error('Cant find fetch document')
  }
})


// fetch cart
app.get('/melbake/mycart/:id', async (req, res) => {
  await findUserById(ACCOUNT_COLLECTION, req.params.id).then((value) => {
    res.status(200).json({ "Cart": value.Cart })
  })
})
// add product to cart
app.post('/melbake/mycart/Add/:id', async (req, res) => {
  insertToCart(ACCOUNT_COLLECTION, req.params.id, req.body).finally(
    res.status(200).json({ result: "Product Added to the Cart!" })
  )
})
// remover product to cart
app.post('/melbake/mycart/remove/:id', async (req, res) => {
  removeFromCart(ACCOUNT_COLLECTION, req.params.id, req.body).finally(
    res.status(200).json({ result: "Product Removed to the Cart!" })
  )
})


// fetch orders of user
app.get('/melbake/orders/:id', async (req, res) => {
  await findUserById(ACCOUNT_COLLECTION, req.params.id).then((value) => {
    res.status(200).json({ Order: value.Orders })
  })
})
// checkOut order
app.post('/melbake/order/:id', async (req, res) => {
  insertToOrder(ACCOUNT_COLLECTION, req.params.id, req.body).finally(
    res.status(200).json({ result: "Product is Checked out!" })
  )
})
// cancel order
app.post('/melbake/order/remove/:id', async (req, res) => {
  removeFromOrder(ACCOUNT_COLLECTION, req.params.id, req.body).finally(
    res.status(200).json({ result: "Order was cancelled!" })
  )
})

/// account middleware
app.get('/melbake/profile/:id', async (req, res) => {
  await findUserById(ACCOUNT_COLLECTION, req.params.id).then((account) => {
    res.status(200).json(account)
  })
})
// add product to database
app.post('/melbake/admin/product/append', async (req, res) => {
  insertDocument(CUPCAKE_COLLECTION, req.body).finally(
    res.status(200).json({ result: "Document Added to the Database!" })
  )
})
// add account to database
app.post('/melbake/signin/create', async (req, res) => {
  insertDocument(ACCOUNT_COLLECTION, req.body).finally(
    res.status(200).json({ result: "Document Added to the Database" })
  )
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})