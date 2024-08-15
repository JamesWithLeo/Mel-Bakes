import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export type IProduct = {
  _id: string;
  Name: string;
  C_id: string;
  Url: string;
  PublicId: string;
  Description: string;
  Flavor: string;
  Price: number;
  Quantity: number;
};

export type IOrder = IProduct & {
  Price: number;
  IsCancel: boolean;
  IsDelivered: boolean;
  DateOrdered: string;
};

interface IOrderInit {
  orders: Array<IOrder> | null;
}
const orderInit: IOrderInit = {
  orders: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: orderInit,
  reducers: {
    setOrders(state, action) {
      return {
        ...state,
        orders: action.payload,
      };
      // state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});
const fetchOrdersRequest = async (UserId: string) => {
  return await axios.get("/orders/" + UserId).then((response) => {
    return response.data;
  });
};
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (id: string) => {
    return await fetchOrdersRequest(id);
  },
);
export const orderSliceReducer = orderSlice.actions;
export default orderSlice.reducer;
