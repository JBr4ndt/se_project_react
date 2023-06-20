const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const getItemList = () => {
  return fetch(`${baseUrl}/items/`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const addItem = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkResponse);
};

const removeItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const api = {
  getItemList,
  addItem,
  removeItem,
};

export default api;
