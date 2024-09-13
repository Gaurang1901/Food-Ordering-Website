import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { darkTheme } from './Theme/DarkTheme';
import { Routers } from './component/Routers/Routers';
import { getUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import { getRestaurantByUserId } from './component/State/Restaurant/restaurantaction';

function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)
  useEffect(()=>{
    dispatch(getUser(auth.jwt|| jwt))

    dispatch(findCart(jwt))
  }, [auth.jwt])
  useEffect(()=>{
    dispatch(getRestaurantByUserId(auth.jwt||jwt))
  },[auth.user])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <Navbar/> */}
      {/* <Home/> */}
      {/* <RestaurantDetails/> */}
      {/* <Cart/> */}
      {/* <Profile/> */}
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
