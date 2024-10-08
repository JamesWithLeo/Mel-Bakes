import { MongoClient, Collection } from "mongodb";
declare const mongoDB: (uri: string) => MongoClient;
export default mongoDB;
export declare function findUserByEmail(coll: Collection, Email: string, Uid: string): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
export declare function findUserById(coll: Collection, value: string): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
export declare function findByU_Id(coll: Collection, id: string): Promise<import("mongodb").WithId<import("bson").Document>[] | undefined>;
export declare function fetchCupcake(coll: Collection, cupcakeId: string): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
export declare function fetchDocuments(coll: Collection): Promise<import("mongodb").WithId<import("bson").Document>[] | undefined>;
export declare function insertDocument(coll: Collection, documentObject: Document): Promise<import("mongodb").InsertOneResult<import("bson").Document> | undefined>;
export declare function deleteDocumentById(coll: Collection, id: string): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
export declare function updateDocumentById(coll: Collection, id: string, document: any): Promise<import("mongodb").WithId<import("bson").Document> | null | undefined>;
export declare function removeOrder(coll: Collection, id: string, uid: string): Promise<import("mongodb").DeleteResult | undefined>;
