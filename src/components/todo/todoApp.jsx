import { useEffect, useState } from 'react'

import { URL, URL_SORTED_BY_TITLE } from './DB/api'

import styles from './todo.module.css'

export const TodoApp = () => {
	const [todoList, setTodoList] = useState([])
	const [searchedTodoList, setSearchedTodoList] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isSorting, setIsSorting] = useState(false)
	const [isSearching, setIsSearching] = useState(false)
	const [editingId, setEditingId] = useState(null)
	const [editText, setEditText] = useState('')
	const [refreshFlag, setRefreshFlag] = useState(false)
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		setIsSearching(false)
		setInputValue('')
	}, [todoList])

	useEffect(() => {
		if (todoList.length === 0) {
			setIsLoading(true)
		}

		fetch(isSorting ? URL_SORTED_BY_TITLE : URL)
			.then((response) => response.json())
			.then(setTodoList)
			.finally(() => setIsLoading(false))
	}, [refreshFlag, isSorting])

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
			.finally(() => setRefreshFlag(!refreshFlag))
	}

	const deleteTodo = (todoId) => {
		fetch(`${URL}/${todoId}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.finally(() => setRefreshFlag(!refreshFlag))
	}

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
			.finally(() => setRefreshFlag(!refreshFlag))
	}

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

	return (
		<div className={styles.todoList}>
			<div className={styles.controlsWrapper}>
				<form onSubmit={handleSubmit} className={styles.inputWrapper}>
					<input
						type="text"
						className={styles.input}
						placeholder="Введите текст задачи"
						value={inputValue}
						onChange={handleInput}
					/>
					<button
						type="submit"
						className={`${styles.btn} ${styles.submitBtn}`}
					></button>
				</form>
				<button
					onClick={handleSearch}
					className={`${styles.btn} ${styles.searchBtn}`}
				></button>
				<span
					onClick={handleSort}
					className={`${styles.btn} ${styles.sortSwitch} ${isSorting ? styles.activeSwitch : ''}`}
				></span>
			</div>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div className={styles.todosWrapper}>
					<ul className={styles.todos}>
						{(isSearching ? searchedTodoList : todoList).map(
							(todo) => (
								<li
									className={styles.item}
									key={todo.id}
									id={todo.id}
								>
									{editingId === todo.id ? (
										<input
											type="text"
											value={editText}
											onChange={handleEditChange}
											className={`${styles.editItemInput} ${styles.input}`}
											autoFocus
										/>
									) : (
										<span>{todo.title}</span>
									)}

									<button
										onClick={() =>
											handleEdit(todo.id, todo.title)
										}
										className={`${styles.btn} ${editingId === todo.id ? styles.confirmEditBtn : styles.editBtn}`}
									></button>
									<button
										onClick={
											editingId === todo.id
												? chancelEdit
												: () => handleDelete(todo.id)
										}
										className={`${styles.btn} ${styles.deleteBtn}`}
									></button>
								</li>
							),
						)}
					</ul>
				</div>
			)}
		</div>
	)
}
