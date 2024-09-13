import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteEventAction } from '../State/Restaurant/restaurantaction';

export const EventCard = ({item,isCustomer}) => {
    const dispatch=useDispatch();
  const handleDeleteEvent = () => {
    dispatch(deleteEventAction({eventId:item.id,jwt:localStorage.getItem("jwt")}))
  };
    
  return (
    <div className=''>
        <Card sx={{width:345}}>
            <CardMedia 
            sx={{height:345,
                "&:hover":{
                    transform:"scale(1.1)",
                    transition:"all 0.5s ease-in-out",
                }
            }} 
            image={item.image}
            title='green iguana'/>
            <CardContent>
                <Typography variant='h5'>
                    {item.restaurant.name}
                </Typography>
                <Typography variant='body2'>
                {item.name}
                </Typography>
                <div className='py-2 space-y-2' >
                    <p>{"Mumbai"}</p>
                    <p className='text-sm text-blue-500'>{item.startedAt}</p>
                    <p className='text-sm text-red-500'>{item.endsAt}</p>
                </div>
            </CardContent>
            {!isCustomer && <CardActions>
                <IconButton onClick={handleDeleteEvent}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>}
        </Card>
    </div>
  )
}
