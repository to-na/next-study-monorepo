// initialize unsplash

import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'cafe',
    perPage: 10,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls.small);
};
export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  const url = getUrlForCoffeeStores(
    '35.6960086727832%2C139.75762927281835',
    'cafe',
    6
  );
  const response = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  });
  const data = await response.json();
  return data.results.map((result, idx) => {
    return {
      // ...result,
      fsq_id: result.fsq_id,
      address: result.location.address || '',
      name: result.name,
      neighborhood:
        result.location.neighborhood || result.location.cross_street,
      imgUrl: photos[idx],
    };
  });
};
