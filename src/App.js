import { useState } from 'react'
import Person from './components/Person'

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
	const [newName, setNewName] = useState('')

	const handleChange = e => {
		setNewName(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()

		const names = persons.map(p => p.name)
		console.log('names', names)
		if (names.includes(newName)) {
			alert(`${newName} is already added to phonebook`)
			setNewName('')
		} else {
			const personObj = {
				name: newName,
			}

			setPersons(persons.concat(personObj))
			setNewName('')
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={newName} onChange={handleChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(p => (
				<Person key={p.name} name={p.name} />
			))}
		</div>
	)
}

export default App
