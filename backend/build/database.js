"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.removeFromOrder = exports.insertToOrder = exports.insertToCart = exports.insertDocument = exports.fetchDocuments = exports.fetchCupcake = exports.findUserById = exports.findUser = void 0;
const mongodb_1 = require("mongodb");
const mongoDB = (uri) => {
    try {
        const client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        console.log("Database Connected!");
        return client;
    }
    catch (error) {
        console.log("Having problems with the database", error);
        throw error;
    }
};
exports.default = mongoDB;
function findUser(coll, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.findOne({ Gmail: value });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.findUser = findUser;
function findUserById(coll, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.findOne({ _id: new mongodb_1.ObjectId(value) });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.findUserById = findUserById;
function fetchCupcake(coll, cupcakeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.findOne({ _id: new mongodb_1.ObjectId(cupcakeId) });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.fetchCupcake = fetchCupcake;
function fetchDocuments(coll) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // fetch all document in the collection
            return yield coll.find().toArray();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.fetchDocuments = fetchDocuments;
function insertDocument(coll, documentObject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.insertOne(documentObject);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.insertDocument = insertDocument;
function insertToCart(coll, UserId, documentObject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return coll.updateOne({ _id: new mongodb_1.ObjectId(UserId) }, { $push: { Cart: documentObject } });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.insertToCart = insertToCart;
function insertToOrder(coll, UserId, documentObject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            coll.updateOne({ _id: new mongodb_1.ObjectId(UserId) }, { $push: { Orders: documentObject } });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.insertToOrder = insertToOrder;
function removeFromOrder(coll, userId, documentObject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return coll.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $pull: { Orders: documentObject } });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.removeFromOrder = removeFromOrder;
function removeFromCart(coll, UserId, documentObject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.updateOne({ _id: new mongodb_1.ObjectId(UserId) }, { $pull: { Cart: documentObject } });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.removeFromCart = removeFromCart;
