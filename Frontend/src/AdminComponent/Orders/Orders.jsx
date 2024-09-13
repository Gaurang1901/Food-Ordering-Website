import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
// import { OrderTable } from './OrderTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action';
import { OrdersTable } from './OrderTable';
import { useLocation, useNavigate } from 'react-router-dom';

const orderStatus=[
  {label:"Pending", value:"PENDING"},
  {label:"Completed", value:"COMPLETED"},
  {label:"All", value:"ALL"},
]
export const Orders = () => {
  const {restaurant} =useSelector(store=>store)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt")

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const filterValue = searchParams.get("order_status");

  useEffect(()=>{
    dispatch(fetchRestaurantsOrder({
      restaurantId:restaurant.usersRestaurant?.id,
      orderStatus:filterValue,
      jwt:jwt
    }))
  },[dispatch, jwt, restaurant.usersRestaurant])

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      searchParams.delete("order_status");
    } else searchParams.set("order_status", e.target.value);

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  return (
    <div className='px-2'>
        <Card className='p-5'>
            <Typography variant='h5' 
            sx={{paddingBottom:"1rem"}}>
                Order Status
            </Typography>
            <FormControl>
                <RadioGroup onChange={handleFilter} row name='category' value={filterValue || "all"}>
                    {orderStatus.map((item)=><FormControlLabel
                    key={item.label}
                    value={item.value}
                    control={<Radio/>}
                    label={item.label}
                    sx={{color:'gray'}}/>
                    )}
                </RadioGroup>
            </FormControl>
        </Card>
        <OrdersTable/>
    </div>
  )
}
