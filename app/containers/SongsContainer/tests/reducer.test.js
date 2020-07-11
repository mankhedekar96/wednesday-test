import { songsContainerReducer, initialState, songsContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('SongsContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(songsContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const songName = 'Mohammed Ali Chherawalla';
    const expectedResult = { ...state, songName };
    expect(
      songsContainerReducer(state, {
        type: songsContainerTypes.REQUEST_GET_SONGS,
        songName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Mohammed Ali Chherawalla' };
    const expectedResult = { ...state, songsData: data };
    expect(
      songsContainerReducer(state, {
        type: songsContainerTypes.SUCCESS_GET_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, songsError: error };
    expect(
      songsContainerReducer(state, {
        type: songsContainerTypes.FAILURE_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
});
