import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import React from 'react'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
// import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../Config/logic';
import { useNavigate } from 'react-router-dom';
import { addToFavorite} from '../State/Authentication/Action';

export const RestaurantCard = ({item}) => {

  console.log("item",item);

  const jwt = localStorage.getItem("jwt")
  const { auth } = useSelector(store=>store)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleAddToFavorites = () =>{
    dispatch(addToFavorite({restaurantId:item.id,jwt:auth.jwt||jwt}));
  };

  const handleNavigateToRestaurant =()=>{
    if(item.open){
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  }

    return (
      <Card className="m-5 w-[18rem] productCard ">
        <div className={`${item.open?"cursor-pointer":"cursor-not-allowed"}  relative`}>
          <img
            className="w-full h-[10rem] rounded-t-md object-cover "
            src={item.images[0]}
            alt={item.images[1]}
          />
          <Chip
            size="small"
            // variant="outlined"
            className="absolute top-2 left-2"
            color={item.open?"success":"error"}
            label={item.open ? "Open" : "Closed"}
          />
        </div>
        <div className="p-4 textPart lg:flex w-full justify-between">
          <div className="space-y-1">
            <p onClick={handleNavigateToRestaurant} className="font-semibold text-lg cursor-pointer">{item.name}</p>
            {/* <div>
            <span>{item.rating}</span>
          </div> */}
            <p className="text-gray-500 text-sm">
             {item.description}
            </p>
          </div>
  
          <div>
            <IconButton onClick={handleAddToFavorites}>
              {isPresentInFavorites(auth.favourite, item) ? (
                <FavoriteIcon color="primary" />
              ) : (
                <FavoriteBorderIcon/>
              )}
            </IconButton>
          </div>
        </div>
      </Card>
    );
};
