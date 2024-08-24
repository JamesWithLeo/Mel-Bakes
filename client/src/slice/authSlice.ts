import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IAccount } from "../appTypes";

const userlocal = localStorage.getItem("melbakesUser");
const user: IAccount | null = userlocal ? JSON.parse(userlocal) : null;
type IAccountEditableFields = "firstName" | "lastName" | "address";

interface IUserInit {
  User: IAccount | null;
}
const userInit: IUserInit = {
  User: user,
};
const authSlice = createSlice({
  initialState: userInit,
  name: "auth",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      Login.fulfilled,
      (state, action: PayloadAction<IAccount>) => {
        const payload = action.payload;
        localStorage.setItem("melbakesUser", JSON.stringify(payload));
        return {
          ...state,
          User: {
            email: payload.email,
            phoneNumber: payload.phoneNumber,
            displayName: payload.displayName,
            uid: payload.uid,
            _id: payload._id,
            role: payload.role,
            gender: payload.gender,
            dateOfBirth: payload.dateOfBirth,
            firstName: payload.firstName,
            lastName: payload.lastName,
            address: payload.address,
          },
        };
      },
    );
    builder.addCase(Login.rejected, (state) => {
      localStorage.removeItem("melbakesUser");
    });
    builder.addCase(
      Signin.fulfilled,
      (state, action: PayloadAction<IAccount>) => {
        // const payload = action.payload;
        // localStorage.setItem("melbakesUser", JSON.stringify(payload));
        // return {
        //   ...state,
        //   User: {
        //     email: payload.email,
        //     phoneNumber: payload.phoneNumber,
        //     displayName: payload.displayName,
        //     uid: payload.uid,
        //     _id: payload._id,
        //     role: payload.role,
        //     firstName: payload.firstName,
        //     lastName: payload.lastName,
        //     address: payload.address,
        //   },
        // };
      },
    );
    builder.addCase(update.fulfilled, (state, action) => {
      // state.User = action.payload.User;
      localStorage.setItem("melbakesUser", JSON.stringify(action.payload.User));
    });
    builder.addCase(DeleteAccount.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload) {
      }
    });
  },
});
const LoginRequest = async (email: string, uid: string) => {
  return axios
    .get("/melbake/login/", {
      params: { uid: uid, email: email },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((response) => {
      console.log(response);
      return response;
    });
};

export const Login = createAsyncThunk(
  "auth/Login",
  async (
    {
      Email,
      Uid,
      DisplayName,
      PhoneNumber,
    }: {
      Email: string;
      Uid: string;
      DisplayName: string | null;
      PhoneNumber: string | null;
    },
    thunkApi,
  ) => {
    const document = await LoginRequest(Email, Uid);
    console.log(document);
    if (!document) {
      return Promise.reject(null);
    }
    document.displayName = DisplayName;
    document.phoneNumber = PhoneNumber;
    return document;
  },
);

const SigninRequest = async (
  email: string,
  uid: string,
  firstName: string,
  lastName: string,
  address: string,
  gender: string,
  dateOfBirth: string,
) => {
  return axios.post("/melbake/signin/", {
    email: email,
    uid: uid,
    role: "user",
    firstName: firstName,
    lastName: lastName,
    address: address,
    gender: gender,
    dateOfBirth: dateOfBirth,
  });
};
export const Signin = createAsyncThunk(
  "auth/Signin",
  async ({
    Email,
    Uid,
    FirstName,
    LastName,
    Address,
    Gender,
    DateOfBirth,
  }: {
    Email: string;
    Uid: string;
    Address: string;
    FirstName: string;
    LastName: string;
    Gender: string;
    DateOfBirth: string;
  }) => {
    const document = await SigninRequest(
      Email,
      Uid,
      FirstName,
      LastName,
      Address,
      Gender,
      DateOfBirth,
    );
    console.log(document);
    return document.data;
  },
);

const DeleteAccountRequest = async (id: string) => {
  const account = await axios.get("/melbake/account/" + id);
  if (account.data) return account;
};

export const DeleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({ id, password }: { id: string; password: string }) => {
    try {
      const response = await DeleteAccountRequest(id);
      console.log(response);

      if (
        response &&
        response.status === 200 &&
        response.data.Password === password
      ) {
        const deleteResponse = await axios.delete(
          "/melbake/accounts/" + response.data._id,
        );
        console.log(deleteResponse);
        return deleteResponse;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
);

const updateRequest = async (
  id: string,
  fieldToUpdate: IAccountEditableFields,
  updatedValue: string | number,
) => {
  switch (fieldToUpdate) {
    case "firstName":
      return axios
        .put(`/melbake/account/` + id, {
          firstName: updatedValue,
        })
        .then((response) => response.data);
    case "lastName":
      return axios
        .put(`/melbake/account/` + id, {
          lastName: updatedValue,
        })
        .then((response) => response.data);
    case "address":
      return axios
        .put(`/melbake/account/` + id, {
          address: updatedValue,
        })
        .then((response) => response.data);
  }
};

export const update = createAsyncThunk(
  "auth/update",
  async (
    {
      id,
      field,
      value,
    }: { id: string; field: IAccountEditableFields; value: string | number },
    thunkApi,
  ) => {
    try {
      const document: IAccount = await updateRequest(id, field, value);
      if (!document) return { User: null };
      localStorage.removeItem("melbakesUser");
      localStorage.setItem("melbakesUser", JSON.stringify(document));
      return { User: document };
    } catch (error) {
      return { User: null };
    }
  },
);
export default authSlice.reducer;
