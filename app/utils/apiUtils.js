import { create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

const apiClients = {
  github: null,
  itune: null,
  default: null
};
export const getApiClient = (type = 'github') => apiClients[type];
export const generateApiClient = (type = 'github') => {
  switch (type) {
    case 'github':
      apiClients[type] = createApiClientWithTransForm('https://api.github.com/');
      return apiClients[type];
    case 'itune':
      apiClients[type] = createApiClientWithTransForm('https://itunes.apple.com/');
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm('https://api.github.com/');
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
  api.addResponseTransform(response => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, keys => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform(request => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys));
    }
    return request;
  });
  return api;
};
