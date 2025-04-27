import {
  ADD_WISHLIST_RED,
  DELETE_WISHLIST_RED,
  GET_WISHLIST_RED,
  UPDATE_WISHLIST_RED,
} from "../Constants";
export default function WishlistReducer(state = [], action) {
  let newState, index;
  switch (action.type) {
    case ADD_WISHLIST_RED:
      newState = [...state];
      newState.push(action.payload);
      return newState;

    case GET_WISHLIST_RED:
      return action.payload;

    case UPDATE_WISHLIST_RED:
      return state;

    case DELETE_WISHLIST_RED:
      return state.filter((x) => x._id !== action.payload._id);

    default:
      return state;
  }
}
