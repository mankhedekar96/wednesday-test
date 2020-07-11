import { generateApiClient } from '@utils/apiUtils';
const songApi = generateApiClient('itune');

export const getSongs = songName => {
  return songApi.get(`/search?term=${songName}`);
};
