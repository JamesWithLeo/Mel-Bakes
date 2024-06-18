import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, } from '@fortawesome/free-solid-svg-icons';
import { Button, PrimaryThemeOutline } from '../Styled/Styled';

import { useContext } from 'react';
import { AccountContext, } from '../Context';

function HeaderComponent({setCartDisplayProp}) {
  const Account = useContext(AccountContext);
  
  const openCart = () => {
    setCartDisplayProp(true);
    document.body.style.overflowY = 'hidden'
  }
  return (
    <header>
      <h1>Mel Bakes</h1>
      <div id='headerButton'>

        {/* {Account.IsLogged ?
          <FontAwesomeIcon 
            icon={faShoppingCart} 
            id='cart'
            onClick={openCart}/> :
          null
        } */}
        <FontAwesomeIcon 
            icon={faShoppingCart} 
            id='cart'
            onClick={openCart}/>

        <Button theme={PrimaryThemeOutline} id='contactUsButton'>Contact Us</Button>
      </div>
    </header>
  )
}
export default HeaderComponent;