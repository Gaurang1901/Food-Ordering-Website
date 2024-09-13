// import axios from "axios";

import { api } from "../../Config/api";
import {
  GET_RESTAURANTS_OREDER_FAILURE,
  GET_RESTAURANTS_OREDER_REQUEST,
  GET_RESTAURANTS_OREDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./Actiontypes";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const response = await api.put(
        `/api/admin/order/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const updatedOrder = response.data;
      console.log(updatedOrder);
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder});
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
    }
  };
};

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_OREDER_REQUEST });
    try {
      const { data } = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          params: {
            order_status: orderStatus,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("orders: ", data);
      dispatch({ type: GET_RESTAURANTS_OREDER_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_RESTAURANTS_OREDER_FAILURE, payload: error });
    }
  };
};
