import { useState } from 'react'
import { TaskProvider } from './context/TaskContext'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header'
import Stats from './components/Stats'
import TaskFilter from './components/TaskFilter'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Footer from './components/Footer'

// ── Ana İçerik ────────────────────────────────────
function AppContent({ darkMode, setDarkMode }) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
  })

  const handleEdit = (task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Stats />
        <TaskFilter filters={filters} setFilters={setFilters} />
        <TaskList
          searchQuery={searchQuery}
          filters={filters}
          onEdit={handleEdit}
        />
      </main>

      <Footer />

      {/* Yeni Görev Ekle – Kayan Buton */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-3xl z-40 group"
        title="Yeni Görev Ekle"
      >
        <span className="transition-transform duration-200 group-hover:rotate-90">+</span>
      </button>

      {/* Görev Formu (Modal) */}
      {isFormOpen && (
        <TaskForm onClose={handleCloseForm} editingTask={editingTask} />
      )}
    </div>
  )
}

// ── Kök App Bileşeni ──────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('gorev-yonetimi-theme', false)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <TaskProvider>
          <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
        </TaskProvider>
      </div>
    </div>
  )
}
