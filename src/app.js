import './app.css';
import { Outlet } from 'react-router-dom';
import { useState, } from 'react';
import { ThemeProvider } from 'styled-components';
// major components
import FooterComponent from './Footer/Footer.jsx';
import HeaderComponent from './Header/Header.jsx';
// components
import plaidPattern from './assets/images/pattern.svg';
import cupcakes from './data.js';
import ProductCard from './Product/ProductCard.jsx';
import LoginAccount from './Login/LoginAccount.jsx';
import Gallary from './GallerySlideshow/GallerySlideshow.jsx';
import ViewProduct from './Product/ViewProduct.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, } from '@fortawesome/free-solid-svg-icons';

import { Button, PrimaryTheme,  } from './Styled/Styled.jsx';

function App() {

  const [user, IsUser] = useState(false);
  const [loginModalDisplay, setLoginModalDisplay] = useState(false);
  const [productModalDisplay, setProductModalDisplay] = useState(false);
  

  const Cupcake = cupcakes.map((cupcake) => {
    if (cupcake.isAvailable) {
      return (
        <ProductCard 
                key={cupcake.id}
                ProductName={cupcake.name} 
                ProductImg={cupcake.image}
                ProductPrice={cupcake.price}
                ProductSelected={setProductModalDisplay}
        />
        )
    } else { return null; }
  })


  return (
    <div id='bodyWrapper' style={{backgroundImage:`url(${plaidPattern})`}}>

      <div id='headerWrapper'>
        <HeaderComponent />
      </div>

      {loginModalDisplay ? (
          <LoginAccount displayProp={'grid'} setDisplay={setLoginModalDisplay} />
        ) : (
        <LoginAccount displayProp={'none'} setDisplay={setLoginModalDisplay} />
      )}
      
      {productModalDisplay ? <ViewProduct setDisplay={setProductModalDisplay} displayProp={productModalDisplay}/> : null}

      <div id='mainWrapper'>
        {user ? (
          <h1>Hello</h1>
        ) : (
          <main>
          <div id='welcomeContainer'>
            <h1>Welcome to 
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
              <Button onClick={ ()=> {
                setLoginModalDisplay(true);
                }} id='loginButton'>
                  Taste Now!
              </Button>
            </ThemeProvider>
            


          </div>
          <div id='gallaryContainer'>
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
              {Cupcake}
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