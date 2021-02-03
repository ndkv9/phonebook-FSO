const Noti = ({ message }) => {
	if (message === null) {
		return null
	}
	return <div className='noti'>{message}</div>
}

export default Noti
