import {React, useContext, createContext  } from "react";
import { Link } from "react-router-dom";
import Account from "../Account/Account.jsx";
import './Signin.css';
import plaidPattern from '../assets/images/pattern.svg';




function SigIn(){
  let newAccount = new Account();

  const HandleAccount = () => {
    const gmail = document.getElementById('gmailSigninTB').value;
    const password = document.getElementById('passwordSigninTB').value;
    // newAccount.setGmail(gmail);
    // newAccount.setPassword(password)

    const AccountContext = createContext(newAccount);
    const Account = useContext(AccountContext);
    console.log(Account)
  }
  
  return (
    <div id="bodyWrapper" style={{backgroundImage:`url(${plaidPattern})`}}>
      <header>
        <h1>Mel Bakes</h1>
      </header>

      <div id="mainWrapper">
        <main id="loginSigninWrapper">
          <Link to={'/'}>Back</Link>
          <div id="loginSigninWrapper__div">
            <input type="text" placeholder="Enter username" id="usernameSigninTB"/>
            <input type="text" placeholder="Enter gmail" id="gmailSigninTB"/>
            <input type="password" placeholder="Create password"/>
            <input type="password" placeholder="Confirm password" id="passwordSigninTB"/>
            <button onClick={HandleAccount}>Sign in</button>
          </div>
        </main>
      </div>

      <div id="footerWrapper">
        <footer>
          <h1>hello Melia</h1>
        </footer>
      </div>
    </div>
  )
}
export default SigIn;