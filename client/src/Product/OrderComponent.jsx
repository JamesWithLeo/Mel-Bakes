export default function OrderComponent({ OrderObj }) {
  return (
    <div className="flex h-max w-full justify-between bg-secondarylight p-2 md:px-4">
      <h1 className="font-[Raleway] text-xs text-gray-700 sm:text-sm">
        {OrderObj.Cupcake}
      </h1>
      <div>
        <h1 className="text-xs">Cupcake id : {OrderObj.C_id}</h1>
        {/* <h1 className="text-xs">Order id : {OrderObj.OrderId}</h1> */}
      </div>
      <div>
        <h1 className="text-end font-[Raleway] text-xs text-gray-700">
          Quantity : {OrderObj.Quantity}
        </h1>
        {OrderObj.Price ? (
          <h1 className="text-end font-[Raleway] text-xs text-gray-700">
            Price : &#8369;{OrderObj.Price}.00
          </h1>
        ) : (
          <h1 className="text-end font-[Raleway] text-xs text-gray-700">
            Price : --.--
          </h1>
        )}
      </div>
    </div>
  );
}
