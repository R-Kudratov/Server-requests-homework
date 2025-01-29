import { useEffect, useState } from 'react'
import { URL } from '../DB/api'

export const useRequestGetTodos = (refreshFlag, isSorting) => {
	const [todoList, setTodoList] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (todoList.length === 0) {
			setIsLoading(true)
		}

		fetch(isSorting ? `${URL}?_sort=title` : URL)
			.then((response) => response.json())
			.then((data) => setTodoList(data))
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}, [refreshFlag, isSorting])

	return {
		todoList,
		isLoading,
	}
}
