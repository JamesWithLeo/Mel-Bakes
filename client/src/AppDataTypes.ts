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
export type IOrder = IProduct & {
  U_id: string;
  Quantity: number;
  Amount: number;
  DateOrdered: string;
};

export type IAccount = {
  type: "admin" | "user";
  _id: string;
  gmail: string;
  password: string;
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
};
export type IAuthMessage = "Account doesn't exist" | null | "Wrong Password";
