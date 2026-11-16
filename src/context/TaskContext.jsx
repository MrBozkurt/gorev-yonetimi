import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SAMPLE_TASKS } from '../utils/helpers'

// ── Context ───────────────────────────────────────
const TaskContext = createContext(null)

// ── Reducer – CRUD işlemleri ──────────────────────
function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.payload, ...state]

    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() }
          : task
      )

    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)

    case 'SET_TASKS':
      return action.payload

    default:
      return state
  }
}

// ── Provider bileşeni ─────────────────────────────
export function TaskProvider({ children }) {
  const [savedTasks, setSavedTasks] = useLocalStorage(
    'gorev-yonetimi-tasks',
    SAMPLE_TASKS
  )
  const [tasks, dispatch] = useReducer(taskReducer, savedTasks)

  // Görevler her değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    setSavedTasks(tasks)
  }, [tasks, setSavedTasks])

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

// ── Custom hook ───────────────────────────────────
export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks, TaskProvider içinde kullanılmalıdır.')
  }
  return context
}
