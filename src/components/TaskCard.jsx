import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import {
  PRIORITIES,
  STATUSES,
  formatDate,
  formatRelativeDate,
  isOverdue,
} from '../utils/helpers'

/**
 * TaskCard – Tek bir görevi gösteren kart bileşeni.
 * Düzenleme, silme ve durum değiştirme işlemleri içerir.
 */
export default function TaskCard({ task, onEdit }) {
  const { dispatch } = useTasks()
  const [showConfirm, setShowConfirm] = useState(false)

  const priority = PRIORITIES[task.priority]
  const status = STATUSES[task.status]
  const overdue = isOverdue(task.dueDate) && task.status !== 'done'

  /** Görevi sil */
  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id })
    setShowConfirm(false)
  }

  /** Görev durumunu güncelle */
  const handleStatusChange = (newStatus) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, status: newStatus },
    })
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl border-2 ${
        overdue
          ? 'border-red-300 dark:border-red-700'
          : 'border-gray-100 dark:border-gray-700'
      } p-5 shadow-sm hover:shadow-lg transition-all duration-200 animate-fade-in group`}
    >
      {/* Üst Satır: Rozetler & Aksiyonlar */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Öncelik rozeti */}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${priority.bgColor} ${priority.textColor}`}
          >
            {priority.label}
          </span>
          {/* Kategori rozeti */}
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            {task.category}
          </span>
          {/* Gecikmiş rozeti */}
          {overdue && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
              Gecikmiş
            </span>
          )}
        </div>

        {/* Düzenle & Sil butonları */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
            title="Düzenle"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Sil"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Başlık */}
      <h3
        className={`text-base font-semibold mb-1.5 leading-snug ${
          task.status === 'done'
            ? 'line-through text-gray-400 dark:text-gray-500'
            : 'text-gray-900 dark:text-white'
        }`}
      >
        {task.title}
      </h3>

      {/* Açıklama */}
      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Son Tarih */}
      {task.dueDate && (
        <div
          className={`text-xs mb-3 flex items-center gap-1.5 ${
            overdue ? 'text-red-500 font-semibold' : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {overdue ? 'Gecikmiş: ' : 'Son Tarih: '}
          {formatDate(task.dueDate)}
        </div>
      )}

      {/* Alt Satır: Durum & Güncelleme zamanı */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border-0 cursor-pointer ${status.bgColor} ${status.textColor} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
        >
          {Object.entries(STATUSES).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {formatRelativeDate(task.updatedAt)}
        </span>
      </div>

      {/* Silme Onayı */}
      {showConfirm && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 animate-fade-in">
          <p className="text-sm text-red-700 dark:text-red-400 mb-2.5">
            Bu görevi silmek istediğinize emin misiniz?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              Evet, Sil
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
