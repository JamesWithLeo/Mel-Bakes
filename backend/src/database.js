import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { getAssetInfo } from './cloudinary.js';

const mongoDB = (uri) => {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })
    console.log('Database Connected!')
    return client;
  } catch (error) {
    console.log('Having problems with the database', error)
    throw error
  }

}
export default mongoDB;


export async function findUser(coll, value) {
  try {
    return await coll.findOne({ "Gmail": value })
  } catch (error) {
    console.log(error);
  }
}
export async function findUserById(coll, value) {
  try {
    return await coll.findOne({ "_id": new ObjectId(value) });
  } catch (error) {
    console.log(error);
  }
}
export async function fetchCupcake(coll, cupcakeId) {
  try {
    return await coll
      .findOne({ "_id": new ObjectId(cupcakeId) });

  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchCupcakes(coll) {

  try {
    // fetch all document in the collection
    return await coll.find().toArray()

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function insertDocument(coll, documentObject) {
  try {
    return await coll.insertOne(documentObject);
  } catch (error) {
    console.log(error);
  }
}

export async function insertToCart(coll, UserId, documentObject) {
  try {
    coll.updateOne({ "_id": new ObjectId(UserId) }, { $push: { Cart: documentObject } })
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function insertToOrder(coll, UserId, documentObject) {
  try {
    coll.updateOne({ "_id": new ObjectId(UserId) }, { $push: { Orders: documentObject } })
  } catch (err) {
    console.log(err)
  }
}
export async function removeFromOrder(coll, userId, documentObject) {
  try {
    coll.updateOne({ "_id": new ObjectId(userId) }, { $pull: { Orders: documentObject } })
  } catch (err) {
    console.log(err)
    throw err;
  }
}
export async function removeFromCart(coll, UserId, documentObject) {
  try {
    return await coll.updateOne({ "_id": new ObjectId(UserId) }, { "$pull": { "Cart": documentObject } })
  } catch (err) {
    console.log(err);
    throw err;
  }
}