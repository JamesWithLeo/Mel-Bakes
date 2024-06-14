import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, } from '@fortawesome/free-solid-svg-icons';

function HeaderComponent() {
  return (
    <header>
      <h1>Mel Bakes</h1>
      <div id='headerButton'>
        <FontAwesomeIcon icon={faShoppingCart} id='cart'/>
        {/* <Button theme={PrimaryThemeOutline} id='contactUsButton'>Contact Us</Button> */}
      </div>
    </header>
  )
}
export default HeaderComponent;