import { takeEvery, put } from "redux-saga/effects";

import {
  ADD_CONTACT_US,
  ADD_CONTACT_US_RED,
  DELETE_CONTACT_US,
  DELETE_CONTACT_US_RED,
  GET_CONTACT_US,
  GET_CONTACT_US_RED,
  UPDATE_CONTACT_US,
  UPDATE_CONTACT_US_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/APICallingService";

function* createSaga(action) {
  let response = yield createRecord("contactus", action.payload);
  yield put({ type: ADD_CONTACT_US_RED, payload: response.data});
}

function* getSaga() {
  let response = yield getRecord("contactus");
  yield put({ type: GET_CONTACT_US_RED, payload: response.data });
}

function* updateSaga(action) {
  yield updateRecord("contactus", action.payload);
  yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord("contactus", action.payload);
  yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload });
}

export default function* contactUsSagas() {
  yield takeEvery(ADD_CONTACT_US, createSaga);
  yield takeEvery(GET_CONTACT_US, getSaga);
  yield takeEvery(UPDATE_CONTACT_US, updateSaga);
  yield takeEvery(DELETE_CONTACT_US, deleteSaga);
}
