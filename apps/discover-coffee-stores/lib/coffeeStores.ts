// initialize unsplash

import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'cafe',
    perPage: 40,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls.small);
};

// TODO: set latLong
export const fetchCoffeeStores = async (
  latLong = '35.693831,139.7624351',
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const url = getUrlForCoffeeStores(latLong, 'cafe', limit);
  const response = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  });
  const data = await response.json();
  return (
    data.results.map((result, idx) => {
      return {
        id: result.fsq_id,
        address: result.location.address || '',
        name: result.name,
        neighbourhood:
          result.location.neighborhood || result.location.cross_street || '',
        imgUrl: photos[idx],
      };
    }) || []
  );
};
