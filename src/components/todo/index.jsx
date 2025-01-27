import styles from './index.module.css'
import { InputLayout } from './input/input.jsx'
import { ItemsLayout } from './items-list/items.jsx'

export const TodoLayout = () => {
	return (
		<div className={styles.todoList}>
			<InputLayout />
			<ItemsLayout />
		</div>
	)
}
