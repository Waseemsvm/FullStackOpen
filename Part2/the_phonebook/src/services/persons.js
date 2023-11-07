import axios from "axios";
// const baseUrl = "http://localhost:3001/persons";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
    let request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (personObj) => {
    let request = axios.post(baseUrl, personObj)
    return request.then(response => response.data);
}

const update = (id, personObj) => {
    let request = axios.put(`${baseUrl}/${id}`, personObj);
    return request.then(response => response.data);
}

const remove = (id) => {
    let request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

export default {
    getAll,
    create,
    update,
    remove
}