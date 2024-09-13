import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { topMeels } from "../Data/topMeels";
import { Navbar } from "../Navbar/Navbar";
import { searchMenuItems } from "../State/Menu/Action";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";


const Search = () => {
  const dispatch = useDispatch();
  const { menu } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt")

  const handleSearchMenu = (keyword) => {
    console.log("keyword",keyword);
    dispatch(searchMenuItems({keyword:keyword,jwt:jwt }));
  };
  
  return (
    <>
    <Navbar/>
    <div className="px-5 lg:px-[18vw]">
      <div className="relative py-5">
        <SearchIcon className="absolute top-[2rem] left-2" />
        <input
          onChange={(e) => handleSearchMenu(e.target.value)}
          className="p-2 py-3 pl-12 w-full bg-[#242B2E] rounded-sm outline-none"
          type="text"
          placeholder="search food..."
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap ">
          {topMeels.slice(0, 9).map((item) => (
            <PopularCuisines image={item.image} title={item.title} />
          ))}
        </div>
      </div>
      <div className=" mt-7">
        {menu.search.map((item) => (
          <SearchDishCard item={item} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Search;
