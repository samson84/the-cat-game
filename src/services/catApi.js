import {breed} from '../utils/models';
 
const API_KEY = process.env.REACT_APP_CAT_API_KEY;
const BASE_URL = 'https://api.thecatapi.com/v1'

export class AppError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AppError'
  }
}

async function request(url) {
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'x-api-key': API_KEY
      },
    });
  } catch (error) {
    throw new AppError(`Network Error: ${error.message}`);
  }
  if (!response.ok) {
    throw new AppError(`API Error: ${response.status} ${response.statusText}`);
  }
  try {
    return { payload: await response.json() }
  } catch (error) {
    throw new AppError(`Data parsing error: ${error.message}`);
  }

}

function imageLoader(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(url));
    image.addEventListener('error', () => reject(url));
    image.src = url;
  })
}

export async function getAllBreeds() {
  const data = await request(`${BASE_URL}/breeds?limit=100`)
  return data.payload.map(({ id, name }) => breed({ id, name }))
}

export async function getImagesForBreed(breedId) {
  const data = await request(`${BASE_URL}/images/search?breed_id=${breedId}&size=small&limit=3`)
  const imageRequests = data.payload.map((imageData) => imageLoader(imageData.url));
  try {
    return await Promise.all(imageRequests);
  } catch (error) {
    throw new AppError(`Could not load this image: ${error}`)
  }
}
