import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminRouter } from './AdminRouter'
import { CustomerRouter } from './CustomerRouter'

export const Routers = () => {
  return (
    <Routes>
        <Route path='/admin/restaurants/*' element={<AdminRouter/>}/>
        <Route path='/*' element={<CustomerRouter/>}/>

    </Routes>
  )
}
