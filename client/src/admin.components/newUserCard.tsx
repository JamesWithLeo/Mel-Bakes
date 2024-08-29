import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IAccount } from "../appTypes";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRemoveNewUser } from "./new";

export default function NewUserCard({ account }: { account: IAccount }) {
  const { mutateAsync, isPending } = useRemoveNewUser();
  return (
    <main className="flex w-52 flex-col rounded border border-gray-100 border-transparent p-2 hover:bg-gray-50 lg:w-96 lg:p-4">
      <section className="flex items-center gap-2 self-end align-middle text-xs text-gray-400 lg:absolute">
        <button
          onClick={() => {
            if (account._id && !isPending) mutateAsync(account._id);
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </section>
      <span className="font-Redhat text-gray-400">
        <h1 className="text-sm text-primary lg:text-base">
          {account.firstName} {account.lastName}{" "}
          <span className="text-[12px] font-light text-gray-500">
            {account.role}
          </span>
        </h1>
        <h1 className="text-xs">{account._id}</h1>
      </span>
    </main>
  );
}
