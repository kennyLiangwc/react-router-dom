let nextTodoId = 0;

export const addTodo = text => ({
	type: "ADD_TODO",
	nextTodoId: nextTodoId++,
	text
});

export const addUserInfo = info => ({
	type: "ADD_USER_INFO",
	info
});

// export const saveUser