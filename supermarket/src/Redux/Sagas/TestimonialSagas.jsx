import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_TESTIMONIAL,
  ADD_TESTIMONIAL_RED,
  DELETE_TESTIMONIAL,
  DELETE_TESTIMONIAL_RED,
  GET_TESTIMONIAL,
  GET_TESTIMONIAL_RED,
  UPDATE_TESTIMONIAL,
  UPDATE_TESTIMONIAL_RED,
} from "../Constants";
// import {
//   createRecord,
//   deleteRecord,
//   getRecord,
//   updateRecord,
// } from "./Service/APICallingService";

import {
  createMultipartDataRecord,
  deleteRecord,
  getRecord,
  updateMultipartDataRecord,
} from "./Service/APICallingService";

function* createSaga(action) {
  // let response = yield createRecord("testimonial", action.payload);
  let response = yield createMultipartDataRecord("testimonial", action.payload);
  yield put({ type: ADD_TESTIMONIAL_RED, payload: response.data });
}

function* getSaga() {
  let response = yield getRecord("testimonial");
  yield put({ type: GET_TESTIMONIAL_RED, payload: response.data });
}

function* updateSaga(action) {
  // yield updateRecord("testimonial", action.payload);
  // yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload });
  let response = yield updateMultipartDataRecord("testimonial", action.payload);
  yield put({ type: UPDATE_TESTIMONIAL_RED, payload: response.data });
}

function* deleteSaga(action) {
  yield deleteRecord("testimonial", action.payload);
  yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload });
}

export default function* testimonialSagas() {
  yield takeEvery(ADD_TESTIMONIAL, createSaga);
  yield takeEvery(GET_TESTIMONIAL, getSaga);
  yield takeEvery(UPDATE_TESTIMONIAL, updateSaga);
  yield takeEvery(DELETE_TESTIMONIAL, deleteSaga);
}
