
import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import restaurantsOrderReducer from "./Restaurant Order/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";
import { authReducer } from "./Authentication/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartReducer,
  order:orderReducer,
  restaurantOrders:restaurantsOrderReducer,
  ingredients:ingredientReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
