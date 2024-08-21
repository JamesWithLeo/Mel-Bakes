import { Outlet } from "react-router-dom";
import { useState, createContext, lazy, Suspense } from "react";
import GuestHome from "./Home/GuestHome";
import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
import plaidPattern from "./assets/images/pattern.svg";
import Product from "./product.components/Product";

import Homepage from "./Home/Homepage";
import LoadingComponents from "./components/LoadingComponent";
import LoginModal from "./login-signin/LoginModal";
import SortComponent from "./product.components/SortComponent";
import { useSelector } from "react-redux";
import { AppState } from "./store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import FilterComponent from "./product.components/FilterComponent";
export const ViewProductContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export const ProductIdContext = createContext<
  React.Dispatch<React.SetStateAction<number>> | null | number
>(null);

const ViewProduct = lazy(() => import("./product.components/ViewProduct"));

function App() {
  const auth = useSelector((state: AppState) => state.auth);
  const [ViewProductDisplay, setViewProductDisplay] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [isSortModalVisible, setSortModalVisible] = useState<boolean>(false);

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

      {isSortModalVisible ? (
        <SortComponent
          setVisibility={() => {
            setSortModalVisible(false);
          }}
        />
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
          <span className="flex flex-1 gap-2">
            <button
              className="flex items-center gap-2 rounded border border-b-4 border-primary bg-white px-3 py-1 font-redhat text-primary active:border-b-2"
              onClick={() => {
                document.body.style.overflowY = "hidden";
                setSortModalVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faSort} />
              Sort
            </button>
            <button
              className="flex items-center gap-2 rounded border border-b-4 border-primary bg-white px-3 py-1 font-redhat text-primary active:border-b-2"
              onClick={() => {
                document.body.style.overflowY = "hidden";
                setFilterModalVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faFilter} />
              filter
            </button>
          </span>
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
