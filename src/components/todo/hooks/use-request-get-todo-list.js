import { useState } from 'react'
import { useEffect } from 'react'

const URL = 'https://jsonplaceholder.typicode.com/todos?_start=0&_end=10'

export const useRequestGetTodoList = () => {
	const [todoList, setTodoList] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		fetch(URL)
			.then((response) => response.json())
			.then((todos) => {
				setTodoList(todos)
				setIsLoading(false)
			})
	}, [])

	return { todoList, isLoading }
}
