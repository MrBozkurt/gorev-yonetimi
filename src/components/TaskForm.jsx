import { useState, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import { generateId, PRIORITIES, STATUSES, CATEGORIES } from '../utils/helpers'

/**
 * TaskForm – Yeni görev ekleme / mevcut görevi düzenleme modal formu.
 */
export default function TaskForm({ onClose, editingTask }) {
  const { dispatch } = useTasks()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    category: 'Genel',
    dueDate: '',
  })

  const [errors, setErrors] = useState({})

  // Düzenleme modunda formu doldur
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
        status: editingTask.status,
        category: editingTask.category,
        dueDate: editingTask.dueDate || '',
      })
    }
  }, [editingTask])

  // ESC tuşu ile kapat
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  /** Form doğrulaması */
  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Görev başlığı gereklidir.'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Başlık en fazla 100 karakter olabilir.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /** Formu gönder */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const now = new Date().toISOString()

    if (editingTask) {
      // Güncelle
      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...editingTask, ...formData, updatedAt: now },
      })
    } else {
      // Yeni ekle
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: generateId(),
          ...formData,
          createdAt: now,
          updatedAt: now,
        },
      })
    }

    onClose()
  }

  /** Alan değişikliği */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const inputClass =
    'w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors'

  const labelClass =
    'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Arka plan perdesi */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal içeriği */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Başlık */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {editingTask ? (
              <>
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Görevi Düzenle
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Yeni Görev
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Başlık */}
          <div>
            <label className={labelClass}>
              Görev Başlığı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Görev başlığını yazın..."
              className={`${inputClass} ${
                errors.title ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Açıklama */}
          <div>
            <label className={labelClass}>Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Görev hakkında detay yazın..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Öncelik & Kategori */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Öncelik</label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className={inputClass}
              >
                {Object.entries(PRIORITIES).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={inputClass}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Durum (yalnızca düzenleme modunda) */}
          {editingTask && (
            <div>
              <label className={labelClass}>Durum</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className={inputClass}
              >
                {Object.entries(STATUSES).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Son Tarih */}
          <div>
            <label className={labelClass}>Son Tarih</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Butonlar */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow"
            >
              {editingTask ? 'Güncelle' : 'Görev Ekle'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
