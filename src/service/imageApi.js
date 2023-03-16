import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const key = '32874218-f955783fbc8df841e2f172dbc';
axios.defaults.params = {
  orientation: 'horizontal',
  //   orientation: 'landscape',
  image_type: 'photo',
  safesearch: 'true',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`?key=${key}&q=${query}&page=${page}`);
  //   console.log('data =', data.hits);
  return data;
};
