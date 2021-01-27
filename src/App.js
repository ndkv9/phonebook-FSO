import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' },
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	const handleNameChange = e => {
		setNewName(e.target.value)
	}

	const handleNumberChange = e => {
		setNewNumber(e.target.value)
	}

	const handleFilterChange = e => {
		setFilter(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()

		const names = persons.map(p => p.name)

		if (names.includes(newName)) {
			alert(`${newName} is already added to phonebook`)
			setNewName('')
			setNewNumber('')
		} else {
			const personObj = {
				name: newName,
				number: newNumber,
			}

			setPersons(persons.concat(personObj))
			setNewName('')
			setNewNumber('')
		}
	}

	const filteredNames = persons.filter(p =>
		p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<form onSubmit={handleSubmit}>
				<h3>Add a new</h3>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{!filteredNames.length && <h4>No result!</h4>}
			{filteredNames.map(p => (
				<Person key={p.name} name={p.name} number={p.number} />
			))}
		</div>
	)
}

export default App
