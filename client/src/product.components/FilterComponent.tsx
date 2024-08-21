import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFilterFlavor } from "../services/productService";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function FilterComponent({
  setVisibility,
}: {
  setVisibility: () => void;
}) {
  function exitModal() {
    setVisibility();
    document.body.style.overflowY = "scroll";
  }
  const { mutateAsync: filterProduct, isPending } = useFilterFlavor();
  return (
    <>
      <div
        onClick={() => {
          exitModal();
        }}
        className="fixed z-10 h-dvh w-full"
      />
      <div className="fixed z-20 flex h-dvh w-full flex-col items-center gap-4 bg-primary bg-opacity-50 px-4 py-4 pb-8 backdrop-blur sm:px-4">
        <button
          className="w-max self-start text-white"
          onClick={() => {
            exitModal();
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <section className="flex w-full max-w-sm flex-col gap-2">
          <span className="flex w-full justify-between">
            <h1 className="text-md font-redhat text-white">
              Filter By Flavors
            </h1>

            <button
              className="rounded bg-red-300 px-2 text-sm"
              onClick={() => {
                if (!isPending) filterProduct(null);
                exitModal();
              }}
            >
              Reset
            </button>
          </span>
          <>
            <button
              className="rounded bg-gray-100 px-2 text-sm"
              onClick={() => {
                if (!isPending) filterProduct("Strawberry");
                exitModal();
              }}
            >
              Strawberry
            </button>

            <button
              className="rounded bg-gray-100 px-2 text-sm"
              onClick={() => {
                if (!isPending) filterProduct("Milk");
                exitModal();
              }}
            >
              Milk
            </button>

            <button
              className="rounded bg-gray-100 px-2 text-sm"
              onClick={() => {
                if (!isPending) filterProduct("Chocolate");
                exitModal();
              }}
            >
              Chocolate
            </button>

            <button
              className="rounded bg-gray-100 px-2 text-sm"
              onClick={() => {
                if (!isPending) filterProduct("Vanilla");
                exitModal();
              }}
            >
              Vanilla
            </button>
            <button
              className="rounded bg-gray-200 px-2 text-sm"
              onClick={() => {
                if (!isPending) filterProduct("Cherry");
                exitModal();
              }}
            >
              Cherry
            </button>
          </>
        </section>
      </div>
    </>
  );
}
