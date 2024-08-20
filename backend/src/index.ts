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
const port = process.env.PORT || 2024;

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
  fetchDocuments,
  insertDocument,
  findUserById,
  deleteDocumentById,
  updateDocumentById,
  findByU_Id,
  cancellOrder,
} from "./database.js";
import { ObjectId, WithId } from "mongodb";
const CLIENT = mongoDB(DB_URI);
// reference access to the database and collection
const DATABASE = CLIENT.db("MelBake");
const ACCOUNT_COLLECTION = DATABASE.collection("ACCOUNT");
const CUPCAKE_COLLECTION = DATABASE.collection("CUPCAKES");
const ORDER_COLLECTION = DATABASE.collection("ORDER");
const CART_COLLECTION = DATABASE.collection("CART");
const app = express();

app.use(express.json());

// get all cupcakes in the db
interface IProduct {
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
  await DATABASE.admin()
    .ping()
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((reason) => {
      res.status(200).json(reason);
    });
});
app.get("/melbake/cupcakes", async (req: Request, res: Response) => {
  async function destribute(array: any) {
    // destribute img from cloudinary
    let i: number;
    let cups: IProduct[] = [];
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
  await fetchDocuments(CUPCAKE_COLLECTION).then(async (cupcakes) => {
    destribute(cupcakes).then((value) => {
      res.status(200).json(value);
    });
  });
});
// get single cupcake
app.get("/melbake/cupcake/:id", async (req: Request, res: Response) => {
  let cupcake = await fetchCupcake(CUPCAKE_COLLECTION, req.params.id);
  if (cupcake) {
    await getAssetInfo(cupcake.PublicId).then((value) => {
      if (cupcake) {
        cupcake.Url = value;
      }
    });
    if (cupcake) {
      res.status(200).json(cupcake);
    } else {
      throw new Error("Cant find fetch document");
    }
  }
});
app
  .route("/melbake/order/:id")
  .get(async (req: Request, res: Response) => {
    await findByU_Id(ORDER_COLLECTION, req.params.id).then((value) => {
      res.status(200).json(value);
    });
  })
  .post(async (req: Request, res: Response) => {
    req.body._id = new ObjectId();
    req.body.U_id = new ObjectId(req.body.U_id);
    insertDocument(ORDER_COLLECTION, req.body).then((result) => {
      res.status(200).json(result);
    });
  })
  .delete(async (req: Request, res: Response) => {
    const OrderId = req.query.OrderId as string;
    await cancellOrder(ORDER_COLLECTION, OrderId, req.params.id).then(
      (response) => {
        res.status(200).json(response);
      },
    );
  });

// fetch user
app.get("/melbake/login/:gmail", async (req: Request, res: Response) => {
  await findUser(ACCOUNT_COLLECTION, req.params.gmail).then((value) => {
    res.status(200).json(value);
  });
});

// fetch accounts
app
  .route("/melbake/account/:id")
  .get(async (req: Request, res: Response) => {
    await findUserById(ACCOUNT_COLLECTION, req.params.id).then((value) => {
      res.status(200).json(value);
    });
  })
  .put(async (req: Request, res: Response) => {
    delete req.body._id;
    await updateDocumentById(ACCOUNT_COLLECTION, req.params.id, req.body).then(
      (value) => {
        res.status(200).json(value);
      },
    );
  });
//

// updating account. and deleting account
app
  .route("/melbake/accounts/:id")
  .put(async (req: Request, res: Response) => {
    delete req.body._id;
    await updateDocumentById(ACCOUNT_COLLECTION, req.params.id, req.body).then(
      (value) => {
        res.status(200).json(value);
      },
    );
  })
  .delete(async (req: Request, res: Response) => {
    await deleteDocumentById(ACCOUNT_COLLECTION, req.params.id).then(
      (value) => {
        res.status(200).json(value);
      },
    );
  });

// fetching all account, and inserting new one .
app
  .route("/melbake/accounts/")
  .get(async (req: Request, res: Response) => {
    await fetchDocuments(ACCOUNT_COLLECTION).then((value) => {
      res.status(200).json(value);
    });
  })
  .post(async (req: Request, res: Response) => {
    req.body._id = new ObjectId();
    await insertDocument(ACCOUNT_COLLECTION, req.body).then((value) => {
      res.status(200).json(value);
    });
  });
//

// add product to database
app.route("/melbake/product/").post(async (req: Request, res: Response) => {
  req.body._id = new ObjectId();
  insertDocument(CUPCAKE_COLLECTION, req.body).then((value) => {
    res.status(200).json(value);
  });
});

// update product,
app
  .route("/melbake/product/:id")
  .delete(async (req: Request, res: Response) => {
    await deleteDocumentById(CUPCAKE_COLLECTION, req.params.id).then(
      (value) => {
        res.status(200).json(value);
      },
    );
  })
  .put(async (req: Request, res: Response) => {
    delete req.body._id;
    await updateDocumentById(CUPCAKE_COLLECTION, req.params.id, req.body).then(
      (value) => {
        res.status(200).json(value);
      },
    );
  });

app.get("/melbake/profile/:id", async (req: Request, res: Response) => {
  await findUserById(ACCOUNT_COLLECTION, req.params.id).then((account) => {
    res.status(200).json(account);
  });
});
/// order middlewware
// get product
app.get("/melbake/order", async (req: Request, res: Response) => {
  try {
    await fetchDocuments(ORDER_COLLECTION).then((value) => {
      res.status(200).json(value);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/melbake/order/delete/:id", async (req: Request, res: Response) => {
  await deleteDocumentById(ORDER_COLLECTION, req.params.id).then((value) => {
    res.status(200).json(value);
  });
});
/// order middleware

/// cart middleware
// get all in the cart
app.route("/melbake/cart").get(async (req: Request, res: Response) => {
  try {
    await fetchDocuments(CART_COLLECTION).then((value) => {
      res.status(200).json(value);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app
  .route("/melbake/cart/:id")
  .get(async (req: Request, res: Response) => {
    try {
      await findByU_Id(CART_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post(async (req: Request, res: Response) => {
    req.body.U_id = new ObjectId(req.params.id);
    insertDocument(CART_COLLECTION, req.body).then((value) => {
      res.status(200).json(value);
    });
  })
  .delete(async (req: Request, res: Response) => {
    await deleteDocumentById(CART_COLLECTION, req.params.id).then((value) => {
      res.status(200).json(value);
    });
  });

app.route("/melbake/carts").delete(async (req: Request, res: Response) => {
  const ids = req.query.ids as string;
  const idsToDelete = ids.split(",");
  try {
    const p1 = await new Promise(() => {
      return idsToDelete.map(async (id) => {
        return deleteDocumentById(CART_COLLECTION, id).then((value) => {
          if (!value) return;
          const deletedId = String(value._id);
          return deletedId;
        });
      });
    });
    Promise.all([p1]).then((result) => {
      console.log(result);
    });
  } catch (error) {
    console.error(error);
  }
});

/// cart middleware

// add account to database
app.post("/melbake/signin/create", async (req: Request, res: Response) => {
  insertDocument(ACCOUNT_COLLECTION, req.body).then((value) => {
    res.status(200).json(value);
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
