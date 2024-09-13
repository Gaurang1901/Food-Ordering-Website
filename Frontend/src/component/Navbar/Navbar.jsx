import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useSelector } from 'react-redux';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

export const Navbar = ({handleOpenSideBar,isVisible}) => {
  const {auth,cart} =useSelector(store=>store);
  const navigate = useNavigate();
  const handleAvatarClick=()=>{
    if(auth.user?.role==="ROLE_CUSTOMER"){
      navigate("/my-profile")
    }
    else{
      navigate("/admin/restaurants")
    }
  }
  return (
    <div className="navbar px-5 sticky z-[5000] py-[0.8rem] bg-[#DC6B19] lg:px-20 flex justify-between">
      <div className="logo lg:mr-10 cursor-pointer flex items-center space-x-4">
        {isVisible?<div className='lg:hidden'>
          <IconButton onClick={handleOpenSideBar}><MenuIcon/></IconButton>
          </div>:null}
        <li onClick={()=>navigate("/")} className="logo font-semibold text-gray-200 text-3xl sm:text-4xl">
        FeastFly
        </li>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div>
        <IconButton onClick={()=>navigate("/search")} className='hover:text-yellow-300'>
          <SearchIcon fontSize='large' />
        </IconButton>
        </div>
        <div className=''>
        {auth.user?(<Avatar className='font-bold hover:bg-slate-500 hover:text-yellow-300 ' onClick={handleAvatarClick} sx={{bgcolor:"white", color:"#91DDCF",cursor:"pointer"}}>
          {auth.user?.fullname[0].toUpperCase()}</Avatar>):
        (<IconButton className='hover:text-yellow-300 '  onClick={()=>navigate("/account/login")}>
          <PersonIcon  sx={{ fontSize: "2.1rem" }}/>
          </IconButton>)}
      </div>
      <div>
        <IconButton className='hover:text-yellow-300' onClick={()=>navigate("/cart")}>
          <Badge color="primary" badgeContent={cart.cartItems.length}>
          <ShoppingCartOutlinedIcon  sx={{ fontSize: "2.1rem" }} />
          </Badge>
        </IconButton>
        </div>
      </div>
      
    </div>
  );
};
