import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {CreateRestaurantForm} from '../../AdminComponent/CreateRestaurnatForm/CreateRestaurantForm'
import {Admin} from '../../AdminComponent/Admin/Admin'
import { useSelector } from 'react-redux'

export const AdminRouter = () => {
  const {restaurant} =useSelector(store=>store)
  return (
    <div>
        <Routes>
            <Route path='/*' element={
              !restaurant?.usersRestaurant?(
              <CreateRestaurantForm/>
              ) : (
              <Admin/>
              )}/>
        </Routes>
    </div>
  );
}
