import { useState, useEffect } from 'react'

/**
 * useLocalStorage – Veriyi tarayıcının LocalStorage'ına kaydeden özel hook.
 *
 * @param {string} key   LocalStorage anahtarı
 * @param {*}      initialValue  Anahtar bulunamazsa kullanılacak varsayılan değer
 * @returns {[*, Function]}  [değer, değerAyarla]
 */
export function useLocalStorage(key, initialValue) {
  // İlk yüklemede LocalStorage'dan oku
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`LocalStorage okuma hatası (${key}):`, error)
      return initialValue
    }
  })

  // Değer değiştiğinde LocalStorage'a yaz
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`LocalStorage yazma hatası (${key}):`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
