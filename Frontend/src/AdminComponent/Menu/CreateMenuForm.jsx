import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../component/State/Menu/Action";
import { uploadImageToCloudinary } from "../Util/UploadToCloudinary";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

export const CreateMenuForm = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const { restaurant,ingredients } = useSelector((store) => store);
  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = restaurant.usersRestaurant.id;

      dispatch(createMenuItem({menu:values,jwt:jwt}));
      console.log("values", values);
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    console.log("image", image);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          Add New Menu Item
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4 ">
          {/* <form onSubmit={handleSubmit} className="space-y-4 "> */}
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                type="file"
                accept="image/*"
                name="fileInput"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label className="relative" htmlFor="fileInput">
                <span className="w-24 h-24 cursor-pointer items-center justify-center border rounded-md p-3 border-r-gray-600">
                  <AddPhotoAlternateIcon className="text-white" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2 ">
                {formik.values.images.map((image, index) => (
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                  name="category"
                >
                  {restaurant.categories.map((item)=><MenuItem value={item}>{item.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">
                  Ingredients
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name="ingredients"
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  // MenuProps={MenuProps}
                >
                  {ingredients.ingredients.map(
                    (item, index) => (
                      <MenuItem key={item.id} value={item}>
                        {item.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Vegetarian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.vegetarian}
                  label="Vegetarian"
                  onChange={formik.handleChange}
                  name="vegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seasonal</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.seasonal}
                  label="Seasonal"
                  onChange={formik.handleChange}
                  name="seasonal"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Create Menu Item
          </Button>
        </form>
      </div>
    </div>
  );
};
