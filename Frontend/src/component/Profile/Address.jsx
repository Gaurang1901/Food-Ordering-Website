import React from "react";
import AddressCard from "../Address/AddressCard";
import { useSelector } from "react-redux";

const Address = () => {
  const {auth}=useSelector(state=>state)
  return (
    <div>
      <div className="flex items-center flex-col lg:px-10">
        <h1 className="text-xl text-center py-7 font-semibold">Addresses</h1>
        <div className="flex justify-center flex-wrap gap-3">
          {auth.user?.address.map((item) => (
            <AddressCard item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Address;