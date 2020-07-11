import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/songApi';
import { songsContainerTypes, songsContainerCreators } from './reducer';

const { REQUEST_GET_SONGS } = songsContainerTypes;
const { successGetSongs, failureGetSongs } = songsContainerCreators;
export function* getITuneSongs(action) {
  const response = yield call(getSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}
// Individual exports for testing
export default function* songsContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getITuneSongs);
}
