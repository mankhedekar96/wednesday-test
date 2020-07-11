import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import { selectSongsContainer, selectSongsData, selectSongsError, selectSongName } from './selectors';
import { songsContainerCreators } from './reducer';
import saga from './saga';
import { media } from '@themes';

const { Search } = Input;

const CustomCard1 = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const CustomCard2 = styled(Card)`
  && {
    margin: 5px;
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
    box-shadow: 0 0 2px tomato;
    border: none;
    cursor: pointer;

  ${media.mobile.min('width: 100%')}
  ${media.tablet.min('width: calc(50% - 10px)')}
  ${media.desktop.min('width: calc(33% - 10px)')}
  }

  &&: hover{
    box-shadow: 0 0 5px tomato;
  }
`;
const Wrapper = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
const Column = styled.div`
  display: inline-block;
  max-width: 50%;
  margin: 0 10px;
  vertical-align: middle;
`;
const CustomColumn = styled.div`
  display: inline-block;
  max-width: 50%;
  margin: 0 10px;
  vertical-align: middle;
  ${media.mobile.max('display: block; max-width: 100%')}
`;
const CardsWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const OverlayWrapper = styled.div`
  display: block;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  box-sizing: border-box;
  opacity: 0.9;
  z-index: 10;
`;

const Popup = styled.div`
  position: fixed;
  width: 90%;
  margin: 0 5%;
  height: fit-content;
  opacity: 100%;
  padding: 5px 0;
  background: white;
  z-index: 20;
  border-radius: 5px;

  ${media.tablet.min('width: 70%; margin: 0 15%')}
`;

const PopupImg = styled.div`
margin: 10% 10% 20%;
border: 1px solid blue;

&& img {
  width: 100%;
  height: 100%;
}

${media.mobile.min('width: 50px; height: 50px')}
${media.tablet.min('width: 100px; height: 100px')}
${media.desktop.min('width: 150px; height: 150px')}
`;

const PopupSongContent = styled.div`
  margin: 0 10px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 0 2px tomato;
`;

const TrackName = styled.p`
  font-size: 1.6rem;
  font-weight: bolder;
  margin: 0;
  ${media.mobile.min('margin: 5px;font-size: 1.2rem')}
`;

const ArtistName = styled.p`
  font-size: 1.2rem;
  font-weight: bolder;
  margin: 0;
  ${media.mobile.min('margin: 5px;font-size: 1rem')}
`;

const Description = styled.p`
  margin: 0;
  ${media.mobile.min('margin: 5px')}
`;

const Preview = styled.div`
  margin: 5px;
  a {
    color: blue;
  }
`;

const Price = styled.p`
  font-size: 1em;
  margin: 5px;
`;

export function SongsContainer({
  dispatchSongs,
  dispatchClearSongs,
  intl,
  songsData = {},
  songsError = null,
  songName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'songsContainer', saga });
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    const loaded = get(songsData, 'results', null) || songsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songsData]);

  useEffect(() => {
    if (songName && !songsData?.results?.length) {
      dispatchSongs(songName);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchSongs(rName);
      setLoading(true);
    } else {
      dispatchClearSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const openOverlay = data => {
    setShowOverlay(true);
    setPopupData(data);
  };

  const renderSongList = () => {
    const results = get(songsData, 'results', []);
    const resultCount = get(songsData, 'resultCount', 0);
    return (
      (results.length !== 0 || loading) && (
        <CustomCard1>
          <Skeleton loading={loading} active>
            {songName && (
              <div>
                <T id="search_song_query" values={{ songName }} />
              </div>
            )}
            {resultCount !== 0 && (
              <div>
                <T id="matching_songs" values={{ resultCount }} />
              </div>
            )}
            <CardsWrapper>
              {results.map((item, index) => (
                <CustomCard2 key={index} onClick={() => openOverlay(item)}>
                  <Column>
                    <img src={item.artworkUrl60} alt="song-thumbnail" />
                  </Column>
                  <Column>
                    <div>
                      <strong>{item.trackName}</strong>
                    </div>
                    <div>{item.artistName}</div>
                  </Column>
                </CustomCard2>
              ))}
            </CardsWrapper>
          </Skeleton>
        </CustomCard1>
      )
    );
  };
  const renderErrorState = () => {
    let songError;
    if (songsError) {
      songError = songsError;
    } else if (!get(songsData, 'resultCount', 0)) {
      songError = 'song_search_default';
    }
    return (
      !loading &&
      songError && (
        <CustomCard1 color={songsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'song_list' })}>
          <T id={songError} />
        </CustomCard1>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };

  return (
    <>
      {showOverlay && (
        <OverlayWrapper>
          <Overlay onClick={() => setShowOverlay(false)}></Overlay>
          <Popup>
            {popupData && (
              <>
                <CustomColumn>
                  <PopupImg>
                    <img src={popupData.artworkUrl100} alt="selected song thumbnail" />
                  </PopupImg>
                </CustomColumn>
                <CustomColumn>
                  <PopupSongContent>
                    <TrackName>{popupData.trackName}</TrackName>
                    <ArtistName>{popupData.artistName}</ArtistName>
                    <Description>{popupData.shortDescription}</Description>
                    <Preview>
                      <strong>
                        <a href={popupData.trackViewUrl} target="_blank" rel="noreferrer">
                          Preview
                        </a>
                      </strong>
                    </Preview>
                    <Price>
                      Price:{' '}
                      <strong>
                        {popupData.trackPrice} {popupData.currency}
                      </strong>
                    </Price>
                    <Price>
                      HD Price:{' '}
                      <strong>
                        {popupData.trackHdPrice} {popupData.currency}
                      </strong>
                    </Price>
                  </PopupSongContent>
                </CustomColumn>
                <CloseButton onClick={() => setShowOverlay(false)}>X</CloseButton>
              </>
            )}
          </Popup>
        </OverlayWrapper>
      )}

      <Wrapper maxwidth={maxwidth} padding={padding}>
        <RightContent>
          <Clickable textId="stories" onClick={refreshPage} />
        </RightContent>
        <CustomCard1 title={intl.formatMessage({ id: 'song_search' })} maxwidth={maxwidth}>
          <T marginBottom={10} id="get_song_details" />
          <Search
            data-testid="search-bar"
            defaultValue={songName}
            type="text"
            onChange={evt => debouncedHandleOnChange(evt.target.value)}
            onSearch={searchText => debouncedHandleOnChange(searchText)}
          />
        </CustomCard1>
        {renderSongList()}
        {renderErrorState()}
      </Wrapper>
    </>
  );
}

SongsContainer.propTypes = {
  dispatchSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  intl: PropTypes.object,
  songsData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  songsError: PropTypes.object,
  songName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

SongsContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  songsContainer: selectSongsContainer(),
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  songName: selectSongName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = songsContainerCreators;
  return {
    dispatchSongs: songName => dispatch(requestGetSongs(songName)),
    dispatchClearSongs: () => dispatch(clearSongs())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(SongsContainer);

export const SongsContainerTest = compose(injectIntl)(SongsContainer);
