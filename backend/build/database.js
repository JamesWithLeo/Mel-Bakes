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
exports.cancellOrder = exports.updateDocumentById = exports.deleteDocumentById = exports.insertDocument = exports.fetchDocuments = exports.fetchCupcake = exports.findByU_Id = exports.findUserById = exports.findUser = void 0;
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
            console.error(error);
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
            console.error(error);
        }
    });
}
exports.findUserById = findUserById;
function findByU_Id(coll, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.find({ U_id: new mongodb_1.ObjectId(id) }).toArray();
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.findByU_Id = findByU_Id;
function fetchCupcake(coll, cupcakeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.findOne({ _id: new mongodb_1.ObjectId(cupcakeId) });
        }
        catch (error) {
            console.error(error);
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
            console.error(error);
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
            console.error(error);
        }
    });
}
exports.insertDocument = insertDocument;
function deleteDocumentById(coll, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.deleteDocumentById = deleteDocumentById;
function updateDocumentById(coll, id, document) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: document }, { returnDocument: "after" });
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.updateDocumentById = updateDocumentById;
function cancellOrder(coll, id, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.deleteOne({
                _id: new mongodb_1.ObjectId(id),
                U_id: new mongodb_1.ObjectId(uid),
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.cancellOrder = cancellOrder;
