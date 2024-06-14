import { React } from "react"
import './LoginAccount.css';
import { Link } from "react-router-dom";
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const CustomLink = Styled(Link)`
justify-self: center;
width: max-content;
height: max-content;
text-decoration: none;
color: #424874;
font-size: 14px;
background-color: white ;
padding: .6em 1.4em;
border-radius: .2em;
grid-column: 2;
grid-row: 5;
border: #424874 .1em solid;
`;
function LoginAccount({ displayProp, setDisplay}){

  return (
    <div id='loginWrapper' style={{display:displayProp}}>
      
      <FontAwesomeIcon icon={faRightFromBracket} id='exitLogin' onClick={()=>setDisplay(false)}/>

      <div id="tbLoginContainer">
        <input type="text" placeholder="Enter gmail" id="gmailLoginTB" className="loginTB"/>
        <input type="password" placeholder="Enter password" id="passwordLoginTB" className="loginTB"/>
        <button id="LoginAccountButton">Login</button>
        <p id="forgotAccountButton">Forgot Password</p>
        <p id="remeberAccountButton">Remember me</p>

        <CustomLink to={'Signin'} id="SignInButton" onClick={()=>setDisplay(false)}>Create Account</CustomLink>
      </div>

    </div>
  )
}
export default LoginAccount;