import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import React from 'react'

export const OrderCard = ({item,order}) => {
  // console.log(item);
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img className='h-16 w-16' src={item.food.images} alt="" />
            <div>
            <p className=''>{item.food.name}</p>
            <p>₹{item.totalPrice}</p>
            </div>
        </div>
        <div>
            <Button 
            variant='contained'
            className='cursor-not-allowed'>{order.orderStatus}</Button>
        </div>
    </Card>
  )
}
