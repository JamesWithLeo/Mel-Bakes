import {React, useContext  } from "react";
import { Link } from "react-router-dom";
import './Account.css';
import plaidPattern from '../assets/images/pattern.svg';
import FooterComponent from "../Footer/Footer";
import { Button, CustomLink, Input, PrimaryTheme } from "../Styled/Styled";

import { AccountContext } from "../MyContext";

function Account(){
  const myContext = useContext(AccountContext);
  const handleCreateAccount = () => {
    myContext.Username = document.getElementById('usernameSigninTB').value;
    myContext.Gmail = document.getElementById('gmailSigninTB').value;
    myContext.Password = document.getElementById('passwordSigninTB').value;
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
            <Button theme={PrimaryTheme} onClick={handleCreateAccount}>Sign in</Button>
          </div>
        </main>
      </div>

      <div id="footerWrapper">
        <footer>
          <FooterComponent />
        </footer>
      </div>
    </div>
  )
}
export default Account;