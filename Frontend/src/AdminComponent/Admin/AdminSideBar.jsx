import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import React from 'react'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';

const menu=[
  {title:"Details",icon:<AdminPanelSettingsIcon/>,path:"/"},
  {title:"Dashboard",icon:<DashboardIcon/>,path:"/dashboard"},
  {title:"Orders",icon:<ShoppingBagIcon/>,path:"/orders"},
  {title:"Menu",icon:<ShopTwoIcon/>,path:"/menu"},
  {title:"Food Category",icon:<CategoryIcon/>,path:"/category"},
  {title:"Ingredients",icon:<FastfoodIcon/>,path:"/ingredients"},
  {title:"Events",icon:<EventIcon/>,path:"/event"},
  {title:"Logout",icon:<LogoutIcon/>,path:"/"}
]

export const AdminSideBar = ({handleClose,open}) => {

  const isSmallScreen=useMediaQuery("(max-width:1080px)")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleNavigate=(item)=>{
    navigate(`/admin/restaurants${item.path}`)
    if((item.title)==="Logout"){
      navigate("/")
      dispatch(logout())
    } else if (item.title === "Restaurants") {
      navigate("/admin");
    }
    handleClose()
  }

  return (
    <div>
      <>
      <Drawer 
      open={open} 
      variant={isSmallScreen?"temporary":"permanent"}
      onClose={handleClose} 
      anchor='left' 
      sx={{}}>
        <div className='w-[60vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>
          {menu.map((item,i)=><>
          <div onClick={()=>handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer'>
            {item.icon}
            <span>
              {item.title}
            </span>
          </div>
          {i!==menu.length-1 && <Divider/>}
          </>)}
        </div>

      </Drawer>
      </>

    </div>
  )
}
