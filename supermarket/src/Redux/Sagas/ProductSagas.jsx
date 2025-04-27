import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_RED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_RED,
  GET_PRODUCT,
  GET_PRODUCT_RED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/APICallingService";

function* createSaga(action) {
  let response = yield createRecord("product", action.payload);
  yield put({ type: ADD_PRODUCT_RED, payload: response.data });
}

function* getSaga() {
  let response = yield getRecord("product");
  yield put({ type: GET_PRODUCT_RED, payload: response.data });
}

function* updateSaga(action) {
  // yield updateRecord("product", action.payload);
  // yield put({ type: UPDATE_PRODUCT_RED, payload: action.payload });
  let response = yield updateRecord("product", action.payload);
  yield put({ type: UPDATE_PRODUCT_RED, payload: response.data });
}

function* deleteSaga(action) {
  yield deleteRecord("product", action.payload);
  yield put({ type: DELETE_PRODUCT_RED, payload: action.payload });
}

export default function* productSagas() {
  yield takeEvery(ADD_PRODUCT, createSaga);
  yield takeEvery(GET_PRODUCT, getSaga);
  yield takeEvery(UPDATE_PRODUCT, updateSaga);
  yield takeEvery(DELETE_PRODUCT, deleteSaga);
}
