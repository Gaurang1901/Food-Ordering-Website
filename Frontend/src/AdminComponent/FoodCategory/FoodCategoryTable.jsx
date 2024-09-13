import CreateIcon from "@mui/icons-material/Create";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { CreateFoodCategoryForm } from "./CreateFoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsCategory } from "../../component/State/Restaurant/restaurantaction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const FoodCategoryTable = () => {
  const jwt = localStorage.getItem("jwt")
  const {restaurant} =useSelector(store=>store)
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    dispatch(getRestaurantsCategory({
      jwt:jwt,
      restaurantId:restaurant.usersRestaurant?.id
    }))
    
    // dispatch(getMenuItemsByRest())
    // dispatch(getRestaurantById())
  },[]);

  return (
    <Box>
      <Card className="mt-2">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Food Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant?.categories.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};
