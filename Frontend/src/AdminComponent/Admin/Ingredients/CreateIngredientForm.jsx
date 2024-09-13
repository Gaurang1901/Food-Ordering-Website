import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../../component/State/Ingredients/Action';

export const CreateIngredientForm = () => {
  const {restaurant,ingredients} = useSelector(store=>store)
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    ingredientCategoryId:''
  });
  const handleSubmit=(e)=>{
    e.preventDefault();
    const data = {
      name:formData.name,
      categoryId:formData.ingredientCategoryId,
      restaurantId:restaurant.usersRestaurant.id
    };
    dispatch(createIngredient({data,jwt}))
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
        <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
        <TextField
                fullWidth
                id="name"
                name="name"
                label="Ingredient Name"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.name}
              ></TextField>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.ingredientCategoryId}
                  label="Category"
                  onChange={handleInputChange}
                  name="ingredientCategoryId"
                >
                  {ingredients.category.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)}
                </Select>
              </FormControl>
              <Button variant='contained' type='submit'>
                Create Ingredient
              </Button>

        </form>
      </div>
      
    </div>
  )
}
