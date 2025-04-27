import { takeEvery, put } from "redux-saga/effects";

import {
  ADD_CHECKOUT,
  ADD_CHECKOUT_RED,
  DELETE_CHECKOUT,
  DELETE_CHECKOUT_RED,
  GET_CHECKOUT,
  GET_CHECKOUT_RED,
  UPDATE_CHECKOUT,
  UPDATE_CHECKOUT_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/APICallingService";

function* createSaga(action) {
  let response = yield createRecord("checkout", action.payload);
  yield put({ type: ADD_CHECKOUT_RED, payload: response.data });
}

function* getSaga() {
  let response = yield getRecord("checkout");
  yield put({ type: GET_CHECKOUT_RED, payload: response.data });
}

function* updateSaga(action) {
  yield updateRecord("checkout", action.payload);
  yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord("checkout", action.payload);
  yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload });
}

export default function* checkoutSagas() {
  yield takeEvery(ADD_CHECKOUT, createSaga);
  yield takeEvery(GET_CHECKOUT, getSaga);
  yield takeEvery(UPDATE_CHECKOUT, updateSaga);
  yield takeEvery(DELETE_CHECKOUT, deleteSaga);
}
