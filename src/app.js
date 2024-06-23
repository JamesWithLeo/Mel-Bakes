// import './app.css';
import { Outlet } from "react-router-dom";
import { useState, useContext, createContext, lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
// major components
import FooterComponent from "./Footer/Footer.jsx";
import HeaderComponent from "./Header/Header.jsx";
// components
import plaidPattern from "./assets/images/pattern.svg";
import Gallary from "./GallerySlideshow/GallerySlideshow.jsx";

import cupcakes from "./data.js";
import Product from "./Product/Product.jsx";
import CartComponent from "./Product/CartComponent.jsx";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
// styled
import { Button, PrimaryTheme } from "./Styled/Styled.jsx";

import { AccountContext } from "./Context.jsx";
import Homepage from "./Home/Homepage.jsx";
import LoadingComponents from "./loading/LoadingComponent.jsx";
export const ViewProductContext = createContext(undefined);
export const ProductIndexContext = createContext(undefined);

const LoginAccount = lazy(() => import("./Login/LoginAccount.jsx"));
const ViewProduct = lazy(() => import("./Product/ViewProduct.jsx"));

function App() {
  const Account = useContext(AccountContext);
  const [IsUser, setIsUser] = useState(Account.IsLogged);
  // const [IsUser, setIsUser] = useState(true);

  const [cartModalDisplay, SetCartModalDisplay] = useState(false);

  const [loginModalDisplay, setLoginModalDisplay] = useState(false);
  // const [productModalDisplay, setProductModalDisplay] = useState(false);

  const [ViewProductDisplay, setViewProductDisplay] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  // const viewProductContext = useContext(ViewProductContext)

  return (
    <div id="bodyWrapper" style={{ backgroundImage: `url(${plaidPattern})` }}>
      {loginModalDisplay ? (
        <Suspense fallback={<LoadingComponents />}>
          <LoginAccount setDisplay={setLoginModalDisplay} />
        </Suspense>
      ) : null}

      {ViewProductDisplay ? (
        <Suspense fallback={<LoadingComponents />}>
          <ViewProduct
            setDisplay={setViewProductDisplay}
            productIndex={[productIndex]}
            setProductIndex={setProductIndex}
            ProductsObj={cupcakes}
          />
        </Suspense>
      ) : null}

      <div className="flex justify-center w-full z-0 bg-[#f4eeff] sticky top-0 drop-shadow-lg">
        <HeaderComponent setCartDisplayProp={SetCartModalDisplay} />
      </div>

      {cartModalDisplay ? (
        <CartComponent setDisplay={SetCartModalDisplay} />
      ) : null}

      <div
        id="mainWrapper"
        className="flex justify-center items-center w-full h-screen max-h-screen-lg max-h-[1000px]"
      >
        {IsUser ? (
          <>
            {/* <Gallary /> */}
            <Homepage />
          </>
        ) : (
          <main className="flex flex-col-reverse justify-between items-center max-w-7xl md:flex-row ">
            <div
              id="welcomeContainer"
              className="flex flex-col justify-between  text-justify p-4 md:w-1/2 lg:p-0 lg:pl-8"
            >
              <h1 className="font-[Lobster] my-2 text-[#424874] text-2xl md:text-3xl lg:text-5xl">
                Welcome to&#160;
                <span className="font-[Lobster] bg-[#424874] text-white py-0 px-2">
                  Mel Bakes.
                </span>
              </h1>
              <p className="my-2 font-[Raleway] text-[#424874] text-xs lg:text-sm">
                Every bite tells a story of freshness and flavor, Our
                deliciously baked cupcakes, cakes, and bread are crafted with
                the finest ingredients and a dash of love... Perfect for any
                occasion, Whether you’re celebrating a birthday wedding,
                holiday, or just indulging your sweet tooth, our delightful
                treats promise to bring joy and satisfaction. Discover the
                perfect blend of taste and quality with every order from Mel
                Bakes, your go-to destination for freshly baked goodness for all
                life's special moments.
              </p>

              <button
                className="w-max h-max self-center bg-[#424874] text-white px-4 py-2 rounded-sm"
                onClick={() => {
                  setLoginModalDisplay(true);
                  document.body.style.overflowY = "hidden";
                }}
                id="loginButton"
              >
                Taste Now!
              </button>
            </div>
            <div
              id="gallaryContainer"
              className="flex flex-col justify-between  items-center md:w-1/2"
            >
              <h1>{Account.Username}</h1>
              <Gallary />
            </div>
          </main>
        )}
      </div>

      <div
        id="productWrapper"
        className="flex justify-center w-full h-max bg-[#a6b1e1]"
      >
        <div
          id="productWrapper__wrapper"
          className="grid grid-cols-1 grid-rows-[.5fr 9.5fr] max-w-7xl px-4 py-2 gap-6"
        >
          <div id="filterWrapper" className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faFilter}
              fontSize={20}
              className="icon"
              id="filterIcon"
            />
            <button id="filterButton">Filter</button>
            <Button theme={PrimaryTheme}>Hello World</Button>
          </div>

          <div id="productContainerWrapper" className="py-4 px-8">
            <h1>Cupcakes</h1>
            <div
              id="productContainer"
              className="row-span-2 flex flex-row justify-center flex-wrap gap-6"
            >
              <ProductIndexContext.Provider value={setProductIndex}>
                <ViewProductContext.Provider value={setViewProductDisplay}>
                  <Product />
                </ViewProductContext.Provider>
              </ProductIndexContext.Provider>
            </div>
          </div>
        </div>
      </div>

      <div
        id="footerWrapper"
        className="flex justify-center w-full h-max bg-[#393646]"
      >
        <FooterComponent />
      </div>
      <Outlet />
    </div>
  );
}
export default App;
