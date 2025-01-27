import styles from './input.module.css'

export const InputLayout = () => {
	return (
		<div className={styles.inputWrapper}>
			<input
				type="text"
				className={styles.input}
				placeholder="Введите текст задачи"
			/>
		</div>
	)
}
