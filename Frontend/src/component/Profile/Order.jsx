import React, { useEffect } from 'react'
import { OrderCard } from './OrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrder } from '../State/Order/Action';

export const Order = () => {
  const {auth,order} =useSelector(store=>store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")

  useEffect(()=>{
    dispatch(getUsersOrder(jwt))
  },[auth.jwt])


  // console.log(auth);
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold '>MY ORDERS</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
      {
        order.orders.map((order)=>order.items.map((item)=><OrderCard order={order} item={item}/>))
      }
      </div>
      
    </div>
  )
}
