export default function OrderCard({ orderObj }) {
  async function cancelOrder() {
    const id = localStorage.getItem("id");
    const orderToRemove = JSON.stringify(orderObj);
    await fetch("/melbake/order/remove/" + id, {
      method: "POST",
      body: orderToRemove,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      await response.json().then((value) => {
        console.log(value);
      });
    });
  }
  return (
    <div className="rounded bg-gray-200 p-2">
      <h1>{orderObj.Cupcake}</h1>
      <h1>Quantity: {orderObj.Quantity}</h1>
      <h1>Total Price: {orderObj.Price}</h1>
      <button
        onClick={cancelOrder}
        className="rounded bg-red-200 px-2 py-1 text-sm text-red-500"
      >
        Cancel Order
      </button>
      <div className="flex items-center gap-2">
        <h1 className="text-sm text-gray-600"> Recieved order confirmation</h1>
        <button className="rounded bg-primary px-2 py-1 text-sm text-white">
          Confirm
        </button>
      </div>
    </div>
  );
}
