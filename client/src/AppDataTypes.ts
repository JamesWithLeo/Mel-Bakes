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

export type IOrder = IProduct & {
  U_id: string;
  Quantity: number;
  Amount: number;
  DateOrdered: string;
};

export type IAccount = {
  Type: "admin" | "user";
  _id: string;
  Gmail: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Contact: string;
  Address: string;
};
export type IAuthMessage = "Account doesn't exist" | null | "Wrong Password";
