import React from "react";
import './Signin.css';
import { Link } from "react-router-dom";
import plaidPattern from '../assets/images/pattern.svg';

function SigIn(){
  class Account {
    constructor(username, gmail, password){
      this._username = username
      this._gmail = gmail;
      this._password = password;
    }
    
  }
  function handleAccount(){
      
    var username = document.getElementById('usernameSigninTB').value;
    var gmail = document.getElementById('gmailSigninTB').value;
    var password = document.getElementById('passwordSigninTB').value;
    let account = new Account(username, gmail,password);

    console.log(account._gmail);
  }

  return (
    <div id="bodyWrapper" style={{backgroundImage:`url(${plaidPattern})`}}>
      <header>
        <h1>Hello World</h1>
      </header>

      <div id="mainWrapper">
        <main id="loginSigninWrapper">
          <Link to={'/'}>Back</Link>
          <div id="loginSigninWrapper__div">
            <input type="text" placeholder="Enter username" id="usernameSigninTB"/>
            <input type="text" placeholder="Enter gmail" id="gmailSigninTB"/>
            <input type="password" placeholder="Create password"/>
            <input type="password" placeholder="Confirm password" id="passwordSigninTB"/>
            <button onClick={handleAccount}>Sign in</button>
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