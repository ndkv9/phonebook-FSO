const Noti = ({ noti }) => {
	if (noti?.message === null) {
		return null
	}
	return <div className={noti?.err ? 'error' : 'noti'}>{noti?.message}</div>
}

export default Noti
