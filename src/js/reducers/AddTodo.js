export default (state = [],action) => {
	switch(action.type) {
		case "ADD_TODO":
			return [
					...state,
					{
						text: action.text
					}
				]
			break;
		default: 
			return state
	}
}