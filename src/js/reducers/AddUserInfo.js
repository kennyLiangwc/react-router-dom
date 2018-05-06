export default (state = {},action) => {
	switch(action.type) {
		case "ADD_USER_INFO":
			console.log(state,action)
			return {
				id: action.info.id,
				name: action.info.name
			}
		default: 
			return state
	}
}