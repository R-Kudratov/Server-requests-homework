import { useRequestGetTodoList } from '../hooks/use-request-get-todo-list.js'

import styles from './items.module.css'

export const ItemsLayout = () => {
	const { todoList, isLoading } = useRequestGetTodoList()

	return isLoading ? (
		<span className={styles.loader}></span>
	) : (
		<ul className={styles.todos}>
			{todoList.map((todo) => (
				<li className={styles.item} key={todo.id}>
					{todo.title}
				</li>
			))}
		</ul>
	)
}
