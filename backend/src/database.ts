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
    console.error(error);
  }
}
export async function findUserById(coll: Collection, value: string) {
  try {
    return await coll.findOne({ _id: new ObjectId(value) });
  } catch (error) {
    console.error(error);
  }
}
export async function findByU_Id(coll: Collection, id: string) {
  try {
    return await coll.find({ U_id: new ObjectId(id) }).toArray();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCupcake(coll: Collection, cupcakeId: string) {
  try {
    return await coll.findOne({ _id: new ObjectId(cupcakeId) });
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDocuments(coll: Collection) {
  try {
    // fetch all document in the collection
    return await coll.find().toArray();
  } catch (error) {
    console.error(error);
  }
}

export async function insertDocument(
  coll: Collection,
  documentObject: Document,
) {
  try {
    return await coll.insertOne(documentObject);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDocumentById(coll: Collection, id: string) {
  try {
    return await coll.findOneAndDelete({ _id: new ObjectId(id) });
  } catch (error) {
    console.error(error);
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
      { returnDocument: "after" },
    );
  } catch (error) {
    console.error(error);
  }
}

export async function cancellOrder(coll: Collection, id: string, uid: string) {
  try {
    return await coll.deleteOne({
      _id: new ObjectId(id),
      U_id: new ObjectId(uid),
    });
  } catch (error) {
    console.error(error);
  }
}
