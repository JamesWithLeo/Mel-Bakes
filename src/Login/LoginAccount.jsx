// system
import { React } from "react"
import './LoginAccount.css';
import { ThemeProvider } from "styled-components";
import {CustomLink, Input, Button, PrimaryTheme, PrimaryThemeOutline} from '../Styled/Styled'
// system

// design assets 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// design assets


function LoginAccount({setDisplay}){
  
  const exitLogin = () => {
    setDisplay(false);
    document.body.style.overflowY = 'scroll'
  }

  return (
    <>
    <div id="loginWrapper__outsideWrapper" onClick={exitLogin}>
    </div>
    <div id='loginWrapper'>
      <FontAwesomeIcon icon={faRightFromBracket} id='exitLogin' onClick={exitLogin}/>

      <div id="tbLoginContainer">
        <Input type="text" placeholder="Enter gmail" id="gmailLoginTB" className="loginTB"/>
        <Input type="password" placeholder="Enter password" id="passwordLoginTB" className="loginTB"/>
        <Button theme={PrimaryTheme} id="LoginAccountButton">Login</Button>
        <p id="forgotAccountButton">Forgot Password</p>
        <p id="remeberAccountButton">Remember me</p>
        <CustomLink to={'Signin'} id="SignInButton" onClick={exitLogin}>Create Account</CustomLink>
      </div>

    </div>
    </>
  )
}
export default LoginAccount;