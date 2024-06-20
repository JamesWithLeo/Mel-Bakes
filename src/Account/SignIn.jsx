import {React, useContext,  } from "react";
import './SignIn.css';
import plaidPattern from '../assets/images/pattern.svg';
import FooterComponent from "../Footer/Footer";
import {  CustomLink, Input, PrimaryTheme } from "../Styled/Styled";

import { AccountContext } from "../Context.jsx";

function SignIn(){

  const Account = useContext(AccountContext);
  
  const handleCreateAccount = () => {
    Account.Username = document.getElementById('usernameSigninTB').value;
    Account.Gmail = document.getElementById('gmailSigninTB').value;
    Account.Password = document.getElementById('passwordSigninTB').value;
    Account.IsLogged = true
  }
  return (
    <div id="bodyWrapper" style={{backgroundImage:`url(${plaidPattern})`}}>

      <div id="headerWrapper">
        <header>
          <h1>Mel Bakes</h1>
        </header>
      </div>

      <div id="mainWrapper">
        <main id="loginSigninWrapper">
          <CustomLink to={'/'}>Back</CustomLink>
          <div id="loginSigninWrapper__div">
            <Input type="text" placeholder="Enter username" id="usernameSigninTB"/>
            <Input type="text" placeholder="Enter gmail" id="gmailSigninTB"/>
            <Input type="password" placeholder="Create password"/>
            <Input type="password" placeholder="Confirm password" id="passwordSigninTB"/>
            <CustomLink 
              theme={PrimaryTheme} 
              onClick={handleCreateAccount}
              to={'/'}>
                Sign in
            </CustomLink>
          </div>
        </main>
      </div>

      <div id="footerWrapper">
          <FooterComponent />
      </div>
    </div>
  )
}
export default SignIn;