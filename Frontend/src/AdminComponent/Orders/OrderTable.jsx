import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";  
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder, updateOrderStatus } from "../../component/State/Restaurant Order/Action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

export const OrdersTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurantOrders } = useSelector((store) => store);
  const { restaurant } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  useEffect(() => {
    dispatch(fetchRestaurantsOrder({
      restaurantId: restaurant.usersRestaurant?.id,
      jwt: jwt
    }));
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  const handleUpdateOrder = (orderId, orderStatus, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt })).then(() => {
      dispatch(fetchRestaurantsOrder({
        restaurantId: restaurant.usersRestaurant?.id,
        jwt: jwt
      }));
    });
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title="Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{}} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ingredients</TableCell>
                <TableCell>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrders.orders.map((item, index) => (
                <TableRow
                  className="cursor-pointer"
                  hover
                  key={item.id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell>{item?.id}</TableCell>
                  <TableCell sx={{}}>
                    <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                      {item.items.map((orderItem) => (
                        <Avatar
                          alt={orderItem.food.name}
                          src={orderItem.food?.images[0]}
                        />
                      ))}
                    </AvatarGroup>{" "}
                  </TableCell>

                  <TableCell sx={{}}>{item?.customer.fullname}</TableCell>

                  <TableCell>₹{item?.totalAmount}</TableCell>

                  <TableCell className="">
                    {item.items.map((orderItem) => (
                      <p>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>

                  <TableCell className="space-y-2">
                    {item?.items?.map((orderItem) => (
                      <div className="flex gap-1 flex-wrap">
                        {orderItem.ingredients?.map((ingre) => (
                          <Chip label={ingre} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-white">
                    {item?.orderStatus}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <div>
                      <Button
                        id={`basic-button-${item?.id}`}
                        aria-controls={`basic-menu-${item.id}`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElArray[index])}
                        onClick={(event) =>
                          handleUpdateStatusMenuClick(event, index)
                        }
                      >
                        Status
                      </Button>
                      <Menu
                        id={`basic-menu-${item?.id}`}
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleUpdateStatusMenuClose(index)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${item.id}`,
                        }}
                      >
                        {orderStatus.map((s) => (
                          <MenuItem
                            onClick={() =>
                              handleUpdateOrder(item.id, s.value, index)
                            }
                          >
                            {s.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
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
