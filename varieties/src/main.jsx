import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Shoedetails from './Shoedetails.jsx'
import Aboutus from './Aboutus.jsx'
import Register from './authentication/Register.jsx'
import Login from './authentication/login.jsx'
import Menubar from './Menubar.jsx'
import Cart from './cart.jsx'
import Checkout from './checkout.jsx'
import Payment from './payment.jsx'
import Admin from './Admin.jsx'




const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/shoedetails/:id',
      element: <Shoedetails />
    },
    {
      path: '/menubar',
      element: <Menubar />
    },
    {
      path: '/aboutus',
      element: <Aboutus />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/cart',
      element: <Cart />
    },

    {
      path: '/payment/:id',
      element: <Payment />
    },
    {
      path: '/admin',
      element: <Admin />
    }
  ]
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
