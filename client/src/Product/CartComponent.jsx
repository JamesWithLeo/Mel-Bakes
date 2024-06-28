import "./CartComponent.css";

function CartComponent({ setDisplay }) {
  const exitCart = () => {
    setDisplay(false);
    document.body.style.overflowY = "scroll";
  };
  return (
    <>
      <div id="CardBackground" onClick={exitCart}></div>
      <div id="CartWrapper"></div>
    </>
  );
}
export default CartComponent;
