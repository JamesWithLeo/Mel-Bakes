import { Outlet } from "react-router-dom";
import { useState, createContext, lazy, Suspense } from "react";
// major components
import GuestHome from "./Home/GuestHome";
import FooterComponent from "./Footer/Footer";
import HeaderComponent from "./Header/Header";
// components
import plaidPattern from "./assets/images/pattern.svg";
import Product from "./Product/Product";

// icon
import Homepage from "./Home/Homepage";
import LoadingComponents from "./loading/LoadingComponent";
import LoginModal from "./Login/LoginModal";
import FilterComponent from "./Product/FilterComponent";
import { useSelector } from "react-redux";
import { AppState } from "./store";

export const ViewProductContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export const ProductIdContext = createContext<
  React.Dispatch<React.SetStateAction<number>> | null | number
>(null);

const ViewProduct = lazy(() => import("./Product/ViewProduct"));

function App() {
  const auth = useSelector((state: AppState) => state.auth);
  const [ViewProductDisplay, setViewProductDisplay] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [isFilterModalVisible, setFilterModalVisible] =
    useState<boolean>(false);
  const [productId, SetProductId] = useState(0);
  return (
    <div id="bodyWrapper" style={{ backgroundImage: `url(${plaidPattern})` }}>
      {ViewProductDisplay ? (
        <Suspense fallback={<LoadingComponents />}>
          <ProductIdContext.Provider value={productId}>
            <ViewProduct
              setDisplay={() => {
                setViewProductDisplay(false);
              }}
              setLoginModalVisibility={() => {
                setLoginModalVisible(!isLoginModalVisible);
              }}
            />
          </ProductIdContext.Provider>
        </Suspense>
      ) : null}

      {isFilterModalVisible ? (
        <FilterComponent
          setVisibility={() => {
            setFilterModalVisible(false);
          }}
        />
      ) : null}

      {isLoginModalVisible ? (
        <LoginModal
          onClose={() => {
            setLoginModalVisible(false);
          }}
        />
      ) : null}

      <HeaderComponent />
      {auth.User ? (
        <>
          <Homepage />
        </>
      ) : (
        <>
          <GuestHome setLoginModal={setLoginModalVisible} />
        </>
      )}

      <div
        id="productWrapper"
        className="flex h-max w-full justify-center bg-primarylight px-4 py-4 sm:px-8"
      >
        <div
          id="productWrapper__wrapper"
          className="grid-rows-[.5fr 9.5fr] grid w-full max-w-7xl grid-cols-1 gap-6"
        >
          <div
            id="filterWrapper"
            className="flex w-full items-center gap-2 text-primary"
          ></div>

          <ProductIdContext.Provider value={SetProductId}>
            <ViewProductContext.Provider value={setViewProductDisplay}>
              <Product />
            </ViewProductContext.Provider>
          </ProductIdContext.Provider>
        </div>
      </div>

      <FooterComponent />

      <Outlet />
    </div>
  );
}
export default App;
