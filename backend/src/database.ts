import { MongoClient, ServerApiVersion, ObjectId, Collection } from "mongodb";

const mongoDB = (uri: string) => {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("Database Connected!");
    return client;
  } catch (error) {
    console.log("Having problems with the database", error);
    throw error;
  }
};
export default mongoDB;

export async function findUser(coll: Collection, value: string) {
  try {
    return await coll.findOne({ Gmail: value });
  } catch (error) {
    console.log(error);
  }
}
export async function findUserById(coll: Collection, value: string) {
  try {
    return await coll.findOne({ _id: new ObjectId(value) });
  } catch (error) {
    console.log(error);
  }
}
export async function fetchCupcake(coll: Collection, cupcakeId: string) {
  try {
    return await coll.findOne({ _id: new ObjectId(cupcakeId) });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchDocuments(coll: Collection) {
  try {
    // fetch all document in the collection
    return await coll.find().toArray();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function insertDocument(
  coll: Collection,
  documentObject: Document,
) {
  try {
    return await coll.insertOne(documentObject);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDocumentById(coll: Collection, id: string) {
  try {
    return await coll.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log(error);
  }
}
export async function updateDocumentById(
  coll: Collection,
  id: string,
  document: any,
) {
  try {
    return await coll.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: document },
    );
  } catch (error) {
    console.log(error);
  }
}

export async function insertToCart(
  coll: Collection,
  UserId: string,
  documentObject: any,
) {
  try {
    return coll.updateOne(
      { _id: new ObjectId(UserId) },
      { $push: { Cart: documentObject } },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function insertToOrder(
  coll: Collection,
  UserId: string,
  documentObject: any,
) {
  try {
    coll.updateOne(
      { _id: new ObjectId(UserId) },
      { $push: { Orders: documentObject } },
    );
  } catch (err) {
    console.log(err);
  }
}
export async function removeFromOrder(
  coll: Collection,
  userId: string,
  documentObject: any,
) {
  try {
    return coll.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { Orders: documentObject } },
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function removeFromCart(
  coll: Collection,
  UserId: string,
  documentObject: any,
) {
  try {
    return await coll.updateOne(
      { _id: new ObjectId(UserId) },
      { $pull: { Cart: documentObject } },
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
}
