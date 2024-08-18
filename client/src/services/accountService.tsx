import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IAccount } from "../slice/authSlice";
import axios from "axios";

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document: IAccount) => {
      const response = await axios.post("/melbake/accounts/", document);
      console.log(response);
      const newId = response.data.insertedId;
      return { response, newId };
    },
    onSettled: (data, error, variables, context) => {
      queryClient.setQueryData(
        ["account"],
        (prevAccount: any) =>
          [
            ...prevAccount,
            {
              ...variables,
              _id: data?.newId,
            },
          ] as IAccount[],
      );
    },
  });
}
export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_id: string) => {
      const response = await axios.delete("/melbake/accounts/" + _id);
      console.log(response);
      return response;
    },
    onMutate: (_id: string) => {
      queryClient.setQueryData(["account"], (prevAccount: any) =>
        prevAccount?.filter((account: IAccount) => account._id !== _id),
      );
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (document: IAccount) => {
      const id = document._id;
      const response = await axios.put("/melbake/accounts/" + id, document);
      console.log(response);
      return response;
    },

    onMutate: (updateAccount: IAccount) => {
      queryClient.setQueryData(["account"], (prevAccounts: any) =>
        prevAccounts?.map((prevAccount: IAccount) =>
          prevAccount._id === updateAccount._id ? updateAccount : prevAccount,
        ),
      );
    },
  });
}
