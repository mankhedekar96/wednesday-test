/*
 *
 * SongsContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: songsContainerTypes, Creators: songsContainerCreators } = createActions({
  requestGetSongs: ['songName'],
  successGetSongs: ['data'],
  failureGetSongs: ['error'],
  clearSongs: []
});
export const initialState = { songName: null, songsData: [], songsError: null };

/* eslint-disable default-case, no-param-reassign */
export const songsContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case songsContainerTypes.REQUEST_GET_SONGS:
        draft.songName = action.songName;
        break;
      case songsContainerTypes.CLEAR_SONGS:
        return initialState;
      case songsContainerTypes.SUCCESS_GET_SONGS:
        draft.songsData = action.data;
        break;
      case songsContainerTypes.FAILURE_GET_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default songsContainerReducer;
