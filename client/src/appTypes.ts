export type IProduct = {
  _id: string;
  Name: string;
  C_id: string;
  Url: string;
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
  U_id: string;
  Quantity: number;
  Url: string;
  Amount: number;
  dateOrdered: number;
  timeOrdered: string;
  courierId: string;
  IsPacked: boolean;
  packedDate: string;
  shipDate: string;
  IsShipping: boolean;
  IsReceived: Boolean;
};

export type IReceived = IOrder & {
  _id: string;
  Name: string;
  C_id: string;
  U_id: string;
  Quantity: number;
  Url: string;
  Amount: number;
  DateOrdered: string;
  courierId: string;
  IsPacked: boolean;
  IsShipping: boolean;
  IsReceived: Boolean;
  dateReceived: string;
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
