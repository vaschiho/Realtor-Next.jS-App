import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a81ebefceamsh609413720a0c3d3p1eba2cjsnaf10972acec1',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  });
    
  return data;
}