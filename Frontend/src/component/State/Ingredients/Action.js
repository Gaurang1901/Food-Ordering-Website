import { api } from "../../Config/api";
import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  UPDATE_STOCK,
} from "./ActionTypes";

export const getIngredientofRestaurant = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/ingredient/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
      dispatch({ type: GET_INGREDIENS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createIngredient = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_INGREDIENT_REQUEST });
      const response = await api.post(`/api/admin/ingredient`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error });
    }
  };
};

export const createIngredientCategory = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
      const response = await api.post(`/api/admin/ingredient/category`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getIngredientsCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
      const response = await api.get(
        `/api/admin/ingredient/restaurant/${id}/category`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const updateStockofIngredient = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(
        `/api/admin/ingredient/${id}/stock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(data);
      dispatch({ type: UPDATE_STOCK, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
