import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Auth } from '../Auth/Auth'
import { PasswordChangeSuccess } from '../Auth/PasswordChangeSuccess'
import { Cart } from '../Cart/Cart'
import { Home } from '../Home/Home'
import { PaymentSuccess } from '../PaymentSuccess/PaymentSuccess'
import { Profile } from '../Profile/Profile'
import { RestaurantDetails } from '../Restuarant/RestaurantDetails'
import Search from '../Search/Search'

export const CustomerRouter = () => {

  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/account/:register' element={<Home/>}/>
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/my-profile/*' element={<Profile/>}/>
            <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
            <Route exact path='/password_change_success' element={<PasswordChangeSuccess/>}/>
        </Routes>
        <Auth/>
    </div>
  )
}
