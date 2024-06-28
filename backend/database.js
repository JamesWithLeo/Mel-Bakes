import { MongoClient, ServerApiVersion } from 'mongodb';

const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const DB_URI = `mongodb+srv://${user}:${password}@clusterleo.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;

const mongoDB = () => {
  try {
    const client = new MongoClient(DB_URI, {
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