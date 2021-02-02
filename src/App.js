import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios.get('http://localhost:5000/persons').then(res => setPersons(res.data))
	}, [])
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

			<h3>Add a new</h3>

			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>

			<h2>Numbers</h2>

			{!filteredNames.length && <h4>No result!</h4>}
			{filteredNames.map(p => (
				<Person key={p.name} name={p.name} number={p.number} />
			))}
		</div>
	)
}

export default App
