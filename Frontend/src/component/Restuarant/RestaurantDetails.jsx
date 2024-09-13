import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { MenuCard } from "./MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRestaurantById, getRestaurantsCategory } from "../State/Restaurant/restaurantaction";
import { getMenuItemsByRest } from "../State/Menu/Action";
import { Navbar } from "../Navbar/Navbar";

const foodTypes = [
  { label: "All", value: "All" },
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian Only", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];
export const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");
  const jwt=localStorage.getItem("jwt")
 
  const handleFilter=(e, value)=>{
    const searchParams = new URLSearchParams(location.search);
  
    if(value==="all"){
      searchParams.delete(e.target.name);
      searchParams.delete("food_category");
    }
    else searchParams.set(e.target.name, e.target.value); 

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  }
  
  useEffect(() => {
    dispatch(
      getRestaurantById({jwt: localStorage.getItem("jwt"),restaurantId: id}))
      dispatch(getRestaurantsCategory({jwt,restaurantId: id}))
    },[dispatch, id, jwt]);

    useEffect(()=>{
      dispatch(getMenuItemsByRest({jwt,
        restaurantId:id,
        vegetarian:foodType==="vegetarian",
        nonveg:foodType==="non_vegetarian",
        seasonal:foodType==="seasonal",
        foodCategory:foodCategory || ""}))
    },[id,foodType,foodCategory]);


  return (
    <>
      <Navbar/>
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-5 mb-2">
          Home/{restaurant.restaurant?.address.country}
          /{restaurant.restaurant?.name}
          /{restaurant.restaurant?.id}/Order Online
        </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <img
                className="w-full h-[30vh] object-cover"
                src={restaurant.restaurant?.images[0]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[30vh] object-cover"
                src={restaurant.restaurant?.images[1]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[30vh] object-cover"
                src={restaurant.restaurant?.images[2]}
                alt=""
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <div className="space-y-3 mt-3">
            <h1 className="text-4xl font-semibold">{restaurant.restaurant?.name}</h1>
            <p className="text-gray-500 mt-1">
             {restaurant.restaurant?.description}
            </p>
            <p className="text-gray-600 flex items-center gap-3">
              <LocationOnIcon />
              <span>{restaurant.restaurant?.address.streetAddress}</span>
            </p>
            <p className="text-gray-600 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>{restaurant.restaurant?.openingHours} (Today)</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative ">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            
            <div className="">
              <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component="fieldset">
                <RadioGroup
                  name="food_type"
                  value={foodType || "all"}
                  onChange={handleFilter}
                >
                  {foodTypes?.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
                <Divider/>
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Food Category
              </Typography>
                <RadioGroup
                  name="food_category"
                  value={foodCategory || "all"}
                  onChange={handleFilter}
                >
                   <FormControlLabel
                      
                      value={"all"}
                      control={<Radio />}
                      label={"All"}
                      sx={{ color: "gray" }}
                    />
                  {restaurant?.categories.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] space-y-5 lg:pl-10">
          {menu?.menuItems.map((item) => (
            <MenuCard item={item} />
          ))}
        </div>
      </section>
    </div>
    </>
  );
};
