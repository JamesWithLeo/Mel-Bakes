import './app.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import plaidPattern from './assets/images/pattern.svg';
import cupcakes from './data.js';
import ProductCard from './components/ProductCard.jsx';
import LoginAccount from './components/LoginAccount.jsx';
import Gallary from './components/GallerySlideshow.jsx';
import ViewProduct from './components/ViewProduct.jsx';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCode, faFilter, } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [user, IsUser] = useState(false);
  const [productModalDisplay, setProductModalDisplay] = useState(false);
  const [loginModalDisplay, setLoginModalDisplay] = useState(false);
  
  const Cupcake = cupcakes.map((cupcake) => {
    if (cupcake.isAvailable) {
      return <ProductCard 
                key={crypto.randomUUID()}
                ProductName={cupcake.name} 
                ProductImg={cupcake.image}
                ProductPrice={cupcake.price}
                ProductSelected={setProductModalDisplay}
                />
    } else { return null; }
  })


  return (
    <div id='bodyWrapper' style={{backgroundImage:`url(${plaidPattern})`}}>
      <div id='headerWrapper'>
        <header>
            <h1>Mel Bakes</h1>
            <div id='headerButton'>
              <FontAwesomeIcon icon={faShoppingCart} fontSize={22} id='cart'/>
              <button id='contactUsButton'>Contact Us</button>
            </div>
        </header>
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
            <button onClick={ ()=> {
              setLoginModalDisplay(true);
              }} id='loginButton'>
                Taste Now!
            </button>


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
        <footer>
          <div>
            <h1>About</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
          </div>
          <div>
            <h1>ingredients</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div>
            <h1>Customers Service</h1>
          </div>
          <div>
            <h1>Follow Us</h1>
          </div>
            <h1 id='author'>CODED BY JAMES LEO <FontAwesomeIcon icon={faCode} id='endTag'/>
            </h1>
        </footer>
      </div>
      <Outlet />
    </div>


  );
}
export default App;