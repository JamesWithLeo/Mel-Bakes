import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import { Button, PrimaryThemeOutline, GoldButtonTheme } from '../Styled/Styled';

function FooterComponent(){
  const about = "Your one-stop destination for delectable, handcrafted cupcakes that are as beautiful as they are delicious. At Mel Bakes, we believe in the magic of baking and the joy it brings to every celebration. Our cupcakes are made with the finest ingredients, from rich, creamy butter to fresh, seasonal fruits, ensuring every bite is a burst of flavor. Whether you're looking for classic vanilla, decadent chocolate, or unique seasonal creations, our cupcakes are perfect for any occasion. Join us at Mel Bakes, where every cupcake is a sweet masterpiece baked with love and passion."

  const ceo = "Melia, the inspiring CEO of Mel Bakes, has turned a small local cupcake store into a renowned international cupcake producer. With a blend of business savvy and a deep love for baking, she skillfully manages every part of the business. Melia ensures every cupcake meets the highest quality standards, overseeing everything from product development to marketing and customer service. Her creative strategies include expanding the product range, adopting eco-friendly practices, and using social media to reach a global audience. Thanks to Melia's passionate and innovative leadership, Mel Bakes has grown from a favorite local bakery into a leading name in the cupcake world, bringing joy to customers worldwide with delicious, beautifully crafted treats."

  const handleAbout = () => {
    document.querySelector('#content').innerHTML = about;
  }
  const handleCeo = () => {
    document.querySelector('#content').innerHTML = ceo;
  }
  return (
    <footer>
      <div className='AboutAndCeoWrapper'>

        <div id='aboutWrapper'>
          <button onClick={handleAbout} className='contentButton'>About Us</button>
          <button onClick={handleCeo} className='contentButton'>The Ceo</button>
          <p id='content'>{about}</p>
        </div>
        <div className='contentImg'></div>
      </div>

      <div className='customersServiceWrapper'>
        <div>
          <h1>Contact Us</h1>
          <h3>MelBakes@gmail.com</h3>
          <h3>www.facebook.com/MelBakes</h3>
          <h3>(+63) 091223456789</h3>
          <h3>Branches</h3>
        </div>
        <div>
          <h1>FAQ`S</h1>
          <h3>Order Process</h3>
          <h3>Payment Methods</h3>
          <h3>Returns and Refunds</h3>
          <h3>Allergy Information</h3>
          <h3>Privacy Policy</h3>
        </div>

      </div>
        
      <div id='logoutButtonWrapper'>
        <button id='logoutButton'>Log out</button>

      </div>
      
      <h1 id='author'>CODED BY JAMES LEO <FontAwesomeIcon icon={faCode} id='endTag'/>
      </h1>
    </footer>
  )
}
export default FooterComponent