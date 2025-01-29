export const TodoItem = ({
	todo,
	editingId,
	editText,
	handleEdit,
	handleEditChange,
	chancelEdit,
	handleDelete,
	styles,
}) => {
	return (
		<li className={styles.item}>
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
				onClick={() => handleEdit(todo.id, todo.title)}
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
	)
}
