import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faMinus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ProductIdContext } from "../app";
import { AuthConsumer } from "../authProvider";

function ViewProduct({ setDisplay, setLoginModal }) {
  const Auth = AuthConsumer();
  const id = useContext(ProductIdContext);

  const [cupcakeObj, setCupcakeObj] = useState({});
  const [flavors, setFlavors] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [status, setStatus] = useState(null);

  async function AddToCart() {
    let usersId = localStorage.getItem("id");
    let Cupcake = cupcakeObj.Name;
    let Quantity = quantity;
    let C_id = cupcakeObj._id;
    let Price = cupcakeObj.Price;
    let orderObj = JSON.stringify({ Cupcake, Quantity, C_id, Price });
    await fetch("/melbake/mycart/Add/" + usersId, {
      method: "POST",
      body: orderObj,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) {
        setStatus("Added");
        setTimeout(() => {
          setStatus(false);
        }, 3000);
      } else {
        setStatus("Can't Add to Cart");
      }
    });
  }

  useEffect(() => {
    async function fetchCupcake() {
      const destinationUrl = "melbake/cupcake/" + id;
      const response = await fetch(destinationUrl);

      await response.json().then((value) => {
        const cupcake = JSON.parse(value);
        setCupcakeObj(cupcake);

        const arrayFlavors = cupcake.Flavor.split(" ");
        const flavorElements = arrayFlavors.map((flavor) => {
          let cname;
          switch (flavor) {
            case "Strawberry":
              cname =
                "w-max rounded bg-pink-400 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
              break;
            case "Cherry":
              cname =
                "w-max rounded bg-red-500 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
              break;
            case "Chocolate":
              cname =
                "w-max rounded bg-stone-500 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
              break;
            case "Coffee":
              cname =
                "w-max rounded bg-stone-700 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
              break;
            default:
              cname =
                "w-max rounded bg-gray-400 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
          }
          return (
            <h1 className={cname} key={crypto.randomUUID()}>
              {flavor}
            </h1>
          );
        });
        setFlavors(flavorElements);
      });
    }
    fetchCupcake();
  }, [id]);

  const exitViewProduct = () => {
    setDisplay(false);
    document.body.style.overflowY = "scroll";
  };
  return (
    <>
      <div
        className="fixed z-10 flex h-svh w-full items-center justify-center bg-[#393664] opacity-70"
        id="ViewProduct__OutsideWrapper"
      ></div>

      <PanelGroup className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full flex-col bg-transparent sm:bottom-auto">
        <Panel
          className="h-full bg-transparent"
          onClick={exitViewProduct}
          defaultSize={25}
        >
          {status ? (
            <div className="absolute left-1/2 top-1/4 z-20 mx-auto h-max w-max -translate-x-1/2 rounded bg-primary px-2 py-1">
              <h1 className="font-[Raleway] text-xs font-bold text-white">
                {status}
              </h1>
            </div>
          ) : null}
        </Panel>
        <PanelResizeHandle className="h-4 w-full self-center rounded bg-gray-100" />

        <Panel
          className="flex flex-col items-center justify-between bg-white lg:justify-around"
          defaultSize={75}
        >
          <div className="flex w-full max-w-7xl flex-col">
            <button
              className="m-1 w-max self-end text-gray-300"
              onClick={exitViewProduct}
            >
              <FontAwesomeIcon
                icon={faXmark}
                id="exitViewProductIcon"
                className="sm:text-xl md:text-2xl lg:text-3xl"
              />
            </button>
          </div>
          <div
            className="inset-x-0 z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end overflow-y-scroll md:justify-center lg:rounded"
            id="ViewProduct__wrapper"
          >
            <div
              className="flex flex-col md:flex-row"
              id="productDetailsWrapper"
            >
              <div
                className="flex flex-col bg-transparent sm:flex-col md:w-1/2"
                id="productProfile"
              >
                <div className="ml-4 flex h-max w-max justify-center gap-4 rounded-md px-2 py-2 md:flex-col">
                  {/* {flavors} */}
                  {flavors ? flavors : null}
                </div>
                <div
                  className="flex h-full w-full flex-col items-center"
                  id="cupcakeImgWrapper"
                >
                  {cupcakeObj.Url ? (
                    <img
                      className="h-auto w-40 sm:w-64 md:w-80 lg:w-[26em]"
                      src={cupcakeObj.Url}
                      alt="cupcake"
                      id="productImgView"
                    />
                  ) : (
                    <div className="flex h-40 w-40 animate-pulse items-center justify-center rounded-lg bg-gray-100 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96"></div>
                  )}
                </div>
              </div>

              <div
                className="flex flex-col justify-center gap-1 md:w-1/2 md:gap-4"
                id="cartNav"
              >
                <div className="flex flex-col items-center rounded bg-white px-2">
                  {cupcakeObj.Name ? (
                    <h1
                      className="text-center font-[Raleway] text-xl font-medium text-primary md:text-2xl lg:text-3xl"
                      id="ProductName"
                    >
                      {cupcakeObj.Name}
                    </h1>
                  ) : (
                    <div className="mb-4 h-8 w-40 animate-pulse rounded-lg bg-gray-100 sm:h-8 sm:w-64 md:h-8 md:w-80 lg:h-16 lg:w-96" />
                  )}
                  {cupcakeObj.Price ? (
                    <p
                      className="items-center text-center font-[Raleway] text-sm text-[Goldenrod] md:text-2xl"
                      id="ProductPrice"
                    >
                      {cupcakeObj.Price}
                    </p>
                  ) : (
                    <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-100 sm:h-8 sm:w-64 md:h-8 md:w-80 lg:h-8 lg:w-96" />
                  )}
                </div>
                <div className="flex w-full justify-center rounded bg-white px-2">
                  <p className="text-justify text-xs">
                    {cupcakeObj.Description}
                  </p>
                </div>

                <div className="flex w-full items-center justify-center gap-4 px-2">
                  {cupcakeObj.Quantity ? (
                    <>
                      <button>
                        <FontAwesomeIcon
                          id="hearIcon"
                          icon={faHeart}
                          className="text-base text-gray-400"
                        />
                      </button>
                      <label
                        className="text-sm font-bold text-gray-400"
                        id="quantityLabel"
                      >
                        Quantity
                      </label>
                      <div
                        className="grid h-max w-max grid-cols-3 grid-rows-1 items-center justify-center rounded border-2 border-gray-400 align-middle"
                        id="quantityWrapper"
                      >
                        <button
                          className="px-2"
                          onClick={() => {
                            if (quantity !== 1) {
                              setQuantity(quantity - 1);
                            }
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-sm text-gray-400"
                            icon={faMinus}
                            id="minusQuantity"
                          />
                        </button>
                        <p
                          className="text-center text-xs font-bold text-gray-400"
                          id="quantityIndicator"
                        >
                          {quantity}
                        </p>
                        <button
                          className="px-2"
                          onClick={() => {
                            setQuantity(quantity + 1);
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-sm text-gray-400"
                            icon={faPlus}
                            id="plusQuantity"
                          />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-100 sm:h-8 sm:w-64 md:h-8 md:w-80 lg:h-8 lg:w-96" />
                  )}
                </div>

                <div className="flex flex-col items-center gap-2 p-2 md:p-0">
                  {cupcakeObj.Url ? (
                    <>
                      {Auth.user ? (
                        <>
                          <button
                            className="h-8 w-full bg-secondarylight text-xs text-primary sm:text-sm md:w-1/2 md:text-base"
                            id="addToCartButton"
                            onClick={AddToCart}
                          >
                            Add to Cart
                          </button>

                          <button
                            className="h-8 w-full bg-primary text-xs text-white sm:text-sm md:w-1/2 md:text-base"
                            id="chechOutButton"
                          >
                            Buy Now
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="h-8 w-full bg-secondarylight text-xs text-primary sm:text-sm md:w-1/2 md:text-base"
                            onClick={() => {
                              exitViewProduct();
                              document.body.style.overflowY = "hidden";
                              setLoginModal(true);
                            }}
                          >
                            Add to Cart
                          </button>
                          <button
                            className="h-8 w-full bg-primary text-xs text-white sm:text-sm md:w-1/2 md:text-base"
                            onClick={() => {
                              exitViewProduct();
                              document.body.style.overflowY = "hidden";
                              setLoginModal(true);
                            }}
                          >
                            Buy Now
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-100 sm:h-8 sm:w-64 md:h-8 md:w-80 lg:h-8 lg:w-96" />
                      <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-100 sm:h-8 sm:w-64 md:h-8 md:w-80 lg:h-8 lg:w-96" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </>
  );
}

export default ViewProduct;
