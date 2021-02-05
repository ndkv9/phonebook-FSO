import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(res => res.data)
}

const create = person => {
	const request = axios.post(baseUrl, person)
	return request.then(res => res.data)
}

const update = person => {
	const request = axios.put(`${baseUrl}/${person.id}`, person)
	return request.then(res => res.data)
}

const remove = id => {
	const request = axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
