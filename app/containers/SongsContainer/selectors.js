import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the songsContainer state domain
 */

const selectSongsContainerDomain = state => state.songsContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SongsContainer
 */

export const selectSongsContainer = () =>
  createSelector(
    selectSongsContainerDomain,
    substate => substate
  );

export const selectSongsData = () =>
  createSelector(
    selectSongsContainerDomain,
    substate => get(substate, 'songsData', null)
  );

export const selectSongsError = () =>
  createSelector(
    selectSongsContainerDomain,
    substate => get(substate, 'songsError', null)
  );

export const selectSongName = () =>
  createSelector(
    selectSongsContainerDomain,
    substate => get(substate, 'songName', null)
  );

export default selectSongsContainer;
