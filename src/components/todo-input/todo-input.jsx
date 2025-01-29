export const TodoInput = ({
	handleInput,
	handleSubmit,
	handleSearch,
	handleSort,
	inputValue,
	isSorting,
	styles,
}) => {
	return (
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
	)
}
