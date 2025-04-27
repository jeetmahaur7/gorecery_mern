import {
  ADD_NEWSLETTER_RED,
  DELETE_NEWSLETTER_RED,
  GET_NEWSLETTER_RED,
  UPDATE_NEWSLETTER_RED,
} from "../Constants";
export default function NewsletterReducer(state = [], action) {
  let newState, index;
  switch (action.type) {
    case ADD_NEWSLETTER_RED:
      newState = [...state];
      newState.push(action.payload);
      return newState;

    case GET_NEWSLETTER_RED:
      return action.payload;

    case UPDATE_NEWSLETTER_RED:
      index = state.findIndex((x) => x._id === action.payload._id);
      state[index].active = action.payload.active;
      return state;

    case DELETE_NEWSLETTER_RED:
      return state.filter((x) => x._id !== action.payload._id);

    default:
      return state;
  }
}
