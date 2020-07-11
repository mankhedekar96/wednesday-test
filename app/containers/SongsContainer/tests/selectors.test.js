import { selectSongsContainer, selectSongName, selectSongsData, selectSongsError } from '../selectors';

describe('SongsContainer selector tests', () => {
  let mockedState;
  let songName;
  let songsData;
  let songsError;

  beforeEach(() => {
    songName = 'mac';
    songsData = { resultCount: 1, results: [{ songName }] };
    songsError = 'There was some error while fetching the songsitory details';

    mockedState = {
      songsContainer: {
        songName,
        songsData,
        songsError
      }
    };
  });
  it('should select the songsContainer state', () => {
    const songsContainerSelector = selectSongsContainer();
    expect(songsContainerSelector(mockedState)).toEqual(mockedState.songsContainer);
  });
  it('should select the songName', () => {
    const songSelector = selectSongName();
    expect(songSelector(mockedState)).toEqual(songName);
  });

  it('should select songsData', () => {
    const songsDataSelector = selectSongsData();
    expect(songsDataSelector(mockedState)).toEqual(songsData);
  });

  it('should select the songsError', () => {
    const songsErrorSelector = selectSongsError();
    expect(songsErrorSelector(mockedState)).toEqual(songsError);
  });
});
