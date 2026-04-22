import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAllPersons = () =>
{
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}
const addPerson = person =>
{
    const request = axios.post(baseURL, person)
    return request.then(response => response.data)
}

const deletePerson = id =>
{
    const url = `${baseURL}/${id}`
    return axios.delete(url)
}

const updatePerson = (newPerson) =>
{
    const request = axios.put(`${baseURL}/${newPerson.id}`, newPerson)
    return request.then(response => response.data) 
}

export default { getAllPersons, addPerson, deletePerson, updatePerson }