import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction, getRestaurnatsEvents } from '../../../component/State/Restaurant/restaurantaction';
import { EventCard } from '../../../component/Profile/EventCard';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

export const Events = () => {
  const {restaurant} = useSelector(store=>store)
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  const [formValues, setFormValues] = useState(initialValues);

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };
  console.log("events",restaurant?.restaurantsEvents);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit",formValues);
    dispatch(createEventAction({data:formValues,restaurantId:restaurant.usersRestaurant.id,jwt:jwt}))
  }

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurnatsEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt:  jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);


  return (
    <div>
     
      <div className="p-5">
        <Button
          sx={{ padding: "1rem 2rem" }}
          onClick={handleOpenModal}
          variant="contained"
          color="primary"
        >
          Create New Event
        </Button>
      </div>

      <div className="mt-5 px-5 flex flex-wrap gap-5">
      {restaurant?.restaurantsEvents.map((item) => (
          <EventCard item={item} />
        ))}
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  value={formValues.image}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "startedAt")
                    }
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formValues.endsAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "endsAt")
                    }
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
