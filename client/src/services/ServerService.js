const BASE_URL = 'http://localhost:3001'

export default {

  getUserInfo: async (id) => {
    return  await fetchRequest(`user/${id}`);
  },
  getRecommendations: (id) => {
    return fetchRequest(`recommendations/${id}`);
  },
  getUserStore: (id) => {
    return fetchRequest(`user/store/${id}`);
  }
};

const fetchRequest = (url) => {
  console.log(`INFO: (serverService)::: Running URL =${BASE_URL}/${url}` );
  return fetch(`${BASE_URL}/${url}`)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
};