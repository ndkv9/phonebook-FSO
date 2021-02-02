import axios from 'axios'

const baseUrl = 'http://localhost:5000/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(res => res.data)
}

const create = person => {
	const request = axios.post(baseUrl, person)
	return request.then(res => res.data)
}

const remove = id => {
	const request = axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove }
