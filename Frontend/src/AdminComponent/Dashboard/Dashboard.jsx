import Grid from '@mui/material/Grid';
import React from 'react'
import { MenuTable } from '../Menu/MenuTable'
import { OrdersTable } from '../Orders/OrderTable'
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';



export const Dashboard = () => {
  const {restaurantOrders,restaurant} = useSelector(store=>store)
  console.log("restaurantOrders",restaurantOrders);
  return (
    <div className='px-4'>
      <Card className='mt-3 ' sx={{}}>
      <h1 className="text-2xl lg:text-5xl text-center font-bold p-5 text-yellow-300">
          {restaurant.usersRestaurant.name}
        </h1>
      </Card>
      <Grid sx={{paddingTop:"1rem"}} container spacing={2}>
        <Grid item xs={12} lg={6}>
          <MenuTable/>
        </Grid>
        <Grid item xs={12} lg={6}>
          <OrdersTable/>
        </Grid>
      </Grid>
    </div>
  )
}
