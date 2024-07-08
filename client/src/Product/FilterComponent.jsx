export default function FilterComponent({ setModalDisplay }) {
  function exitModal() {
    setModalDisplay(false);
    document.body.style.overflowY = "scroll";
  }
  return (
    <>
      <div className="fixed z-10 h-screen w-full" onClick={exitModal} />

      <div className="fixed left-1/2 top-0 z-50 mx-auto flex h-2/3 w-full -translate-x-1/2 flex-col gap-4 rounded-b-lg bg-primary p-2 opacity-70 sm:w-11/12 md:p-4" />
      <div className="fixed left-1/2 top-0 z-50 mx-auto flex h-2/3 w-full -translate-x-1/2 flex-col gap-4 rounded-b-lg p-2 sm:w-11/12 md:p-4">
        <h1 className="text-2xl font-bold text-white">Filter</h1>
        <h1 className="text-white">Most popular</h1>
        <h1 className="text-white">All time best</h1>
        <h1 className="text-white">Premium</h1>
        <h1 className="text-white">Classic</h1>

        <h1 className="text-white">Price</h1>
      </div>
    </>
  );
}
