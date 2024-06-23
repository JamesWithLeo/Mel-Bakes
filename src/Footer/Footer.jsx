import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faLink } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function FooterComponent() {
  const about =
    "Your one-stop destination for delectable, handcrafted cupcakes that are as beautiful as they are delicious. At Mel Bakes, we believe in the magic of baking and the joy it brings to every celebration. Our cupcakes are made with the finest ingredients, from rich, creamy butter to fresh, seasonal fruits, ensuring every bite is a burst of flavor. Whether you're looking for classic vanilla, decadent chocolate, or unique seasonal creations, our cupcakes are perfect for any occasion. Join us at Mel Bakes, where every cupcake is a sweet masterpiece baked with love and passion.";

  const ceo =
    "Melia, the inspiring CEO of Mel Bakes, has turned a small local cupcake store into a renowned international cupcake producer. With a blend of business savvy and a deep love for baking, she skillfully manages every part of the business. Melia ensures every cupcake meets the highest quality standards, overseeing everything from product development to marketing and customer service. Her creative strategies include expanding the product range, adopting eco-friendly practices, and using social media to reach a global audience. Thanks to Melia's passionate and innovative leadership, Mel Bakes has grown from a favorite local bakery into a leading name in the cupcake world, bringing joy to customers worldwide with delicious, beautifully crafted treats.";

  const handleAbout = () => {
    document.querySelector("#content").innerHTML = about;
    document.getElementById("aboutButton").style.backgroundColor = "#2b2a35";
    document.getElementById("ceoButton").style.backgroundColor = "transparent";
    document.getElementById("ceoButton").style.color = "rgb(212, 170, 65)";
    document.getElementById("aboutButton").style.color = "goldenrod";
  };
  const handleCeo = () => {
    document.querySelector("#content").innerHTML = ceo;
    document.getElementById("ceoButton").style.backgroundColor = "#2b2a35";
    document.getElementById("aboutButton").style.backgroundColor =
      "transparent";
    document.getElementById("aboutButton").style.color = "rgb(212, 170, 65)";
    document.getElementById("ceoButton").style.color = "goldenrod";
  };
  return (
    <footer>
      <div className="AboutAndCeoWrapper">
        <div id="aboutWrapper">
          <h1>About us</h1>
          <p className="content">{about}</p>
          {/* <h1>The Ceo</h1>
          <p className='content'>{ceo}</p> */}
        </div>
      </div>

      <div className="customersServiceWrapper">
        <div id="contactUsWrapper">
          <h1>Contact Us</h1>
          <a href="/" className="customerServiceLinks">
            MelBakes@gmail.com
          </a>
          <a
            href="https://www.facebook.com/MelBakes"
            className="customerServiceLinks"
          >
            www.facebook.com/MelBakes
          </a>
          <h3>(+63) 091223456789</h3>
          <a href="/" className="customerServiceLinks">
            Branches
          </a>
        </div>
        <div id="faqsWrapper">
          <h1 id="faqsTitle">FAQ`S</h1>
          <a href="/" className="customerServiceLinks">
            <FontAwesomeIcon icon={faLink} className="linkIcon" />
            Order Process
          </a>
          <a href="/" className="customerServiceLinks">
            <FontAwesomeIcon icon={faLink} className="linkIcon" />
            Payment Methods
          </a>
          <a href="/" className="customerServiceLinks">
            <FontAwesomeIcon icon={faLink} className="linkIcon" />
            Returns and Refund
          </a>
          <a href="/" className="customerServiceLinks">
            <FontAwesomeIcon icon={faLink} className="linkIcon" />
            Allergy Information
          </a>
          <a href="/" className="customerServiceLinks">
            <FontAwesomeIcon icon={faLink} className="linkIcon" />
            Privacy Policy
          </a>
        </div>
      </div>

      <div id="logoutButtonWrapper">
        <button id="logoutButton">Log out</button>
      </div>

      <h1 id="author">
        CODED BY JAMES LEO <FontAwesomeIcon icon={faCode} id="endTag" />
      </h1>
    </footer>
  );
}
export default FooterComponent;
