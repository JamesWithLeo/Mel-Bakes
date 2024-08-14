// core module;
import * as dotenv from "dotenv";
dotenv.config({ debug: false });
// API
if (
  !process.env.DB_USER ||
  !process.env.DB_CLUSTER ||
  !process.env.PORT ||
  !process.env.DB_PASSWORD
) {
  process.exit;
}
import express, { Request, Response } from "express";

// database for images
import cloudinaryConfigure, { getAssetInfo } from "./cloudinary.js";
cloudinaryConfigure();

// database . use dotenv
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const cluster = process.env.DB_CLUSTER;
const DB_URI = `mongodb+srv://${user}:${password}@${cluster}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;

import mongoDB, {
  findUser,
  fetchCupcake,
  fetchCupcakes,
  insertDocument,
  findUserById,
  insertToCart,
  removeFromCart,
  insertToOrder,
  removeFromOrder,
} from "./database.js";
import { ObjectId, WithId } from "mongodb";
const CLIENT = mongoDB(DB_URI);
// reference access to the database and collection
const DATABASE = CLIENT.db("MelBake");
const ACCOUNT_COLLECTION = DATABASE.collection("ACCOUNT");
const CUPCAKE_COLLECTION = DATABASE.collection("CUPCAKES");
const ORDER_COLLECTION = DATABASE.collection("ORDER");
const port = process.env.PORT || 2024;
const app = express();

app.use(express.json());

// get all cupcakes in the db
interface ICupcakes {
  _id: string;
  Name: string;
  Price: string | number;
  Url: string;
  PublicId: string;
  Description: string;
  Quantity: number;
  Flavor: string;
}
app.get("/melbake", async (req: Request, res: Response) => {
  async function destribute(array: any) {
    // destribute img from cloudinary
    let i: number;
    let cups: ICupcakes[] = [];
    for (i = 0; i <= array.length; i++) {
      if (i === array.length) {
        return cups;
      }
      await getAssetInfo(array[i].PublicId).then((url) => {
        array[i].Url = url;
        cups.push(array[i]);
      });
    }
  }
  await fetchCupcakes(CUPCAKE_COLLECTION).then(async (cupcakes) => {
    console.log(cupcakes);
    destribute(cupcakes).then((value) => {
      console.log(value);
      res.status(200).json(value);
    });
  });
});
// get single cupcake
app.get("/melbake/cupcake/:id", async (req: Request, res: Response) => {
  let cupcake = await fetchCupcake(CUPCAKE_COLLECTION, req.params.id);
  // convert the document to json then to object
  // cupcake = JSON.stringify(cupcake);
  // cupcake = JSON.parse(cupcake);
  if (cupcake) {
    await getAssetInfo(cupcake.PublicId).then((value) => {
      // reference the Url to the cupcake object
      if (cupcake) {
        cupcake.Url = value;
        // cupcake = JSON.stringify(cupcake);
      }
    });
    if (cupcake) {
      res.status(200).json(cupcake);
    } else {
      throw new Error("Cant find fetch document");
    }
  }
});
// fetch user
app.get("/melbake/login/:gmail", async (req: Request, res: Response) => {
  await findUser(ACCOUNT_COLLECTION, req.params.gmail).then((value) => {
    res.status(200).json(value);
  });
});

// fetch cart
app.get("/cart/:id", async (req: Request, res: Response) => {
  await findUserById(ACCOUNT_COLLECTION, req.params.id).then((value) => {
    res.status(200).json(value);
  });
});

// add product to cart
app.post("/melbake/mycart/add/:id", async (req: Request, res: Response) => {
  req.body._id = new ObjectId();
  await insertToCart(ACCOUNT_COLLECTION, req.params.id, req.body).then(
    (value) => {
      res.status(200).json(value);
    },
  );
});

// remove product from cart
app.post("/melbake/mycart/remove/:id", async (req: Request, res: Response) => {
  await removeFromCart(ACCOUNT_COLLECTION, req.params.id, req.body).then(
    (result) => {
      res.status(200).json(result);
    },
  );
});

// fetch orders of user
app.get("/orders/:id", async (req: Request, res: Response) => {
  await findUserById(ACCOUNT_COLLECTION, req.params.id).then((value) => {
    if (value?.Orders) res.status(200).json(value.Orders);
  });
});
app.post("/orders", async (req: Request, res: Response) => {
  req.body._id = new ObjectId(req.body._id);
  insertDocument(ORDER_COLLECTION, req.body).then((result) => {
    res.status(200).json(result);
  });
});
// checkOut order
app.post("/melbake/myorder/:id", async (req: Request, res: Response) => {
  req.body._id = new ObjectId();
  insertToOrder(ACCOUNT_COLLECTION, req.params.id, req.body).then((result) => {
    res.status(200).json({ result: "Product is Checked out!" });
  });
});
// cancel order
app.post("/melbake/order/remove/:id", async (req: Request, res: Response) => {
  removeFromOrder(ACCOUNT_COLLECTION, req.params.id, req.body).then((value) => {
    res.status(200).json(value);
  });
});

/// account middleware
app.get("/melbake/profile/:id", async (req: Request, res: Response) => {
  await findUserById(ACCOUNT_COLLECTION, req.params.id).then((account) => {
    res.status(200).json(account);
  });
});
// add product to database
app.post(
  "/melbake/admin/product/append",
  async (req: Request, res: Response) => {
    insertDocument(CUPCAKE_COLLECTION, req.body).then((value) => {
      res.status(200).json(value);
    });
  },
);
// add account to database
app.post("/melbake/signin/create", async (req: Request, res: Response) => {
  insertDocument(ACCOUNT_COLLECTION, req.body).then((value) => {
    res.status(200).json(value);
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
