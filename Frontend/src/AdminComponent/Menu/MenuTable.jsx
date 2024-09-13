import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRest,
  updateMenuItemsAvailability,
} from "../../component/State/Menu/Action";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const orders = [1, 1, 1, 1, 1, 1];

export const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients, menu } = useSelector((store) => store);
  const navigate = useNavigate();
  console.log(menu);

  useEffect(() => {
    dispatch(
      getMenuItemsByRest({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: jwt,
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: "",
      })
    );
  }, []);

  const handleFoodAvialability = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt: jwt }));
  };

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId: foodId, jwt }));
  };

  return (
    <Box width={"100%"}>
      <Card className="mt-2">
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurants/add-menu")}
            >
              <CreateIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingreients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Availablity</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems?.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    {" "}
                    <Avatar src={item.images[0]} alt={item.name}>
                      {" "}
                    </Avatar>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    {item?.ingredients.map((ingredient) => (
                      <Chip label={ingredient.name} />
                    ))}
                  </TableCell>
                  <TableCell align="right">₹ {item.price}</TableCell>
                  <TableCell align="right">
                    <Button
                      color={item.available ? "success" : "error"}
                      variant="text"
                      onClick={() => handleFoodAvialability(item.id)}
                    >
                      {item.available ? "in stock" : "out of stock"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    {
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteFood(item.id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
