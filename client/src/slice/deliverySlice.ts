import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../appTypes";
const deliverInit: IOrder = {
  Amount: 0,
  C_id: "",
  DateOrdered: "",
  IsShipping: false,
  Name: "",
  Quantity: 0,
  U_id: "",
  Url: "",
  _id: "",
};
const deliverySlice = createSlice({
  initialState: deliverInit,
  name: "deliver",

  reducers: {
    SetDelivery: (state, action) => {
      state._id = action.payload._id;
      state.U_id = action.payload.U_id;
      state.Quantity = action.payload.Quantity;
      state.Name = action.payload.Name;
      state.Amount = action.payload.Amount;
      state.C_id = action.payload.C_id;
      state.DateOrdered = action.payload.DateOrdered;
      state.Url = action.payload.Url;
    },
    ResetDelivery: (state) => {
      state.Amount = 0;
      state.C_id = "";
      state.DateOrdered = "";
      state.IsShipping = false;
      state.Name = "";
      state.Quantity = 0;
      state.U_id = "";
      state.Url = "";
      state._id = "";
      return state;
    },
  },
});

export const { SetDelivery, ResetDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;
