import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { AbortDelivery } from "../slice/deliverySlice";
import LogutButton from "../components/LogoutButton";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

type RecieverType = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
};
export default function DeliveryControlPanel({
  refresh,
}: {
  refresh: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: AppState) => state.auth.User);
  const delivery = useSelector((state: AppState) => state.deliver.current);
  const [isHiding, setIsHiding] = useState<boolean>(false);
  const [receiver, setReciever] = useState<RecieverType | null>(null);
  const HandleAbort = async () => {
    if (!delivery?._id || !user?._id) return;
    dispatch(AbortDelivery({ Oid: delivery._id }));
    refresh();
    setReciever(null);
  };
  useEffect(() => {
    const fetchReceiver = async () => {
      const response = await axios.get("/melbake/account/" + delivery?.U_id);
      if (response.data && response.data._id) {
        const data = response.data;
        setReciever({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
        });
      }
    };
    if (delivery) fetchReceiver();
  }, [delivery]);
  return (
    <main className="flex w-full flex-col items-center">
      <section className="flex w-full flex-col bg-gradient-to-br from-primarylight from-30% p-4 shadow sm:max-w-md sm:rounded">
        <span className="flex justify-between">
          <h1 className="font-redhat font-medium text-darker">
            {user?.firstName} {user?.lastName}
          </h1>

          <LogutButton />
        </span>
        <h1 className="font-redhat text-xs text-darker">{user?._id}</h1>
        <h1 className="font-redhat font-medium text-darker">
          {user?.phoneNumber}
        </h1>

        <hr className="h-0.5 rounded bg-primarylight" />
        {delivery ? (
          <div className="flex flex-col font-Redhat">
            {isHiding ? (
              <button
                className="w-max self-end rounded-md px-3 py-1 align-middle font-Redhat text-base text-primary"
                onClick={() => {
                  setIsHiding(false);
                }}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
              </button>
            ) : (
              <>
                <button
                  className="absolute w-max self-end rounded-md px-3 py-1 align-middle font-Redhat text-base text-primary"
                  onClick={() => {
                    setIsHiding(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <h1>Cupcake : {delivery.Name}</h1>
                <h1>Cupcake id : {delivery.C_id}</h1>
                <h1>Order id :{delivery._id}</h1>
                <h1>Quantity : {delivery.Quantity}</h1>
                <h1>Amout : {delivery.Amount}</h1>
                <h1>Date {delivery.DateOrdered}</h1>
                <h1>
                  {receiver?.firstName} {receiver?.lastName}
                </h1>
                <h1>{receiver?.email}</h1>
                <h1>{receiver?.address}</h1>
                <button
                  onClick={HandleAbort}
                  className="w-max self-end rounded-md bg-gray-100 px-3 py-1 align-middle font-Redhat text-base text-primary hover:bg-white active:ring"
                >
                  abort
                </button>
              </>
            )}
          </div>
        ) : (
          <h1 className="text-sm text-gray-500">No current delivery</h1>
        )}
      </section>
    </main>
  );
}
