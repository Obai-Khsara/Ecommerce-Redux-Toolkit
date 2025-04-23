import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Headers from './components/Headers';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import CartDetails from "./components/CartDetails"
import toast, { Toaster } from 'react-hot-toast';



function App() {

  return (
    <>
      <Headers/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/cart' element = {<CartDetails/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
