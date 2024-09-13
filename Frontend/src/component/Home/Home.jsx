import "./Home.css"
import { MultiItemCarousel } from "./MultiItemCarousel"
import { RestaurantCard } from "../Restuarant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllRestaurantsAction } from "../State/Restaurant/restaurantaction";
import { Navbar } from "../Navbar/Navbar";

export const Home = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const { restaurant } = useSelector((store)=> store)
  useEffect(()=>{
    dispatch(getAllRestaurantsAction(jwt))
    
  },[dispatch, jwt])
  console.log(restaurant);
  
  return (
    <div className="">
      <Navbar/>
      <section className="-z-50 banner relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-7xl font-bold z-10 py-5">FeastFly</p>
          <p className="z-10   text-gray-300 text-xl lg:text-4xl">
          {/* Craving satisfaction delivered fast - order your favorite meals in just a tap! */}
          Delivering deliciousness to your doorstep swiftly and seamlessly
          </p>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
        <div className="">
          <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
            Top Meals
          </p>
          <MultiItemCarousel />
        </div>
      </section>
      <section className="px-5 lg:px-20">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-400 py-3 ">
            Order From Our Handpicked Favorites
          </h1>
          <div className="flex flex-wrap items-center justify-around ">
            {restaurant.restaurants.map((item) => (
              <RestaurantCard item={item}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
