import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSortFlavor, useSortPrice } from "../services/productService";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function SortComponent({
  setVisibility,
}: {
  setVisibility: () => void;
}) {
  function exitModal() {
    setVisibility();
    document.body.style.overflowY = "scroll";
  }
  const { mutateAsync: sortProduct, isPending: isPendingSortFlavor } =
    useSortFlavor();

  const { mutateAsync: sortPrice, isPending: isPendingSortPrice } =
    useSortPrice();

  return (
    <>
      <div
        onClick={() => {
          exitModal();
        }}
        className="fixed z-20 h-dvh w-full"
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
          <h1 className="text-md font-redhat text-white">Sort by flavors</h1>

          <button
            className="rounded bg-gray-100 px-2 text-sm"
            onClick={() => {
              if (!isPendingSortFlavor) sortProduct("Strawberry");
              exitModal();
            }}
          >
            Strawberry
          </button>

          <button
            className="rounded bg-gray-100 px-2 text-sm"
            onClick={() => {
              if (!isPendingSortFlavor) sortProduct("Milk");
              exitModal();
            }}
          >
            Milk
          </button>

          <button
            className="rounded bg-gray-100 px-2 text-sm"
            onClick={() => {
              if (!isPendingSortFlavor) sortProduct("Chocolate");
              exitModal();
            }}
          >
            Chocolate
          </button>

          <button
            className="rounded bg-gray-100 px-2 text-sm"
            onClick={() => {
              if (!isPendingSortFlavor) sortProduct("Vanilla");
              exitModal();
            }}
          >
            Vanilla
          </button>
          <button
            className="rounded bg-gray-200 px-2 text-sm"
            onClick={() => {
              if (!isPendingSortFlavor) sortProduct("Cherry");
              exitModal();
            }}
          >
            Cherry
          </button>
        </section>

        <section className="flex w-full max-w-sm flex-col gap-2">
          <h1 className="text-md font-redhat text-white">Sort by price</h1>

          <button
            className="rounded bg-gray-100 px-2 text-sm"
            onClick={() => {
              if (!isPendingSortPrice) sortPrice("ascending");
              exitModal();
            }}
          >
            Low to high
          </button>
          <button
            className="rounded bg-gray-100 px-2 text-sm"
            onClick={() => {
              if (!isPendingSortPrice) sortPrice("descending");
              exitModal();
            }}
          >
            High to low
          </button>
        </section>
      </div>
    </>
  );
}
