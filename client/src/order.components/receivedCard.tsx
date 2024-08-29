import { useState } from "react";
import { IReceived } from "../appTypes";

export default function ReceivedCard({
  receivedOrder: order,
}: {
  receivedOrder: IReceived;
}) {
  const [isViewingDetails, setIsViewingDetails] = useState<boolean>(false);
  return (
    <>
      <main className="flex flex-row items-center justify-evenly rounded bg-gray-100 p-4 shadow">
        <div className="flex h-max w-2/5 flex-col items-center">
          <img src={order.Url} alt="cupcake" className="w-16" />
          <h1 className="font-raleway text-sm">{order.Name}</h1>
        </div>
        <div className="flex h-full w-full flex-col font-Redhat text-sm">
          <h1 className="text-xs">
            <span className="text-gray-500">Transaction Id:</span>
            {order.C_id}
          </h1>
          <h1 className="">
            <span className="text-gray-600">quantity:</span>
            {order.Quantity}
          </h1>
          <h1>
            <span className="text-gray-600">amount:</span>
            {order.Amount}
          </h1>
          <h1>
            <span className="text-gray-600">Place order on:</span>
            {order.dateOrdered}
          </h1>

          {!isViewingDetails ? (
            <button
              onClick={() => {
                setIsViewingDetails(true);
              }}
              className="self-end text-blue-800 underline underline-offset-2"
            >
              view details
            </button>
          ) : null}
          {isViewingDetails ? (
            <>
              <h1 className="mt-2 text-xs">Courier Id: {order.courierId}</h1>
              <h1>Packed on : {order.packedDate}</h1>
              <h1>Ship on : {order.shipDate}</h1>
              <h1>Received on : {order.dateReceived}</h1>

              <button
                onClick={() => {
                  setIsViewingDetails(false);
                }}
                className="self-end text-blue-800 underline underline-offset-2"
              >
                hide details
              </button>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
