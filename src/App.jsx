import {BrowserRouter,Router,Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Contact from './pages/Contact'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const [location,setLocation] = useState()
  const [openDropdown,setOpenDropdown] = useState(false)
  const {cartItem,setCartItem} = useCart()

  const getLocation = async()=>{
    navigator.geolocation.getCurrentPosition(async pos => {
      const {latitude,longitude} = pos.coords
      // console.log(latitude,longitude);

       const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
       try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
         setOpenDropdown(false)

        // console.log(exactLocation);
        

       } catch (error) {
      
        console.log(error);
        
       }


      
    })
  }
 
  useEffect(()=>{
    getLocation()
  },[])

  // Local storage work

  useEffect(() => {

    const storedCart = localStorage.getItem('cartItem')
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }

  }, []);

  // save data 

  useEffect(() => {

    console.log("Saving cart:", cartItem);

    localStorage.setItem('cartItem', JSON.stringify(cartItem))

  }, [cartItem])

  return (
    <BrowserRouter>
    <Navbar location={location} geolocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
    <Routes>
      
       <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
         <Route path='/products/:id' element={<SingleProduct />}></Route>
         <Route path='/category/:category' element={<CategoryProduct />}></Route> 
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        {/* <Route path="/cart" element={<Cart location={location} getLocation={getLocation} />} /> */}
        <Route path='/cart' element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation} />
        </ProtectedRoute>}></Route>
    </Routes>
    <Footer/>
    
    </BrowserRouter>
  )
}

export default App
