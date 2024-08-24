export type IProduct = {
  _id: string;
  Name: string;
  C_id: string;
  Url: string;
  PublicId: string;
  Description: string;
  Flavor: string;
  Price: number;
  Stock: number;
};
export type FlavorTypes =
  | "Chocolate"
  | "Strawberry"
  | "Vanilla"
  | "Cherry"
  | "Coffee"
  | "Milk"
  | null;

export type IOrder = {
  _id: string;
  Name: string;
  C_id: string;
  IsShipping: boolean;
  U_id: string;
  Quantity: number;
  Url: string;
  Amount: number;
  DateOrdered: string;
};

export type IAccount = {
  role: "admin" | "user" | "courier" | "guest" | null;
  _id: string | null;
  displayName: string | null;
  uid: string | null;
  phoneNumber: string | null;
  gender: "male" | "female" | "othher";
  dateOfBirth: "string";
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
};
