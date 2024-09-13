import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

export const AdminNavbar = ({handleOpenSideBar}) => {
  return (
    <div style={{zIndex:1500, position:'relative'}} className=" px-5 sticky py-[.8rem] bg-[#DC6B19]  lg:px-20 flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="lg:mr-10  cursor-pointer flex items-center space-x-4">
          <div className='lg:hidden'>
          <IconButton onClick={handleOpenSideBar}><MenuIcon/></IconButton>
          </div>
          <li className="logo font-semibold text-gray-300 text-4xl">
            FeastFly
          </li>
        </div>
      </div>
      

    </div>
  );
}
