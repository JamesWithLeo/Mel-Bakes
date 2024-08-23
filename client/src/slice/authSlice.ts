import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IAccount, IAuthMessage } from "../appTypes";

const userlocal = localStorage.getItem("melbakesUser");
const user: IAccount | null = userlocal ? JSON.parse(userlocal) : null;
type IAccountEditableFields = "firstName" | "lastName" | "contact" | "address";

interface IUserInit {
  User: IAccount | null;
  AuthMessage: null | string;
  LoginTriesCount: number;
}
const userInit: IUserInit = {
  User: user ? user : null,
  AuthMessage: null,
  LoginTriesCount: 0,
};
const authSlice = createSlice({
  initialState: userInit,
  name: "auth",
  reducers: {
    ResetAuthMessage: (state) => {
      state.AuthMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled, (state, action) => {
      state.User = action.payload.User;
      state.AuthMessage = action.payload.AuthMessage;
      localStorage.setItem("melbakesUser", JSON.stringify(action.payload.User));
    });
    builder.addCase(Login.rejected, (state) => {
      state.User = null;
      localStorage.removeItem("melbakesUser");
    });
    builder.addCase(Logout.fulfilled, (state, action) => {
      state.User = null;
      state.AuthMessage = null;
      localStorage.removeItem("melbakesUser");
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.User = action.payload.User;
      localStorage.setItem("melbakesUser", JSON.stringify(action.payload.User));
    });
    builder.addCase(DeleteAccount.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        state.User = null;
      }
    });
  },
});
const LoginRequest = async (email: string) => {
  return axios
    .get("/melbake/login/" + email)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      return response;
    });
};

export const Login = createAsyncThunk(
  "auth/Login",
  async (
    { email, password }: { email: string; password: string },
    thunkApi,
  ) => {
    type returnType = {
      User: null | IAccount;
      AuthMessage: IAuthMessage | null;
    };
    const document = await LoginRequest(email);
    if (!document) {
      const authloginResult: returnType = {
        User: null,
        AuthMessage: "Account doesn't exist",
      };
      return authloginResult;
    }
    if (document.Password && document.Password !== password) {
      const authloginResult: returnType = {
        User: null,
        AuthMessage: "Wrong Password",
      };
      return authloginResult;
    }
    delete document.Password;
    const authloginResult: returnType = {
      User: document,
      AuthMessage: null,
    };
    return authloginResult;
  },
);

export const Logout = createAsyncThunk("auth/Logout", async () => {
  return;
});

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
    case "contact":
      return axios
        .put(`/melbake/account/` + id, {
          contact: updatedValue,
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
export const { ResetAuthMessage } = { ...authSlice.actions };
export default authSlice.reducer;
