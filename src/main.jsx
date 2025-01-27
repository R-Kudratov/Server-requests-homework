import React from 'react'
import ReactDOM from 'react-dom/client'

import { TodoLayout } from './components/todo/index.jsx'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<TodoLayout />
	</React.StrictMode>,
)
