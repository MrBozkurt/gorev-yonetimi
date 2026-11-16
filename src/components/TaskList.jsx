import { useMemo } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'

/**
 * TaskList – Filtrelenmiş ve sıralanmış görev kartlarını listeler.
 */
export default function TaskList({ searchQuery, filters, onEdit }) {
  const { tasks } = useTasks()

  // Filtreleme
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Arama filtresi
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !task.title.toLowerCase().includes(q) &&
          !task.description?.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      // Durum filtresi
      if (filters.status !== 'all' && task.status !== filters.status) return false
      // Öncelik filtresi
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false
      // Kategori filtresi
      if (filters.category !== 'all' && task.category !== filters.category) return false

      return true
    })
  }, [tasks, searchQuery, filters])

  // Sıralama: devam eden > yapılacak > tamamlanan, sonra öncelik, sonra tarih
  const sortedTasks = useMemo(() => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const statusOrder = { 'in-progress': 0, todo: 1, done: 2 }

    return [...filteredTasks].sort((a, b) => {
      const sA = statusOrder[a.status] ?? 9
      const sB = statusOrder[b.status] ?? 9
      if (sA !== sB) return sA - sB

      const pA = priorityOrder[a.priority] ?? 9
      const pB = priorityOrder[b.priority] ?? 9
      if (pA !== pB) return pA - pB

      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }, [filteredTasks])

  // Boş durum
  if (sortedTasks.length === 0) {
    const hasFilters =
      searchQuery ||
      filters.status !== 'all' ||
      filters.priority !== 'all' ||
      filters.category !== 'all'

    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-5">
          {hasFilters ? (
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {hasFilters ? 'Sonuç bulunamadı' : 'Henüz görev yok'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          {hasFilters
            ? 'Farklı bir arama terimi deneyin veya filtreleri temizleyin.'
            : 'Sağ alttaki + butonuna tıklayarak ilk görevinizi oluşturun.'}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Sonuç sayısı */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {sortedTasks.length} görev gösteriliyor
        {sortedTasks.length !== tasks.length && (
          <span className="text-gray-400 dark:text-gray-500">
            {' '}(toplam {tasks.length})
          </span>
        )}
      </p>

      {/* Görev kartları ızgarası */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} />
        ))}
      </div>
    </div>
  )
}
