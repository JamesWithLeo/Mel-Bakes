import { MongoClient, Collection } from "mongodb";
declare const mongoDB: (uri: string) => MongoClient;
export default mongoDB;
export declare function findUser(coll: Collection, value: string): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
export declare function findUserById(coll: Collection, value: string): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
export declare function fetchCupcake(coll: Collection, cupcakeId: string): Promise<import("mongodb").WithId<import("bson").Document> | null>;
export declare function fetchDocuments(coll: Collection): Promise<import("mongodb").WithId<import("bson").Document>[]>;
export declare function insertDocument(coll: Collection, documentObject: Document): Promise<import("mongodb").InsertOneResult<import("bson").Document> | undefined>;
export declare function deleteDocumentById(coll: Collection, id: string): Promise<import("mongodb").DeleteResult | undefined>;
export declare function updateDocumentById(coll: Collection, id: string, document: any): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
export declare function insertToCart(coll: Collection, UserId: string, documentObject: any): Promise<import("mongodb").UpdateResult<import("bson").Document>>;
export declare function insertToOrder(coll: Collection, UserId: string, documentObject: any): Promise<void>;
export declare function removeFromOrder(coll: Collection, userId: string, documentObject: any): Promise<import("mongodb").UpdateResult<import("bson").Document>>;
export declare function removeFromCart(coll: Collection, UserId: string, documentObject: any): Promise<import("mongodb").UpdateResult<import("bson").Document>>;
