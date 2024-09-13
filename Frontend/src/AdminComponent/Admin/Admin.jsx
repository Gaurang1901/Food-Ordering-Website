import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { getIngredientofRestaurant, getIngredientsCategory } from '../../component/State/Ingredients/Action'
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action'
import { getRestaurantsCategory } from '../../component/State/Restaurant/restaurantaction'
import { Dashboard } from '../Dashboard/Dashboard'
import { FoodCategory } from '../FoodCategory/FoodCategory'
import { CreateMenuForm } from '../Menu/CreateMenuForm'
import { Menu } from '../Menu/Menu'
import { Orders } from '../Orders/Orders'
import { AdminSideBar } from './AdminSideBar'
import { Events } from './Events/Events'
import { Ingredients } from './Ingredients/Ingredients'
import { RestaurantDetails } from './RestaurantDetails'
import { AdminNavbar } from './AdminNavbar'

export const Admin = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false)
  const {restaurant} =useSelector(store=>store)
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  

  useEffect(()=>{
    dispatch(
      getIngredientsCategory({ jwt, id: restaurant.usersRestaurant?.id })
    );
    dispatch(
      getIngredientofRestaurant({ jwt, id: restaurant.usersRestaurant?.id })
    );
    dispatch(getRestaurantsCategory({
      jwt:jwt,
      restaurantId:restaurant.usersRestaurant?.id
    }));
    dispatch(fetchRestaurantsOrder({
      restaurantId:restaurant.usersRestaurant?.id,
      jwt:jwt
    })
  );
},[dispatch, jwt, restaurant.usersRestaurant]);

  return (
    <div>
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="lg:flex justify-between">
        <div className="">
          <AdminSideBar handleClose={handleCloseSideBar} open={openSideBar} />
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<RestaurantDetails/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/category' element={<FoodCategory/>}/>
            <Route path='/ingredients' element={<Ingredients/>}/>
            <Route path='/event' element={<Events/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/add-menu' element={<CreateMenuForm/>}/>


          </Routes>

        </div>
      </div>
    </div>
  )
}
