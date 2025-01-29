import { URL } from '../DB/api'

export const useRequestPostTodo = (refreshFlag, setRefreshFlag) => {
	const postTodo = (todoText) => {
		fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ title: todoText }),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.finally(() => {
				setRefreshFlag(!refreshFlag)
			})
	}

	return { postTodo }
}
