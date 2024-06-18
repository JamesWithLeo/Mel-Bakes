import './app.css';
import { Outlet } from 'react-router-dom';
import { useState, useContext, createContext, lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
// major components
import FooterComponent from './Footer/Footer.jsx';
import HeaderComponent from './Header/Header.jsx';
// components
import plaidPattern from './assets/images/pattern.svg';
import ProductCard from './Product/ProductCard.jsx';
import CartComponent from './Product/CartComponent.jsx';
import LoginAccount from './Login/LoginAccount.jsx';
import Gallary from './GallerySlideshow/GallerySlideshow.jsx';
import ViewProduct from './Product/ViewProduct.jsx';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, } from '@fortawesome/free-solid-svg-icons';
// styled
import { Button, PrimaryTheme,  } from './Styled/Styled.jsx';

import { AccountContext } from './Context.jsx';
import Homepage from './Home/Homepage.jsx';

import cupcakes from './data.js';
import Product from './Product/Product.jsx';
export const ViewProductContext = createContext(undefined);
export const ProductIndexContext = createContext(undefined);


function App() {

  const Account = useContext(AccountContext);
  const [IsUser, setIsUser] = useState(Account.IsLogged);
  // const [IsUser, setIsUser] = useState(true);



  const [cartModalDisplay, SetCartModalDisplay] = useState(false);

  const [loginModalDisplay, setLoginModalDisplay] = useState(false);
  const [productModalDisplay, setProductModalDisplay] = useState(false);

  const [ViewProductDisplay, setViewProductDisplay] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  // const viewProductContext = useContext(ViewProductContext)


  return (
    <div id='bodyWrapper' style={{backgroundImage:`url(${plaidPattern})`}}>

      <div id='headerWrapper' >
        <HeaderComponent setCartDisplayProp={SetCartModalDisplay}/>
      </div>

      {cartModalDisplay ? (
        <CartComponent setDisplay={SetCartModalDisplay}/>
        ) : (
          null
        )
      }

      {loginModalDisplay ? (
        <LoginAccount setDisplay={setLoginModalDisplay} />
          ) : (
        null
      )}

      
      {productModalDisplay ? (
        <ViewProduct setDisplay={setProductModalDisplay}/> 
        ) : ( 
          null 
        )
      }
      {ViewProductDisplay ? (
        <ViewProduct setDisplay={setViewProductDisplay} productIndex={[productIndex]} setProductIndex={setProductIndex}  ProductsObj={cupcakes}/> ) : null }

      <div id='mainWrapper'>
        {IsUser ? (
          <>
            {/* <Gallary /> */}
            <Homepage />
          </>
        ) : (
          <main>
          <div id='welcomeContainer'>
            <h1>Welcome to&#160;
              <span style={{
                backgroundColor:"#424874", 
                color:"white", padding:"0em .2em", 
                fontSize:"calc(16px + 2.8vw)"
                }}>Mel Bakes.
              </span>
            </h1>
            <p>Every bite tells a story of freshness and flavor,<br/> Our deliciously baked cupcakes, cakes, and bread are crafted with the finest ingredients and a dash of love... Perfect for any occasion, Whether you’re celebrating a birthday wedding, holiday, or just indulging your sweet tooth,<br /> our delightful treats promise to bring joy and satisfaction..<br/> Discover the perfect blend of taste and quality with every order from Mel Bakes, your go-to destination for freshly baked goodness for all life's special moments.
            </p>

            <ThemeProvider theme={PrimaryTheme}>
              <Button onClick={()=> {
                setLoginModalDisplay(true);
                document.body.style.overflowY = 'hidden';
                }} id='loginButton'>
                  Taste Now!
              </Button>
            </ThemeProvider>
          </div>
          <div id='gallaryContainer'>
            <h1>{Account.Username}</h1>
            <Gallary />
          </div>


        </main>
        )}

      </div>

      <div id='productWrapper'>
        <div id='productWrapper__wrapper'>

          <div id='filterWrapper'>
            <FontAwesomeIcon icon={faFilter} fontSize={20} className='icon' id='filterIcon'/>
            <button id='filterButton'>Filter</button>
            <Button theme={PrimaryTheme} >Hello World</Button>
          </div>

          <div id='productContainerWrapper'>
            <h1>Cupcakes</h1>
            <div id='productContainer'>
              
              <ProductIndexContext.Provider value={setProductIndex}>
                <ViewProductContext.Provider value={setViewProductDisplay}>
                  <Product />
                </ViewProductContext.Provider>
              </ProductIndexContext.Provider>

            </div>
          </div>

        </div>
      </div>

      <div id='footerWrapper'>
        <FooterComponent />
      </div>
      <Outlet />
    </div>


  );
}
export default App;