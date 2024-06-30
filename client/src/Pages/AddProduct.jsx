import { faL } from "@fortawesome/free-solid-svg-icons";

function AddProduct({ setVisibility }) {
  return (
    <div className="flex w-1/2 flex-col bg-slate-500">
      <h1>Add/Ed Product</h1>
      <div className="grid grid-cols-2 gap-2 bg-slate-400">
        <h1>Name</h1>
        <input />
        <h1>Price</h1>
        <input />
        <h1>Flavor</h1>
        <input />
        <h1>Description</h1>
        <input />
        <h1>Item Quantity</h1>
        <input />
      </div>
      <button>Save</button>
      <button
        onClick={() => {
          setVisibility(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
}
export default AddProduct;
