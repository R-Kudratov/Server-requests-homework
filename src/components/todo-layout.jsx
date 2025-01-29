import styles from './todo.module.css'
import { TodoItem } from './todo-item/todo-item'
import { TodoInput } from './todo-input/todo-input'
import { TodoApp } from './todo-container'

export const TodoLayout = () => {
	const {
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
	} = TodoApp()

	return (
		<div className={styles.todoList}>
			<TodoInput
				handleInput={handleInput}
				handleSubmit={handleSubmit}
				handleSearch={handleSearch}
				handleSort={handleSort}
				inputValue={inputValue}
				isSorting={isSorting}
				styles={styles}
			/>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div className={styles.todosWrapper}>
					<ul className={styles.todos}>
						{(isSearching ? searchedTodoList : todoList).map(
							(todo) => (
								<TodoItem
									key={todo.id}
									todo={todo}
									editingId={editingId}
									editText={editText}
									handleEdit={handleEdit}
									handleEditChange={handleEditChange}
									chancelEdit={chancelEdit}
									handleDelete={handleDelete}
									styles={styles}
								/>
							),
						)}
					</ul>
				</div>
			)}
		</div>
	)
}
