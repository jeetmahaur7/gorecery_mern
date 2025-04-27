import {
  ADD_CONTACT_US_RED,
  DELETE_CONTACT_US_RED,
  GET_CONTACT_US_RED,
  UPDATE_CONTACT_US_RED,
} from "../Constants";
export default function ContactUsReducer(state = [], action) {
  let newState, index;
  switch (action.type) {
    case ADD_CONTACT_US_RED:
      newState = [...state];
      newState.push(action.payload);
      return newState;

    case GET_CONTACT_US_RED:
      return action.payload;

    case UPDATE_CONTACT_US_RED:
      index = state.findIndex((x) => x._id === action.payload._id);
      state[index].active = action.payload.active;
      return state;

    case DELETE_CONTACT_US_RED:
      return state.filter((x) => x._id !== action.payload._id);

    default:
      return state;
  }
}
