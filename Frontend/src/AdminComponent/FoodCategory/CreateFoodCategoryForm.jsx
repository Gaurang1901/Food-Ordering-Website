import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../component/State/Restaurant/restaurantaction';

export const CreateFoodCategoryForm = () => {
  const {restaurant} =useSelector(store=>store)
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({categoryName:"",restaurantId:""})
  const handleSubmit=(e)=>{
    e.preventDefault();

    const data = {
      name:formData.categoryName,
      restaurantId:{
        id:restaurant.usersRestaurant?.id
      },
    };
    dispatch(createCategoryAction({reqData:data,jwt:localStorage.getItem("jwt")}))
    console.log("data",data);

  }
  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setFormData({
      ...formData,[name]:value
    })
  }
  return (
    <div className=''>
      <div className='p-5'>
        <h1 className='text-gray-400 text-center text-xl pb-10'>Create Food Category</h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
        <TextField
                fullWidth
                id="categoryName"
                name="categoryName"
                label="Category Name"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.categoryName}
              ></TextField>
              <Button variant='contained' type='submit'>
                Create Category
              </Button>

        </form>
      </div>
      
    </div>
  )
}
