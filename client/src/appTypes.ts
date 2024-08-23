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
  type: "admin" | "user" | "courier";
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
};

export type IAuthMessage = "Account doesn't exist" | null | "Wrong Password";
