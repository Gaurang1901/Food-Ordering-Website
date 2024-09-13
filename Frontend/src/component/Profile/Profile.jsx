import { ProfileNavigation } from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom'
import { UserProfile } from './UserProfile'
import { Order } from './Order'
import { Events } from './Events'
import Address from './Address'
import { Favorites } from './Favorites'
import { useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Notification } from './Notification'


export const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false)
    return (
      <>
      <Navbar handleOpenSideBar={handleOpenSideBar} isVisible={true} />
    <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%]'>
            <ProfileNavigation handleClose={handleCloseSideBar} open={openSideBar}/>
        </div>
        <div className='lg:w-[80%]'>
            <Routes>
                <Route path='/' element={<UserProfile/>}/>
                <Route path='/orders' element={<Order/>}/>
                <Route path='/address' element={<Address/>}/>
                <Route path='/favorites' element={<Favorites/>}/>
                <Route path='/events' element={<Events/>}/>
                <Route path='/payments' element={<Order/>}/>
                <Route path='/notification' element={<Notification/>}/>
            </Routes>
        </div>
    </div>
    </>
  )
}
