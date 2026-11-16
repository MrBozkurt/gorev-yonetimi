# Görev Yönetim Paneli

Modern ve kullanıcı dostu bir görev yönetim uygulaması. React, Vite ve Tailwind CSS kullanılarak geliştirilmiştir. Veriler tarayıcının LocalStorage'ında saklanır.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Özellikler

- **CRUD İşlemleri** — Görev ekleme, düzenleme, silme ve listeleme
- **Arama & Filtreleme** — Başlık/açıklamada arama, durum/öncelik/kategoriye göre filtreleme
- **Dashboard İstatistikleri** — Toplam, tamamlanan, devam eden ve bekleyen görev sayıları ile ilerleme çubuğu
- **Karanlık / Aydınlık Tema** — Tek tıkla tema değiştirme, tercih LocalStorage'da saklanır
- **LocalStorage** — Tüm veriler tarayıcıda kalıcı olarak saklanır
- **Responsive Tasarım** — Mobil, tablet ve masaüstü uyumlu
- **Gecikme Uyarıları** — Son tarihi geçen görevler kırmızı ile vurgulanır
- **Öncelik & Kategori** — Düşük / Orta / Yüksek öncelik ve 6 kategori desteği
- **Klavye Desteği** — ESC tuşu ile modal kapatma

---

## Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| [React 18](https://react.dev) | Kullanıcı arayüzü kütüphanesi |
| [Vite 5](https://vitejs.dev) | Hızlı geliştirme sunucusu ve paketleyici |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first CSS çerçevesi |
| [LocalStorage API](https://developer.mozilla.org/tr/docs/Web/API/Window/localStorage) | Tarayıcıda veri saklama |
| [Context API + useReducer](https://react.dev/learn/scaling-up-with-reducer-and-context) | Global state yönetimi |

---

## Kurulum

### Ön Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya üzeri)
- npm veya pnpm

### Adımlar

```bash
# 1. Depoyu klonlayın
git clone https://github.com/MrBozkurt/gorev-yonetimi
cd gorev-yonetimi

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev

# 4. Tarayıcıda açın
# http://localhost:5173
```

### Derleme (Production Build)

```bash
npm run build
npm run preview   # Derlenen sürümü önizleme
```

---

## Proje Yapısı

```
gorev-yonetimi/
├── index.html                  # Ana HTML şablonu
├── package.json                # Proje bağımlılıkları ve scriptler
├── vite.config.js              # Vite yapılandırması
├── tailwind.config.js          # Tailwind CSS yapılandırması
├── postcss.config.js           # PostCSS yapılandırması
├── public/
│   └── favicon.svg             # Site ikonu
└── src/
    ├── main.jsx                # React giriş noktası
    ├── index.css               # Tailwind direktifleri ve global stiller
    ├── App.jsx                 # Ana uygulama bileşeni
    ├── components/
    │   ├── Header.jsx          # Üst çubuk (arama, tema geçişi)
    │   ├── Stats.jsx           # İstatistik kartları ve ilerleme çubuğu
    │   ├── TaskFilter.jsx      # Durum/öncelik/kategori filtreleri
    │   ├── TaskList.jsx        # Görev kartları ızgarası
    │   ├── TaskCard.jsx        # Tek görev kartı (CRUD işlemleri)
    │   ├── TaskForm.jsx        # Görev ekleme/düzenleme modal formu
    │   └── Footer.jsx          # Alt bilgi çubuğu
    ├── context/
    │   └── TaskContext.jsx     # Global state yönetimi (Context + Reducer)
    ├── hooks/
    │   └── useLocalStorage.js  # LocalStorage custom hook
    └── utils/
        └── helpers.js          # Sabitler ve yardımcı fonksiyonlar
```

---

## Yapay Zeka Kullanımı

Bu proje, yapay zeka destekli web geliştirme eğitimi kapsamında oluşturulmuştur. Yapay zeka araçları aşağıdaki aşamalarda kullanılmıştır:

| Aşama | Yapay Zeka Kullanımı |
|-------|---------------------|
| **Planlama** | Proje yapısı, bileşen mimarisi ve veri modeli tasarımı |
| **Kod Üretimi** | React bileşenleri, custom hook'lar ve yardımcı fonksiyonlar |
| **Stil Tasarımı** | Tailwind CSS sınıfları, responsive tasarım ve tema sistemi |
| **Hata Ayıklama** | Kod inceleme, hata tespiti ve düzeltme önerileri |
| **Dokümantasyon** | README dosyası ve kod içi yorumlar |

> **Not:** Yapay zeka tarafından üretilen tüm kodlar incelenmiş, test edilmiş ve gerektiğinde düzenlenmiştir.
