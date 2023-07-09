import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = '7daf23b8be822e18cc9bf2fedba64f35';
const PRIVATE_KEY = 'babf4318eeaf3a4ed529d4039b19ecd6bc53d290';
const API_BASE_URL = 'https://gateway.marvel.com/v1/public';

const marvelApi = axios.create({
  baseURL: API_BASE_URL,
});

const getTimestamp = () => Math.floor(Date.now() / 1000);
const getHash = (timestamp) =>
  md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`);

export const getCharacters = async (searchQuery) => {
  const timestamp = getTimestamp();
  const hash = getHash(timestamp);

  const response = await marvelApi.get('/characters', {
    params: {
      apikey: PUBLIC_KEY,
      ts: timestamp,
      hash: hash,
      nameStartsWith: searchQuery,
    },
  });

  return response.data.data.results;
};
 
