import EastIcon from "@mui/icons-material/East";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import React from "react";
import { useDispatch } from "react-redux";
// import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from '../State/Cart/Action';

const SearchDishCard = ({item}) => {
    const dispatch = useDispatch();
  const handleAddItemToCart = () => {
    const data = {
      token: localStorage.getItem("jwt"),
      cartItems: {
        foodId: item.id,
        quantity: 1,
      },
    };
    dispatch(addItemToCart(data));
  };
  const navigate=useNavigate()
  return (
    <Card className=" m-3">
      <CardHeader className="text-sm"
        action={
          <IconButton onClick={()=>navigate(`/restaurant/${item.restaurant.address.city}/${item.restaurant.name}/${item.restaurant.id}`)} aria-label="settings">
            <EastIcon />
          </IconButton>
        }
        title={<p className="text-base"> {item.restaurant?.name} </p>}
        
      />
      <CardContent>
        <div>
        <div className="flex justify-between">
          <div className="w-[70%] space-y-2">
           
            <p className="font-semibold">{item.name} </p>
            <p>₹{item.price}</p>
            <p className="text-gray-400 text-sm">
              {item.description}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <img
              className="w-[5rem] h-[5rem]"
              src={item.images[0]}
              alt=""
            />
            <Button onClick={handleAddItemToCart} size="small">Add</Button>
          </div>
        </div>
      </div>
      </CardContent>
      
    </Card>
  );
};

export default SearchDishCard;
