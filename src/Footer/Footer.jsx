import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';


function FooterComponent(){
  return (
    <footer>
      <div>
        <h1>About</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupida  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
      </div>
      <div>
        <h1>ingredients</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ulla laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupida non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
  )
}
export default FooterComponent