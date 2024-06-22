import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, } from '@fortawesome/free-solid-svg-icons';

import { useContext } from 'react';
import { AccountContext, } from '../Context';

function HeaderComponent({setCartDisplayProp}) {
  const Account = useContext(AccountContext);
  
  const openCart = () => {
    setCartDisplayProp(true);
    document.body.style.overflowY = 'hidden'
  }
  return (
    <header className='flex justify-between items-center w-full h-14 max-h-max max-w-7xl px-4'>
      <h1 className='text-3xl font-[Lobster] text-[#424874]'>Mel Bakes</h1>
      <div id='headerButton'>

        {Account.IsLogged ?
          <FontAwesomeIcon 
            icon={faShoppingCart} 
            id='cart'
            onClick={openCart}/> :
          null
        }
        <button id='contactUsButton' className='border-solid border border-black px-3 py-1'>Contact Us</button>
      </div>
    </header>
  )
}
export default HeaderComponent;