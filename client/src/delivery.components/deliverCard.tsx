import { IOrder } from "../appTypes";

export default function DeliverCard({
  OrderObj,
  setter,
}: {
  OrderObj: IOrder;
  setter: (order: IOrder) => void;
}) {
  return (
    <div
      className="w-full rounded bg-gray-50 p-4 text-sm hover:bg-gray-100"
      onClick={() => {
        setter(OrderObj);
      }}
    >
      <h1>Cupcake : {OrderObj.Name}</h1>
      <h1>Order id :{OrderObj._id}</h1>
      <h1>
        Date Ordered : {new Date(OrderObj.dateOrdered).toLocaleDateString()}
      </h1>
    </div>
  );
}
