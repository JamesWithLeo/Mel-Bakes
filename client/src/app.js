// import './app.css';
import { Outlet } from "react-router-dom";
import { useState, createContext, lazy, Suspense, useEffect } from "react";
// major components
import GuestHome from "./Home/GuestHome.jsx";
import FooterComponent from "./Footer/Footer.jsx";
import HeaderComponent from "./Header/Header.jsx";
// components
import plaidPattern from "./assets/images/pattern.svg";

// import cupcakes from "./data.js";
import Product from "./Product/Product.jsx";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
// styled
import Homepage from "./Home/Homepage.jsx";
import LoadingComponents from "./loading/LoadingComponent.jsx";
import { AuthConsumer } from "./authProvider.js";
import LoginModal from "./Login/LoginModal.jsx";
import FilterComponent from './Product/FilterComponent.jsx'
export const ViewProductContext = createContext(undefined);
export const ProductIdContext = createContext(0);
// export const AccountContext = createContext(undefined);

const ViewProduct = lazy(() => import("./Product/ViewProduct.jsx"));


function App() {
  const Auth = AuthConsumer();
  useEffect(() => {
    console.log(Auth)
  }, [Auth])

  const [ViewProductDisplay, setViewProductDisplay] = useState(false);
  const [LoginModalDisplay, setLoginModalDisplay] = useState(false);
  const [filterModalDisplay, setFilterModalDisplay] = useState(false);
  const [productId, SetProductId] = useState(0);
  return (

    <div id="bodyWrapper" style={{ backgroundImage: `url(${plaidPattern})` }}>
      {ViewProductDisplay ? (
        <Suspense fallback={<LoadingComponents />}>
          <ProductIdContext.Provider value={productId}>
            <ViewProduct
              setDisplay={setViewProductDisplay} setLoginModal={setLoginModalDisplay}
            />
          </ProductIdContext.Provider>
        </Suspense>
      ) : null}
      {filterModalDisplay ?
        <FilterComponent setModalDisplay={setFilterModalDisplay} />
        : null}

      {LoginModalDisplay ?
        <LoginModal setDisplay={setLoginModalDisplay} />
        : null}

      <HeaderComponent />
      {Auth.user ? (
        <>
          <Homepage />
        </>
      ) : (
        <>
          <GuestHome setLoginModal={setLoginModalDisplay} />
        </>
      )}

      <div
        id="productWrapper"
        className="flex justify-center w-full h-max bg-[#a6b1e1] px-4 py-4 sm:px-8 "
      >
        <div
          id="productWrapper__wrapper"
          className="grid grid-cols-1 grid-rows-[.5fr 9.5fr] max-w-7xl gap-6 w-full"
        >
          <div id="filterWrapper" className="flex items-center gap-2 w-full text-primary">

            <button id="filterButton" onClick={() => {
              setFilterModalDisplay(true)
              document.body.style.overflowY = "hidden";

            }}>
              <FontAwesomeIcon
                icon={faFilter}
                fontSize={20}
                className="text-base"
                id="filterIcon"
              /> Filter</button>
          </div>



          <ProductIdContext.Provider value={SetProductId}>
            <ViewProductContext.Provider value={setViewProductDisplay}>
              <Product />
            </ViewProductContext.Provider>
          </ProductIdContext.Provider>
        </div>
      </div>


      <FooterComponent />

      <Outlet />
    </div >
  );
}
export default App;
