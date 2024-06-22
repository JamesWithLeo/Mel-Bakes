// system
import { React } from "react"
// design assets 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// design assets


function LoginAccount({setDisplay}){
  
  const exitLogin = () => {
    setDisplay(false);
    document.body.style.overflowY = 'scroll'
  }

  return (
    <>
    <div className='w-full h-svh z-10 fixed bg-[#393664] opacity-50 flex justify-center items-center' 
      id="loginWrapper__outsideWrapper" onClick={exitLogin}>
    </div>

    <div className="fixed bg-white w-screen sm:w-[500px] sm:h-max z-10 inset-x-0 mx-auto mt-36 rounded-md flex flex-col py-4 lg:py-12" 
      id='loginWrapper'>
      <button className='text-gray-300 align-middle mr-4 mb-4 self-end ' onClick={exitLogin} id='exitLogin' >
        <FontAwesomeIcon className='md:text-2xl lg:text-3xl'
          icon={faRightFromBracket}/>
      </button>

      <div className="flex flex-col gap-4 w-3/4 self-center" 
        id="tbLoginContainer">
        <input className='h-4 outline-primary py-4 px-2 bg-gray-100 self-center w-full md:h-10 md:pl-2 text-xs md:text-sm lg:text-base'
          type="text" placeholder="Enter gmail" id="gmailLoginTB" />

        <input className='h-4 outline-primary py-4 px-2 bg-gray-100 self-center w-full  md:h-10 md:pl-2 text-xs md:text-sm lg:text-base'
          type="password" placeholder="Enter password" id="passwordLoginTB" />

        <button id="LoginAccountButton" 
          className="bg-primary text-white rounded-sm text-xs md:text-sm h-max w-full self-center py-2 md:py-3 lg:px-4 align-middle text-center">Login</button>
        <div className="flex justify-between self-center w-full h-max">
          <p className="h-4 text-xs" id="remeberAccountButton">Remember me</p>
          <p className="h-4 text-xs" id="forgotAccountButton">Forgot Password</p>
        </div>
        <Link className='bg-white text-primary rounded-sm text-xs md:text-sm py-1 h-max  px-2 border-2 border-primary text-center w-max align-middle self-center' 
          to={'Signin'} id="SignInButton" onClick={exitLogin}>Create Account</Link>
      </div>

    </div>
    </>
  )
}
export default LoginAccount;