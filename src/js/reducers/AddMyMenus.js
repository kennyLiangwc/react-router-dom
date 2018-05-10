export default (state = [], action) => {
    switch(action.type) {
        case "ADD_MY_MENUS":
            console.log("action",action)
            return {
                myMenusList: action.myMenus
            }
        default:
            return state
    }
}