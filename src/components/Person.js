const Person = ({ name, number, remove }) => {
	return (
		<div>
			<p>
				{name} {number}
				<button onClick={remove}>remove</button>
			</p>
		</div>
	)
}

export default Person
