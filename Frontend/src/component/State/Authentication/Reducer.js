import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
  REQUEST_RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
} from "./ActionTypes";
import { isPresentInFavorites } from "../../Config/logic";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favourite: [],
  success: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVORITE_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case REQUEST_RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Login Success",
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        favourite: action.payload.favourite,
      };
      case REQUEST_RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: action.payload?.message,
        };
    case ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        favourite: isPresentInFavorites(state.favourite, action.payload)
          ? state.favourite.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favourite],
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
    case REQUEST_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
