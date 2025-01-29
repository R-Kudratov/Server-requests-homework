import { URL } from '../DB/api'

export const useRequestEditTodo = (refreshFlag, setRefreshFlag) => {
	const editTodo = (editingId, newText) => {
		fetch(`${URL}/${editingId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ title: newText }),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.finally(() => {
				setRefreshFlag(!refreshFlag)
			})
	}
	return { editTodo }
}
