import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js';
import Account from './Account/Account.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const route = createBrowserRouter([
  {path:"/", element:<App />},
  {path:"Account/", element:<Account />}

])



const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>
);