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
          Name: "",
          Quantity: 0,
          U_id: "",
          Url: "",
          dateOrdered: 0,
          timeOrdered: "",
          _id: "",
          courierId: "",
          packedDate: "",
          shipDate: "",
          IsPacked: false,
          IsShipping: false,
          IsReceived: false,
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
    builder.addCase(HandOverDelivery.fulfilled, (state) => {
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
      {
        IsShipping: isShipping,
        courierId: CourierId,
        shipDate: new Date().toLocaleString(),
      },
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
      { IsShipping: false, courierId: null, shipDate: "" },
      { params: { oid: Oid } },
    );
    return response.data;
  },
);

export const HandOverDelivery = createAsyncThunk(
  "delivery/HandOverDelivery",
  async ({ Order }: { Order: IOrder }) => {
    const response = await axios.post("/melbake/received/" + Order._id, Order);

    console.log(response);
    if (response.data.insertedId) {
      return await axios
        .delete("/melbake/order/" + Order.U_id, {
          params: { OrderId: Order._id },
        })
        .then((value) => {
          console.log(value);
          return Promise.resolve();
        });
    }
    return Promise.reject("cant order to received collection insert document");
  },
);

export const { ResetDelivery, SetDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;
