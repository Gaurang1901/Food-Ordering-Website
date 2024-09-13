
import axios from "axios";
import { 
  ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS,
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT,
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, 
  REQUEST_RESET_PASSWORD_FAILURE, 
  REQUEST_RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_SUCCESS
} from "./ActionTypes";
import { api, API_URL } from "../../Config/api";

// Helper function to get JWT token from localStorage
const getJwtToken = () => localStorage.getItem("jwt");

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurants");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurants");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  const jwt = getJwtToken();
  if (!jwt) {
    dispatch({ type: GET_USER_FAILURE, payload: "No token found" });
    return;
  }
  try {
    const { data } = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};

export const addToFavorite = ({restaurantId,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });
    try {
      const { data } = await api.put(`/api/restaurants/${restaurantId}/add-favorites`,{},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Add to favorites ",data)
      dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ",error)
      dispatch({
        type: ADD_TO_FAVORITE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const logout = () =>async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};

export const resetPasswordRequest=(email)=>async(dispatch)=>{
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST})
  try {
    const {data} = await axios.post(`${API_URL}/auth/reset-password-request?email=${email}`,{});
    console.log("resetPassword",data);
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data})
  } catch (error) {
    console.log("error",error);
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message})
  }
}

export const resetPassword = (reqData) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/reset-password`,reqData.data);
    
    console.log("reset password -: ", data);

    reqData.navigate("/password-change-success")
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};
