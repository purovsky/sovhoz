// src/App.jsx
import './App.css'

// Импорт современных шрифтов Google Fonts
const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Montserrat:wght@400;500;600;700&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

import { useState, useEffect, useRef } from 'react'

// Компонент секции "О нас" с текстом и квадратным изображением
const AboutSection = () => (
  <div className="about-wrapper">
    <div className="about-text">
      <p>Совхоз "Пуровский" — ведущее сельскохозяйственное предприятие Ямало-Ненецкого автономного округа. Мы занимаемся производством и переработкой сельскохозяйственной продукции в суровых условиях Крайнего Севера.</p>
      <p>Наша миссия — обеспечение населения качественными продуктами питания, произведёнными с учётом северных традиций и современных технологий.</p>
      <p>Основные направления деятельности: животноводство (крупный рогатый скот, оленеводство), растениеводство в защищённом грунте, переработка молочной и мясной продукции.</p>
      <p>Мы гордимся нашими сотрудниками, которые ежедневно вносят вклад в продовольственную безопасность региона.</p>
    </div>
    <div className="about-image">
      <img 
        src="https://sovhozpur.ru/wp-content/uploads/2021/09/IMG_20210902_143426-scaled.jpg" 
        alt="Совхоз Пуровский"
        loading="lazy"
      />
    </div>
  </div>
)

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [imagesLoaded, setImagesLoaded] = useState({})

  const galleryImages = [
    {
      url: "https://sovhozpur.ru/wp-content/uploads/2021/09/IMG_20210902_143258-scaled.jpg",
      title: "Панорама совхоза"
    },
    {
      url: "https://sovhozpur.ru/wp-content/uploads/2021/09/IMG_20210902_143426-scaled.jpg",
      title: "Животноводческий комплекс"
    },
    {
      url: "https://sovhozpur.ru/wp-content/uploads/2021/09/IMG_20210902_143609-scaled.jpg",
      title: "Трудовая деятельность"
    },
    {
      url: "https://sovhozpur.ru/wp-content/uploads/2021/09/IMG_20210902_143725-scaled.jpg",
      title: "Техника совхоза"
    },
    {
      url: "https://sovhozpur.ru/wp-content/uploads/2021/09/IMG_20210902_143859-scaled.jpg",
      title: "Сотрудники"
    }
  ]

  // Предзагрузка изображений
  useEffect(() => {
    galleryImages.forEach((img, idx) => {
      const image = new Image()
      image.src = img.url
      image.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [idx]: true }))
      }
    })
  }, [])

  // Обработка свайпов
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Эффект северного сияния
  useEffect(() => {
    const canvas = document.getElementById('auroraCanvas')
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#030a06')
      gradient.addColorStop(1, '#001a0a')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        const offset = i * 40
        for (let x = 0; x < canvas.width; x += 10) {
          const y = canvas.height * 0.3 + 
                    Math.sin(x * 0.008 + time * 0.002 + i) * 35 + 
                    Math.sin(x * 0.02 + time * 0.001) * 15 +
                    offset
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const opacity = 0.12 - i * 0.02
        const gradientStroke = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradientStroke.addColorStop(0, `rgba(70, 200, 120, ${opacity * 0.5})`)
        gradientStroke.addColorStop(0.5, `rgba(100, 230, 150, ${opacity})`)
        gradientStroke.addColorStop(1, `rgba(70, 200, 120, ${opacity * 0.5})`)
        ctx.strokeStyle = gradientStroke
        ctx.lineWidth = 28 - i * 5
        ctx.stroke()
      }
      
      time++
      animationId = requestAnimationFrame(drawAurora)
    }

    resizeCanvas()
    drawAurora()
    
    window.addEventListener('resize', resizeCanvas)
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="app">
      <canvas id="auroraCanvas" className="aurora-canvas"></canvas>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">Совхоз "Пуровский"</h1>
            <nav className="nav">
              {['about', 'gallery', 'documents', 'contacts'].map((section) => (
                <button
                  key={section}
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={() => scrollToSection(section)}
                >
                  {section === 'about' && 'О нас'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'documents' && 'Документы'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">О нас</h2>
            <AboutSection />
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <h2 className="section-title">Галерея</h2>
            <div className="carousel-container">
              <button className="carousel-btn prev" onClick={prevImage}>❮</button>
              <div 
                className="carousel-slide"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {!imagesLoaded[currentImageIndex] ? (
                  <div className="skeleton skeleton-image"></div>
                ) : (
                  <img 
                    src={galleryImages[currentImageIndex].url} 
                    alt={galleryImages[currentImageIndex].title}
                    className="carousel-image"
                    loading="lazy"
                  />
                )}
                <p className="image-caption">{galleryImages[currentImageIndex].title}</p>
              </div>
              <button className="carousel-btn next" onClick={nextImage}>❯</button>
            </div>
            <div className="carousel-dots">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="documents" className="section">
          <div className="container">
            <h2 className="section-title">Документы</h2>
            <div className="documents-grid">
              {[
                { name: "Устав предприятия", description: "Основной документ, регламентирующий деятельность совхоза", link: "#" },
                { name: "Лицензии и сертификаты", description: "Документы, подтверждающие качество продукции", link: "#" },
                { name: "Годовой отчет 2024", description: "Финансовые и производственные показатели", link: "#" },
                { name: "Коллективный договор", description: "Права и обязанности работников", link: "#" }
              ].map((doc, index) => (
                <div key={index} className="document-card">
                  <h3 className="document-name">{doc.name}</h3>
                  <p className="document-description">{doc.description}</p>
                  <a href={doc.link} className="download-btn" download>Скачать документ</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="section">
          <div className="container">
            <h2 className="section-title">Контакты</h2>
            <div className="contacts-grid">
              <div className="contacts-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <p>Ямало-Ненецкий АО, Пуровский район, п. Пуровск</p>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <p>+7 (349) 345-67-89</p>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <p>sovhozpur@yandex.ru</p>
                </div>
                <div className="contact-social">
                  <a href="#" className="social-icon">📘</a>
                  <a href="#" className="social-icon">📸</a>
                  <a href="#" className="social-icon">💬</a>
                </div>
              </div>
              <div className="contacts-map">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=77.6667,64.9167&z=12&pt=77.6667,64.9167,pm2rdl"
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Карта совхоза Пуровский"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Совхоз "Пуровский". Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}

export default App