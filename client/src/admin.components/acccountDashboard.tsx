import AccountTable from "./accountTable";

import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import LoadingPage from "../Pages/loadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IAccount } from "../slice/authSlice";
import {
  useCreateAccount,
  useDeleteAccount,
  useUpdateAccount,
} from "../services/accountService";
import axios from "axios";

function AccountDashboard() {
  const query = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await axios.get("/melbake/accounts/");
      return await response.data;
    },
  });

  const { mutateAsync: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();

  const { mutateAsync: deleteAccount, isPending: isDeletingAccount } =
    useDeleteAccount();
  const { mutateAsync: updateAccount, isPending: isUpdatingAccount } =
    useUpdateAccount();

  const HandleCreateAccount = async (account: IAccount) => {
    if (!isCreatingAccount) createAccount(account);
  };

  const HandleDeleteAccount = async (id: string) => {
    if (!isDeletingAccount) deleteAccount(id);
  };

  const HandleUpdateAccount = async (account: IAccount) => {
    if (!isUpdatingAccount) updateAccount(account);
  };

  if (query.isLoading)
    return (
      <LoadingPage>
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-3xl text-primary"
        />
      </LoadingPage>
    );
  if (query.error) return <Navigate to={"/admin"} replace />;

  return (
    <div className="flex h-full max-h-full w-full flex-col bg-white">
      {query.data ? (
        <AccountTable
          data={query.data}
          addRow={HandleCreateAccount}
          deleteRow={HandleDeleteAccount}
          updateRow={HandleUpdateAccount}
        />
      ) : null}
    </div>
  );
}
export default AccountDashboard;
