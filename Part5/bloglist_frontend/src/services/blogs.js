import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log("token set", newToken);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = (newObject) => {
  let config = {
    headers: { Authorization: token },
  };

  console.log("creating blog", newObject);
  console.log("config", config);
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

export default { getAll, createBlog, setToken };
