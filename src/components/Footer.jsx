/**
 * Footer – Uygulama alt çubuğu.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 mt-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {year} Görev Yönetim Paneli — React + Vite + Tailwind CSS
          </p>
          <p className="flex items-center gap-1">
            Yapay Zeka Destekli Web Geliştirme Eğitimi Projesi
          </p>
        </div>
      </div>
    </footer>
  )
}
