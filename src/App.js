import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";
import Confirmed from "./components/OrderPlaced";

function App() {

  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<LandingPage/>}/>
           <Route path="/home" element={<Home/>}/>
           <Route path="/cart" element={<Cart/>}/>
           <Route path="/confirmed" element={<Confirmed/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;






/* {token?<Route path="/cart" element={<Cart token={token}/>}/>:<Route path="/login" element={<Login setToken={setToken}/>}/>} */