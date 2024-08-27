"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// core module;
const dotenv = __importStar(require("dotenv"));
dotenv.config({ debug: false });
// API
if (!process.env.DB_USER ||
    !process.env.DB_CLUSTER ||
    !process.env.PORT ||
    !process.env.DB_PASSWORD) {
    process.exit;
}
const port = process.env.PORT || 2024;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// database for images
const cloudinary_js_1 = __importStar(require("./cloudinary.js"));
(0, cloudinary_js_1.default)();
// database . use dotenv
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const cluster = process.env.DB_CLUSTER;
const DB_URI = `mongodb+srv://${user}:${password}@${cluster}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const database_js_1 = __importStar(require("./database.js"));
const mongodb_1 = require("mongodb");
const CLIENT = (0, database_js_1.default)(DB_URI);
// reference access to the database and collection
const DATABASE = CLIENT.db("MelBake");
const ACCOUNT_COLLECTION = DATABASE.collection("ACCOUNT");
const CUPCAKE_COLLECTION = DATABASE.collection("CUPCAKES");
const ORDER_COLLECTION = DATABASE.collection("ORDER");
const CART_COLLECTION = DATABASE.collection("CART");
const RECEIVED_COLLECTION = DATABASE.collection("RECEIVED");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/melbake", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield DATABASE.admin()
        .ping()
        .then((value) => {
        res.status(200).json(value);
    })
        .catch((reason) => {
        res.status(200).json(reason);
    });
}));
app.get("/melbake/cupcakes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function destribute(array) {
        return __awaiter(this, void 0, void 0, function* () {
            // destribute img from cloudinary
            let i;
            let cups = [];
            if (array && array.length) {
                for (i = 0; i <= array.length; i++) {
                    if (i === array.length) {
                        return cups;
                    }
                    yield (0, cloudinary_js_1.getAssetInfo)(array[i].PublicId).then((url) => {
                        array[i].Url = url;
                        cups.push(array[i]);
                    });
                }
            }
        });
    }
    yield (0, database_js_1.fetchDocuments)(CUPCAKE_COLLECTION).then((cupcakes) => __awaiter(void 0, void 0, void 0, function* () {
        destribute(cupcakes).then((value) => {
            res.status(200).json(value);
        });
    }));
}));
// get single cupcake
app.get("/melbake/cupcake/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cupcake = yield (0, database_js_1.fetchCupcake)(CUPCAKE_COLLECTION, req.params.id);
    if (cupcake) {
        yield (0, cloudinary_js_1.getAssetInfo)(cupcake.PublicId).then((value) => {
            if (cupcake) {
                cupcake.Url = value;
            }
        });
        if (cupcake) {
            res.status(200).json(cupcake);
        }
        else {
            throw new Error("Cant find fetch document");
        }
    }
}));
app
    .route("/melbake/order/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.findByU_Id)(ORDER_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
    });
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    req.body.U_id = new mongodb_1.ObjectId(req.body.U_id);
    yield (0, database_js_1.updateDocumentById)(ORDER_COLLECTION, req.params.id, req.body)
        .then((value) => {
        res.status(200).json(value);
    })
        .catch((reason) => {
        res.status(500).json(reason);
    });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId();
    req.body.U_id = new mongodb_1.ObjectId(req.body.U_id);
    (0, database_js_1.insertDocument)(ORDER_COLLECTION, req.body).then((result) => {
        res.status(200).json(result);
    });
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrderId = req.query.OrderId;
    yield (0, database_js_1.removeOrder)(ORDER_COLLECTION, OrderId, req.params.id).then((response) => {
        res.status(200).json(response);
    });
}));
app
    .route("/melbake/received/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.findByU_Id)(RECEIVED_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
    });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId(req.body._id);
    req.body.U_id = new mongodb_1.ObjectId(req.body.U_id);
    req.body.courierId = new mongodb_1.ObjectId(req.body.courierId);
    req.body.dateReceived = new Date().toLocaleString();
    yield (0, database_js_1.insertDocument)(RECEIVED_COLLECTION, req.body)
        .then((value) => {
        res.status(200).json(value);
    })
        .catch((reason) => {
        res.status(500).json(reason);
    });
}));
// fetch accounts
app
    .route("/melbake/account/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.findUserById)(ACCOUNT_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
    });
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    yield (0, database_js_1.updateDocumentById)(ACCOUNT_COLLECTION, req.params.id, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
//
// updating account. and deleting account
app
    .route("/melbake/accounts/:id")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    yield (0, database_js_1.updateDocumentById)(ACCOUNT_COLLECTION, req.params.id, req.body).then((value) => {
        res.status(200).json(value);
    });
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.deleteDocumentById)(ACCOUNT_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
    });
}));
// fetching all account, and inserting new one .
app
    .route("/melbake/accounts/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.fetchDocuments)(ACCOUNT_COLLECTION).then((value) => {
        res.status(200).json(value);
    });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId();
    yield (0, database_js_1.insertDocument)(ACCOUNT_COLLECTION, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
//
// add product to database
app.route("/melbake/product/").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId();
    (0, database_js_1.insertDocument)(CUPCAKE_COLLECTION, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
// update product,
app
    .route("/melbake/product/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.deleteDocumentById)(CUPCAKE_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
    });
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    yield (0, database_js_1.updateDocumentById)(CUPCAKE_COLLECTION, req.params.id, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
app.get("/melbake/profile/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.findByU_Id)(ACCOUNT_COLLECTION, req.params.id).then((account) => {
        res.status(200).json(account);
    });
}));
// admin
app
    .route("/melbake/order/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_js_1.fetchDocuments)(ORDER_COLLECTION).then((value) => {
            res.status(200).json(value);
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oid = req.query.oid;
    yield (0, database_js_1.updateDocumentById)(ORDER_COLLECTION, oid, req.body).then((value) => {
        res.status(200).json(value);
    });
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oid = req.query.id;
    yield (0, database_js_1.deleteDocumentById)(ORDER_COLLECTION, oid).then((value) => {
        res.status(200).json(value);
    });
}));
app.route("/melbake/c/order/:oid").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ORDER_COLLECTION.findOne({ _id: new mongodb_1.ObjectId(req.params.oid) }).then((value) => {
        res.status(200).json(value);
    });
}));
/// cart middleware
// get all in the cart
app.route("/melbake/cart").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_js_1.fetchDocuments)(CART_COLLECTION).then((value) => {
            res.status(200).json(value);
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app
    .route("/melbake/cart/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_js_1.findByU_Id)(CART_COLLECTION, req.params.id).then((value) => {
            res.status(200).json(value);
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.U_id = new mongodb_1.ObjectId(req.params.id);
    (0, database_js_1.insertDocument)(CART_COLLECTION, req.body).then((value) => {
        res.status(200).json(value);
    });
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.deleteDocumentById)(CART_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
    });
}));
app.route("/melbake/carts").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.query.ids;
    const idsToDelete = ids.split(",");
    try {
        const p1 = yield new Promise(() => {
            return idsToDelete.map((id) => __awaiter(void 0, void 0, void 0, function* () {
                return (0, database_js_1.deleteDocumentById)(CART_COLLECTION, id).then((value) => {
                    if (!value)
                        return;
                    const deletedId = String(value._id);
                    return deletedId;
                });
            }));
        });
        Promise.all([p1]).then((result) => {
            console.log(result);
        });
    }
    catch (error) {
        console.error(error);
    }
}));
app.post("/melbake/signin/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body && req.body.uid && req.body.email)
        yield (0, database_js_1.insertDocument)(ACCOUNT_COLLECTION, req.body).then((value) => {
            res.status(200).json(value);
        });
    else {
        res.status(500).json("Can't insert user account");
    }
}));
app.get("/melbake/login/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const email = req.query.email;
    (0, database_js_1.findUserByEmail)(ACCOUNT_COLLECTION, email, uid)
        .then((value) => {
        res.status(200).json(value);
    })
        .catch((reason) => {
        res.status(500).json("Can't find document");
    });
}));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
