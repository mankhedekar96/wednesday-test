import { songsContainerTypes, songsContainerCreators } from '../reducer';

describe('SongsContainer action tests', () => {
  it('has a type of REQUEST_GET_SONGS', () => {
    const expected = {
      type: songsContainerTypes.REQUEST_GET_SONGS,
      songName: 'songName'
    };
    expect(songsContainerCreators.requestGetSongs('songName')).toEqual(expected);
  });
});
