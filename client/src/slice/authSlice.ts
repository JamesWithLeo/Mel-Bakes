import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IAccount } from "../appTypes";

const userlocal = localStorage.getItem("melbakesUser");
const user: IAccount | null = userlocal ? JSON.parse(userlocal) : null;
type IAccountEditableFields =
  | "firstName"
  | "lastName"
  | "address"
  | "gender"
  | "dateOfBirth"
  | "phoneNumber";

interface ISetupData {
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  dateOfBirth: string;
}
interface IUserInit {
  User: IAccount | null;
}
const userInit: IUserInit = {
  User: user,
};
const authSlice = createSlice({
  initialState: userInit,
  name: "auth",
  reducers: {
    SetDisplayName: (state, action: PayloadAction<string>) => {
      if (state.User) {
        const updatedUser: IAccount = {
          ...state.User,
          displayName: action.payload,
        };
        console.log("dispatched", updatedUser);
        localStorage.setItem("melbakesUser", JSON.stringify(updatedUser));
        return {
          ...state,
          User: {
            ...updatedUser,
          },
        };
      }
    },
  },
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
    builder.addCase(update.fulfilled, (state, action) => {
      // state.User = action.payload.User;
      localStorage.setItem("melbakesUser", JSON.stringify(action.payload.User));
    });
    builder.addCase(bulkUpdate.fulfilled, (state, action) => {
      const payload = action.payload.User;
      if (!payload) {
        return { ...state };
      } else {
        if (payload.phoneNumber) {
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
        } else {
          return {
            ...state,
            User: {
              ...state.User,
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
        }
      }
    });
    builder.addCase(DeleteAccount.fulfilled, (state, action) => {
      localStorage.removeItem("melbakesUser");
      return {
        ...state,
        user: null,
      };
    });
    builder.addCase(DeleteAccount.rejected, (state) => {});
  },
});
const LoginRequest = async (email: string | null, uid: string | null) => {
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
      Email: string | null;
      Uid: string | null;
      DisplayName: string | null;
      PhoneNumber: string | null;
    },
    thunkApi,
  ) => {
    const document = await LoginRequest(Email, Uid);
    if (!document) {
      return Promise.reject("Account doesn't exist in database");
    }
    return document;
  },
);

const SigninRequest = async ({
  email,
  uid,
  phoneNumber,
  displayName,
}: {
  email: string | null;
  uid: string | null;
  phoneNumber: string | null;
  displayName: string | null;
}) => {
  return axios.post("/melbake/signin/", {
    email: email,
    uid: uid,
    role: "user",
    displayName: displayName,
    phoneNumber: phoneNumber,
  });
};
export const Signin = createAsyncThunk(
  "auth/Signin",
  async ({
    Email,
    Uid,
    PhoneNumber,
    DisplayName,
  }: {
    Email: string | null;
    Uid: string | null;
    PhoneNumber: string | null;
    DisplayName: string | null;
  }) => {
    const document = await SigninRequest({
      email: Email,
      uid: Uid,
      phoneNumber: PhoneNumber,
      displayName: DisplayName,
    });
    console.log(document);
    return document.data;
  },
);

export const DeleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({
    id,
    firebaseId,
    email,
  }: {
    id: string;
    firebaseId: string;
    email: string;
  }) => {
    try {
      const deleteResponse = await axios.delete("/melbake/account/" + id, {
        data: { id, firebaseId, email },
      });
      if (deleteResponse.data && deleteResponse.data.deletedCount) {
        return Promise.resolve();
      } else {
        return Promise.reject();
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
    case "dateOfBirth":
      return axios
        .put(`/melbake/account/` + id, {
          dateOfBirth: updatedValue,
        })
        .then((response) => response.data);

    case "phoneNumber":
      return axios
        .put(`/melbake/account/` + id, {
          phoneNumber: updatedValue,
        })
        .then((response) => response.data);
    case "gender":
      return axios
        .put(`/melbake/account/` + id, {
          gender: updatedValue,
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

const bulkUpdateRequest = async (id: string, updatedValues: ISetupData) => {
  console.log(updatedValues);

  const data = { ...updatedValues };
  console.log(data);
  return axios
    .put(`/melbake/account/` + id, data)
    .then((response) => response.data);
};
export const bulkUpdate = createAsyncThunk(
  "auth/bulkUpdate",
  async ({ id, updatedValues }: { id: string; updatedValues: ISetupData }) => {
    const document: IAccount = await bulkUpdateRequest(id, updatedValues);
    if (document && document._id) {
      localStorage.removeItem("melbakesUser");
      localStorage.setItem("melbakesUser", JSON.stringify(document));
      return { User: document };
    }
    return { User: null };
  },
);

export const { SetDisplayName } = authSlice.actions;
export default authSlice.reducer;
