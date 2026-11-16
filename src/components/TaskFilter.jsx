import { PRIORITIES, STATUSES, CATEGORIES } from '../utils/helpers'

/**
 * TaskFilter – Görevleri durum, öncelik ve kategoriye göre filtreler.
 */
export default function TaskFilter({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const hasActiveFilter =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all'

  const selectClass =
    'px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors'

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mr-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="hidden sm:inline font-medium">Filtrele:</span>
      </div>

      {/* Durum Filtresi */}
      <select
        value={filters.status}
        onChange={(e) => handleChange('status', e.target.value)}
        className={selectClass}
      >
        <option value="all">Tüm Durumlar</option>
        {Object.entries(STATUSES).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      {/* Öncelik Filtresi */}
      <select
        value={filters.priority}
        onChange={(e) => handleChange('priority', e.target.value)}
        className={selectClass}
      >
        <option value="all">Tüm Öncelikler</option>
        {Object.entries(PRIORITIES).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      {/* Kategori Filtresi */}
      <select
        value={filters.category}
        onChange={(e) => handleChange('category', e.target.value)}
        className={selectClass}
      >
        <option value="all">Tüm Kategoriler</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Filtreleri Temizle */}
      {hasActiveFilter && (
        <button
          onClick={() =>
            setFilters({ status: 'all', priority: 'all', category: 'all' })
          }
          className="inline-flex items-center gap-1 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Temizle
        </button>
      )}
    </div>
  )
}
