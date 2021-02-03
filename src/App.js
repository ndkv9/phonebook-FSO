import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Noti from './components/Noti'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [noti, setNoti] = useState(null)

	useEffect(() => {
		personService.getAll().then(initialPersons => setPersons(initialPersons))
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
			const result = window.confirm(
				`${newName} is already added to phonebook, replace with a new number?`
			)
			if (result) {
				setNewName('')
				setNewNumber('')

				const personToUpdate = persons.find(p => p.name === newName)
				const updatedPerson = {
					...personToUpdate,
					number: newNumber,
				}

				personService
					.update(updatedPerson)
					.then(returnedPerson =>
						setPersons(
							persons.map(p =>
								p.id !== returnedPerson.id ? p : returnedPerson
							)
						)
					)
			} else {
				setNewName('')
				setNewNumber('')
			}
		} else {
			const personObj = {
				name: newName,
				number: newNumber,
			}

			personService.create(personObj).then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
			})
		}
	}

	const handleRemove = person => {
		const result = window.confirm(`Remove ${person.name} ?`)
		if (result) {
			personService.remove(person.id)
			setPersons(persons.filter(p => p.id !== person.id))
		}
	}

	const filteredNames = persons.filter(p =>
		p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	)

	return (
		<div>
			<h2>Phonebook</h2>

			<Noti message={noti} />

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
				<Person
					key={p.name}
					name={p.name}
					number={p.number}
					remove={() => handleRemove(p)}
				/>
			))}
		</div>
	)
}

export default App
