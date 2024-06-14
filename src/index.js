import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js';
import SigIn from './SignIn/Signin.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const route = createBrowserRouter([
  {path:"/", element:<App />},
  {path:"Signin/", element:<SigIn />}

])



const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>
);