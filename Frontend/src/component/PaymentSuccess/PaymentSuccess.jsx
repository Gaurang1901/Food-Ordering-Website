import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Navbar } from '../Navbar/Navbar';
export const PaymentSuccess = () => {
    const navigate = useNavigate();
  return (
    <>
    <Navbar/>
   
    <div className="min-h-screen px-5">
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <Card className=' p-5 box w-full lg:w-1/4 flex flex-col items-center rounded-md'>

            <TaskAltIcon sx={{fontSize:"5rem",color:green[500]}}/>
            <h1 className='py-5 text-2xl font-semibold'>
                Order Placed Successfully
            </h1>
            <p className='text-center py-3 text-gray-300 text-lg'> 
                Thanku for Choosing for our Restaurnt!!
            </p>
            <p className='text-center py-2 text-gray-200 text-lg'>
                Have a Great Day and Meal 😋😋!!
            </p>
            <Button onClick={()=>navigate("/")} variant='contained' className='py-5' sx={{margin:"1rem 0rem"}}>
                Home
            </Button>
        </Card>
    </div>
</div>
</>
  )
}
