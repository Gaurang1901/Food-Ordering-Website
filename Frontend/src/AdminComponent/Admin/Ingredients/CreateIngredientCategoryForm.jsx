import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../../component/State/Ingredients/Action";

export const CreateIngredientCategoryForm = () => {
  const { restaurant } = useSelector((store) => store);
  const [formData, setFormData] = useState({name: "",});
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
    });
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id,
    };
    dispatch(createIngredientCategory({ data, jwt:jwt }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Category Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>
          <Button variant="contained" type="submit">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};
