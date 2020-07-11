/**
 * Test songsContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@services/songApi';
import { apiResponseGenerator } from '@utils/testUtils';
import songsContainerSaga, { getITuneSongs } from '../saga';
import { songsContainerTypes } from '../reducer';

describe('SongsContainer saga tests', () => {
  const generator = songsContainerSaga();
  const songName = 'mac';
  let getITuneSongsGenerator = getITuneSongs({ songName });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(songsContainerTypes.REQUEST_GET_SONGS, getITuneSongs));
  });

  it('should ensure that the action FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    const res = getITuneSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching song informations.'
    };
    expect(getITuneSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: songsContainerTypes.FAILURE_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    getITuneSongsGenerator = getITuneSongs({ songName });
    const res = getITuneSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const songsResponse = {
      resultCount: 1,
      results: [{ songName: songName }]
    };
    expect(getITuneSongsGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: songsContainerTypes.SUCCESS_GET_SONGS,
        data: songsResponse
      })
    );
  });
});
