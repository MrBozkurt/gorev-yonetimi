// ──────────────────────────────────────────────────
// helpers.js – Sabitler ve yardımcı fonksiyonlar
// ──────────────────────────────────────────────────

/** Öncelik seviyeleri ve renkleri */
export const PRIORITIES = {
  low: {
    label: 'Düşük',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-700 dark:text-green-400',
  },
  medium: {
    label: 'Orta',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-700 dark:text-yellow-400',
  },
  high: {
    label: 'Yüksek',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-700 dark:text-red-400',
  },
}

/** Durum etiketleri ve renkleri */
export const STATUSES = {
  todo: {
    label: 'Yapılacak',
    bgColor: 'bg-slate-100 dark:bg-slate-700',
    textColor: 'text-slate-700 dark:text-slate-300',
  },
  'in-progress': {
    label: 'Devam Ediyor',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-700 dark:text-blue-400',
  },
  done: {
    label: 'Tamamlandı',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
}

/** Kategori listesi */
export const CATEGORIES = ['Genel', 'İş', 'Kişisel', 'Eğitim', 'Sağlık', 'Finans']

/** Benzersiz ID üretir */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/** Tarihi Türkçe biçimde döndürür (ör. 15 Kasım 2026) */
export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Göreli tarih döndürür (ör. "3 saat önce") */
export function formatRelativeDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Az önce'
  if (diffMins < 60) return `${diffMins} dakika önce`
  if (diffHours < 24) return `${diffHours} saat önce`
  if (diffDays < 7) return `${diffDays} gün önce`
  return formatDate(dateString)
}

/** Son tarih geçmiş mi kontrol eder */
export function isOverdue(dueDate) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

/** Başlangıç için örnek görevler */
export const SAMPLE_TASKS = [
  {
    id: generateId(),
    title: 'React Temelleri Öğren',
    description: 'React hooks, state yönetimi ve component yapısını çalış. Resmi dökümantasyonu incele.',
    priority: 'high',
    status: 'in-progress',
    category: 'Eğitim',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
  },
  {
    id: generateId(),
    title: 'Proje README Dosyası Hazırla',
    description: 'GitHub deposu için detaylı README dosyası oluştur. Kurulum adımları ve ekran görüntüleri ekle.',
    priority: 'medium',
    status: 'todo',
    category: 'İş',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
  },
  {
    id: generateId(),
    title: 'Tailwind CSS Kurulumu',
    description: 'Projeye Tailwind CSS entegre et ve özel tema ayarlarını yapılandır.',
    priority: 'low',
    status: 'done',
    category: 'İş',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    dueDate: null,
  },
  {
    id: generateId(),
    title: 'Haftalık Egzersiz Planı',
    description: 'Haftada 3 gün spor programı oluştur ve takip et.',
    priority: 'medium',
    status: 'in-progress',
    category: 'Sağlık',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
  },
  {
    id: generateId(),
    title: 'Aylık Bütçe Planlaması',
    description: 'Gelir ve giderleri analiz et, tasarruf hedeflerini belirle.',
    priority: 'high',
    status: 'todo',
    category: 'Finans',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
  },
]
