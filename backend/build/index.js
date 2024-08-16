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
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
            for (i = 0; i <= array.length; i++) {
                if (i === array.length) {
                    return cups;
                }
                yield (0, cloudinary_js_1.getAssetInfo)(array[i].PublicId).then((url) => {
                    array[i].Url = url;
                    cups.push(array[i]);
                });
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
    // convert the document to json then to object
    // cupcake = JSON.stringify(cupcake);
    // cupcake = JSON.parse(cupcake);
    if (cupcake) {
        yield (0, cloudinary_js_1.getAssetInfo)(cupcake.PublicId).then((value) => {
            // reference the Url to the cupcake object
            if (cupcake) {
                cupcake.Url = value;
                // cupcake = JSON.stringify(cupcake);
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
// fetch user
app.get("/melbake/login/:gmail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.findUser)(ACCOUNT_COLLECTION, req.params.gmail).then((value) => {
        res.status(200).json(value);
    });
}));
// fetch cart
app.get("/cart/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.findUserById)(ACCOUNT_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
    });
}));
// add product to cart
app.post("/melbake/mycart/add/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId();
    yield (0, database_js_1.insertToCart)(ACCOUNT_COLLECTION, req.params.id, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
// remove product from cart
app.post("/melbake/mycart/remove/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.removeFromCart)(ACCOUNT_COLLECTION, req.params.id, req.body).then((result) => {
        res.status(200).json(result);
    });
}));
// fetch orders of user
app.get("/orders/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.findUserById)(ACCOUNT_COLLECTION, req.params.id).then((value) => {
        if (value === null || value === void 0 ? void 0 : value.Orders)
            res.status(200).json(value.Orders);
    });
}));
app.post("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId(req.body._id);
    (0, database_js_1.insertDocument)(ORDER_COLLECTION, req.body).then((result) => {
        res.status(200).json(result);
    });
}));
// checkOut order
app.post("/melbake/myorder/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId();
    (0, database_js_1.insertToOrder)(ACCOUNT_COLLECTION, req.params.id, req.body).then((result) => {
        res.status(200).json({ result: "Product is Checked out!" });
    });
}));
// cancel order
app.post("/melbake/order/remove/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, database_js_1.removeFromOrder)(ACCOUNT_COLLECTION, req.params.id, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
/// account middleware
// fetch accounts
app.get("/melbake/account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.fetchDocuments)(ACCOUNT_COLLECTION).then((value) => {
        res.status(200).json(value);
    });
}));
// insert account
app.post("/melbake/account/insert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body._id = new mongodb_1.ObjectId();
    yield (0, database_js_1.insertDocument)(ACCOUNT_COLLECTION, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
// update account
app.post("/melbake/account/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    yield (0, database_js_1.updateDocumentById)(ACCOUNT_COLLECTION, req.params.id, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
// delete account
app.get("/melbake/account/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.deleteDocumentById)(ACCOUNT_COLLECTION, req.params.id).then((value) => {
        res.status(200).json(value);
    });
}));
/// account middleware
app.get("/melbake/profile/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_js_1.findUserById)(ACCOUNT_COLLECTION, req.params.id).then((account) => {
        res.status(200).json(account);
    });
}));
// add product to database
app.post("/melbake/product/insert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, database_js_1.insertDocument)(CUPCAKE_COLLECTION, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
app.post("/melbake/product/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body._id;
    yield (0, database_js_1.updateDocumentById)(CUPCAKE_COLLECTION, req.params.id, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
// add account to database
app.post("/melbake/signin/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, database_js_1.insertDocument)(ACCOUNT_COLLECTION, req.body).then((value) => {
        res.status(200).json(value);
    });
}));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
