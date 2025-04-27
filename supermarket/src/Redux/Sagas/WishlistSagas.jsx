import { takeEvery, put } from "redux-saga/effects";

import {
  ADD_WISHLIST,
  ADD_WISHLIST_RED,
  DELETE_WISHLIST,
  DELETE_WISHLIST_RED,
  GET_WISHLIST,
  GET_WISHLIST_RED,
  UPDATE_WISHLIST,
  UPDATE_WISHLIST_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/APICallingService";

function* createSaga(action) {
  let response = yield createRecord("wishlist", action.payload);
  yield put({ type: ADD_WISHLIST_RED, payload: response.data });
}

function* getSaga() {
  let response = yield getRecord("wishlist");
  yield put({ type: GET_WISHLIST_RED, payload: response.data });
}

function* updateSaga(action) {
  yield updateRecord("wishlist", action.payload);
  yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord("wishlist", action.payload);
  yield put({ type: DELETE_WISHLIST_RED, payload: action.payload });
}

export default function* wishlistSagas() {
  yield takeEvery(ADD_WISHLIST, createSaga);
  yield takeEvery(GET_WISHLIST, getSaga);
  yield takeEvery(UPDATE_WISHLIST, updateSaga);
  yield takeEvery(DELETE_WISHLIST, deleteSaga);
}
