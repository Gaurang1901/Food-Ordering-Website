import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { categorizedIngredients } from "../util/categorizeIngredients";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";

export const MenuCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleCheckboxChange = (ingredientName) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredientName)
        ? prevSelected.filter((name) => name !== ingredientName)
        : [...prevSelected, ingredientName]
    );
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const data = {
      token: localStorage.getItem("jwt"),
      cartItems: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(data));
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:space-x-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt={item.name}
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>₹{item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizedIngredients(item?.ingredients)).map(
              (category) => (
                <div key={category} className="pr-5">
                  <p>{category}</p>
                  <FormGroup>
                    {categorizedIngredients(item?.ingredients)[category].map(
                      (ingredient) => (
                        <FormControlLabel
                          key={ingredient.name}
                          control={
                            <Checkbox
                              checked={selectedIngredients.includes(
                                ingredient.name
                              )}
                              onChange={() =>
                                handleCheckboxChange(ingredient.name)
                              }
                              disabled={!ingredient.inStock}
                            />
                          }
                          label={ingredient.name}
                        />
                      )
                    )}
                  </FormGroup>
                </div>
              )
            )}
          </div>
          <div className="pt-5">
            <Button
              type="submit"
              variant="contained"
              disabled={!item.available}
            >
              {item.available ? "Add To Cart" : "Out of Stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
