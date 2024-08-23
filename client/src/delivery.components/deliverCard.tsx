import { IOrder } from "../appTypes";

export default function DeliverCard({
  OrderObj,
  viewOrder,
  setter,
}: {
  OrderObj: IOrder;
  viewOrder: () => void;
  setter: (order: IOrder) => void;
}) {
  return (
    <div
      className="w-full rounded p-4 text-sm shadow hover:bg-gray-100"
      onClick={() => {
        viewOrder();
        setter(OrderObj);
      }}
    >
      <h1>{OrderObj.Name}</h1>
      <h1>{OrderObj._id}</h1>
      <h1>Date Ordered : {OrderObj.DateOrdered}</h1>
      {/* <h1>Amount : {OrderObj.Amount}</h1> */}
      {/* <h1>Quantity : {OrderObj.Quantity}</h1> */}
    </div>
  );
}
