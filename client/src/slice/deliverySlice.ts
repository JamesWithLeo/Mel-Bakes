import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder } from "../appTypes";

interface IDeliveryInit {
  current: IOrder | null;
}
const deliverInit: IDeliveryInit = {
  current: null,
};

const deliverySlice = createSlice({
  initialState: deliverInit,
  name: "deliver",
  reducers: {
    SetDelivery: (state, action: PayloadAction<IOrder>) => {
      const payload = action.payload;
      return {
        ...state,
        current: {
          ...payload,
        },
      };
    },
    ResetDelivery: (state) => {
      return {
        ...state,
        current: {
          Amount: 0,
          C_id: "",
          IsShipping: false,
          Name: "",
          Quantity: 0,
          U_id: "",
          Url: "",
          DateOrdered: "",
          _id: "",
          courierId: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      ShipDelivery.fulfilled,
      (state, action: PayloadAction<IOrder>) => {
        const payload = action.payload;
        return {
          ...state,
          current: {
            ...payload,
          },
        };
      },
    );
    builder.addCase(AbortDelivery.fulfilled, (state) => {
      return {
        ...state,
        current: null,
      };
    });
  },
});

export const ShipDelivery = createAsyncThunk(
  "deliver/SetDelivery",
  async ({
    Oid,
    CourierId,
    isShipping,
  }: {
    Oid: string;
    CourierId: string;
    isShipping: boolean;
  }) => {
    const response = await axios.put(
      "/melbake/order/",
      { IsShipping: isShipping, courierId: CourierId },
      {
        params: { oid: Oid },
      },
    );
    return response.data;
  },
);

export const AbortDelivery = createAsyncThunk(
  "deliver/AbortDelivery",
  async ({ Oid }: { Oid: string }) => {
    const response = await axios.put(
      "melbake/order/",
      { IsShipping: false, courierId: null },
      { params: { oid: Oid } },
    );
    return response.data;
  },
);

export const { ResetDelivery, SetDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;
