/**
 *
 * Tests for SongsContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { SongsContainerTest as SongsContainer } from '../index';

describe('<SongsContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SongsContainer dispatchSongs={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearSongs on empty change', async () => {
    const getSongsSpy = jest.fn();
    const clearSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <SongsContainer dispatchClearSongs={clearSongsSpy} dispatchSongs={getSongsSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearSongsSpy).toBeCalled();
  });

  it('should call dispatchSongs on change', async () => {
    const { getByTestId } = renderProvider(<SongsContainer dispatchSongs={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some song' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
