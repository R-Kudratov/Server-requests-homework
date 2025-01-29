import { useState } from 'react'
import {
	useRequestPostTodo,
	useRequestDeleteTodo,
	useRequestEditTodo,
	useRequestGetTodos,
} from './hooks'

export const TodoApp = () => {
	const [inputValue, setInputValue] = useState('')
	const [searchedTodoList, setSearchedTodoList] = useState([])
	const [isSorting, setIsSorting] = useState(false)
	const [isSearching, setIsSearching] = useState(false)
	const [editingId, setEditingId] = useState(null)
	const [editText, setEditText] = useState('')
	const [refreshFlag, setRefreshFlag] = useState(false)

	const { todoList, isLoading } = useRequestGetTodos(refreshFlag, isSorting)
	const { postTodo } = useRequestPostTodo(refreshFlag, setRefreshFlag)
	const { deleteTodo } = useRequestDeleteTodo(refreshFlag, setRefreshFlag)
	const { editTodo } = useRequestEditTodo(refreshFlag, setRefreshFlag)

	const handleInput = (e) => {
		const value = e.target.value
		if (value === '') {
			setInputValue('')
			setIsSearching(false)
			return
		}
		setInputValue(value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (inputValue === '') return
		postTodo(inputValue)
		setInputValue('')
	}

	const handleSearch = () => {
		if (inputValue.trim() === '') {
			setIsSearching(false)
			return
		}

		const matchedTasks = todoList.filter((todo) =>
			todo.title.toLowerCase().includes(inputValue.toLowerCase()),
		)

		setSearchedTodoList(matchedTasks)
		setIsSearching(true)
	}

	const handleEdit = (todoId, currentText) => {
		if (editingId === todoId) {
			editTodo(editingId, editText)
			setEditingId(null)
		} else {
			setEditingId(todoId)
			setEditText(currentText)
		}
	}

	const chancelEdit = () => {
		setEditingId(null)
		setEditText('')
	}

	const handleEditChange = (e) => {
		setEditText(e.target.value)
	}

	const handleDelete = (id) => {
		deleteTodo(id)
	}

	const handleSort = () => {
		setIsSorting(!isSorting)
	}

	return {
		handleInput,
		handleSubmit,
		handleSearch,
		handleEdit,
		chancelEdit,
		handleEditChange,
		handleDelete,
		handleSort,
		inputValue,
		isSorting,
		isLoading,
		isSearching,
		searchedTodoList,
		editText,
		editingId,
		todoList,
	}
}
