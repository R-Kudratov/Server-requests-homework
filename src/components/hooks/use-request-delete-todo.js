import { URL } from '../DB/api'

export const useRequestDeleteTodo = (refreshFlag, setRefreshFlag) => {
	const deleteTodo = (todoId) => {
		fetch(`${URL}/${todoId}`, {
			method: 'DELETE',
		}).finally(() => setRefreshFlag(!refreshFlag))
	}

	return { deleteTodo }
}
