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
  const [hoveredSection, setHoveredSection] = useState(null)
  const [isDarkTheme, setIsDarkTheme] = useState(true)

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

  // Данные о продукции (без единиц измерения)
  const products = [
    // Мясо оленя
    { name: "Мясо оленей I категории", category: "Оленина" },
    { name: "Мясо оленей II категории", category: "Оленина" },
    { name: "Оленина «Праздничная»", category: "Оленина" },
    { name: "Фарш олений замороженный", category: "Оленина" },
    { name: "Шея оленя", category: "Оленина" },
    // Рыба
    { name: "Щекур крупный (Чир)", category: "Рыба" },
    { name: "Щекур", category: "Рыба" },
    { name: "Пыжьян", category: "Рыба" },
    { name: "Сырок", category: "Рыба" },
    { name: "Щука крупная", category: "Рыба" },
    { name: "Щука мелкая", category: "Рыба" },
    { name: "Налим", category: "Рыба" },
    { name: "Ряпушка мелкая", category: "Рыба" },
    { name: "Язь крупный", category: "Рыба" },
    { name: "Язь мелкий", category: "Рыба" },
    { name: "Плотва крупная", category: "Рыба" },
    { name: "Плотва мелкая", category: "Рыба" },
    { name: "Окунь", category: "Рыба" },
    { name: "Фарш рыбный пищевой замороженный", category: "Рыба" },
    { name: "Вяленая ряпушка", category: "Рыба" },
    { name: "Вяленая щука", category: "Рыба" },
    { name: "Стейк налима", category: "Рыба" },
    { name: "Чипсы", category: "Рыба" },
    { name: "Филе налима", category: "Рыба" },
    { name: "Филе щуки", category: "Рыба" },
    // Субпродукты и другое
    { name: "Языки", category: "Субпродукты" },
    { name: "Сердце", category: "Субпродукты" },
    { name: "Почки", category: "Субпродукты" },
    { name: "Камусы оленя", category: "Субпродукты" }
  ]

  // Группировка продуктов по категориям
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = []
    acc[product.category].push(product)
    return acc
  }, {})

  // Переключение темы
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    localStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light')
  }

  // Загрузка сохраненной темы
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setIsDarkTheme(false)
    } else if (savedTheme === 'dark') {
      setIsDarkTheme(true)
    }
  }, [])

  // Применяем тему к body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    } else {
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    }
  }, [isDarkTheme])

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
    if (!isDarkTheme) return
    
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
      gradient.addColorStop(0, '#020804')
      gradient.addColorStop(0.5, '#051a0e')
      gradient.addColorStop(1, '#001208')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const auroraColors = [
        { r: 60, g: 180, b: 120, intensity: 0.15 },
        { r: 40, g: 160, b: 140, intensity: 0.12 },
        { r: 80, g: 200, b: 100, intensity: 0.1 },
        { r: 50, g: 140, b: 180, intensity: 0.08 },
        { r: 90, g: 210, b: 110, intensity: 0.13 }
      ]
      
      for (let layer = 0; layer < 5; layer++) {
        const color = auroraColors[layer]
        const bandCount = 8 + Math.sin(time * 0.001 + layer) * 3
        const baseY = canvas.height * (0.2 + layer * 0.08)
        
        for (let band = 0; band < bandCount; band++) {
          ctx.beginPath()
          
          const bandOffset = (band / bandCount) * Math.PI * 2 + time * 0.0005
          const bandY = baseY + Math.sin(bandOffset) * 40 + Math.cos(time * 0.0008 + band) * 25
          const bandWidth = 60 + Math.sin(bandOffset * 2) * 30 + Math.sin(time * 0.002) * 20
          
          for (let x = -50; x <= canvas.width + 50; x += 15) {
            const noise = Math.sin(x * 0.015 + time * 0.003 + band) * Math.cos(x * 0.008 + band) * 25
            const y = bandY + noise + Math.sin(x * 0.02 + time * 0.002) * 15
            const verticalNoise = Math.sin(x * 0.03 + band) * 12
            
            if (x === -50) {
              ctx.moveTo(x, y + verticalNoise)
            } else {
              ctx.lineTo(x, y + verticalNoise)
            }
          }
          
          const bandGradient = ctx.createLinearGradient(0, bandY - bandWidth/2, 0, bandY + bandWidth/2)
          bandGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
          bandGradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.intensity * 0.7})`)
          bandGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.intensity})`)
          bandGradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.intensity * 0.7})`)
          bandGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
          
          ctx.fillStyle = bandGradient
          ctx.fill()
        }
      }
      
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width
        const y = canvas.height * (0.15 + Math.random() * 0.5)
        const radius = 30 + Math.random() * 80
        const opacity = 0.03 + Math.random() * 0.07
        
        const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        spotGradient.addColorStop(0, `rgba(80, 200, 140, ${opacity})`)
        spotGradient.addColorStop(0.5, `rgba(60, 160, 120, ${opacity * 0.5})`)
        spotGradient.addColorStop(1, `rgba(40, 120, 80, 0)`)
        
        ctx.fillStyle = spotGradient
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
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
  }, [isDarkTheme])

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {isDarkTheme && <canvas id="auroraCanvas" className="aurora-canvas"></canvas>}

      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">Совхоз "Пуровский"</h1>
            <div className="header-right">
              <nav className="nav">
                {['about', 'gallery', 'products', 'documents', 'contacts'].map((section) => (
                  <button
                    key={section}
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                    onClick={() => scrollToSection(section)}
                  >
                    {section === 'about' && 'О нас'}
                    {section === 'gallery' && 'Галерея'}
                    {section === 'products' && 'Продукция'}
                    {section === 'documents' && 'Документы'}
                    {section === 'contacts' && 'Контакты'}
                  </button>
                ))}
              </nav>
              
              <button 
                className={`theme-toggle ${isDarkTheme ? 'dark' : 'light'}`} 
                onClick={toggleTheme}
                aria-label="Переключить тему"
              >
                <div className="toggle-track">
                  <div className="toggle-thumb"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section 
          id="about" 
          className="section"
          onMouseEnter={() => setHoveredSection('about')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="container">
            <h2 className="section-title">О нас</h2>
            <AboutSection />
          </div>
        </section>

        <section 
          id="gallery" 
          className="section"
          onMouseEnter={() => setHoveredSection('gallery')}
          onMouseLeave={() => setHoveredSection(null)}
        >
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

      {/* Секция "Продукция" - компактная, перед документами */}
<section 
  id="products" 
  className="section"
  onMouseEnter={() => setHoveredSection('products')}
  onMouseLeave={() => setHoveredSection(null)}
>
  <div className="container">
    <h2 className="section-title">Продукция</h2>
    
    <div style={{
      textAlign: 'center',
      marginBottom: '30px',
      padding: '16px 20px',
      background: isDarkTheme ? 'rgba(8, 18, 12, 0.5)' : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(8px)',
      borderRadius: '12px',
      boxShadow: isDarkTheme ? 'none' : '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <p style={{ 
        fontSize: '14px', 
        lineHeight: 1.5, 
        marginBottom: '10px',
        color: isDarkTheme ? '#d0d8d0' : '#1a2a3a',
        fontWeight: isDarkTheme ? '400' : '500'
      }}>
        АО "Совхоз Пуровский" предлагает свежую продукцию и полуфабрикаты из оленины и рыбы.
      </p>
      <p style={{ 
        fontSize: '13px', 
        color: isDarkTheme ? '#b0d0b0' : '#1a6a8a',
        fontWeight: isDarkTheme ? '400' : '500'
      }}>
        По вопросам приобретения: 
        <strong style={{ fontWeight: 600 }}> +7(908)855-29-35</strong> (Пётр Константинович) или 
        <strong style={{ fontWeight: 600 }}> inbox@sovhozpur.ru</strong>
      </p>
    </div>

    {Object.entries(groupedProducts).map(([category, items]) => (
      <div key={category} style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '20px',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '15px',
          color: isDarkTheme ? '#b0d0b0' : '#1a5a7a',
          borderLeft: `3px solid ${isDarkTheme ? '#7CB342' : '#2a8ab0'}`,
          paddingLeft: '12px'
        }}>{category}</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '8px'
        }}>
          {items.map((product, idx) => (
            <div key={idx} style={{
              background: isDarkTheme ? 'rgba(8, 18, 12, 0.4)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
              borderRadius: '8px',
              padding: '6px 12px',
              transition: 'all 0.2s ease',
              border: `1px solid ${isDarkTheme ? 'rgba(100, 180, 100, 0.15)' : 'rgba(42, 138, 176, 0.25)'}`,
              fontSize: '13px',
              fontWeight: isDarkTheme ? '400' : '500',
              color: isDarkTheme ? '#d0d8d0' : '#1a2a3a'
            }}>
              {product.name}
            </div>
          ))}
        </div>
      </div>
    ))}

    <div style={{
      textAlign: 'center',
      marginTop: '20px',
      padding: '12px',
      background: isDarkTheme ? 'rgba(8, 18, 12, 0.4)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      borderRadius: '10px'
    }}>
      <p style={{ 
        fontSize: '12px',
        color: isDarkTheme ? '#b0d0b0' : '#3a6a7a',
        fontWeight: isDarkTheme ? '400' : '500'
      }}>
        На всю продукцию имеются сертификаты качества
      </p>
    </div>
  </div>
</section>

        <section 
          id="documents" 
          className="section"
          onMouseEnter={() => setHoveredSection('documents')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="container">
            <h2 className="section-title">Документы</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              maxWidth: '700px',
              margin: '0 auto',
              width: '100%'
            }}>
              {[
                { name: "Устав предприятия", link: "#" },
                { name: "Лицензии и сертификаты", link: "#" },
                { name: "Годовой отчет 2024", link: "#" },
                { name: "Коллективный договор", link: "#" }
              ].map((doc, index) => (
                <div key={index} className="document-card" style={{
                  background: isDarkTheme ? 'rgba(8, 18, 12, 0.5)' : 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                  border: `1px solid ${isDarkTheme ? 'rgba(100, 180, 100, 0.15)' : 'rgba(100, 180, 200, 0.3)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <h3 className="document-name" style={{
                    fontSize: '15px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 600,
                    marginBottom: '14px',
                    color: isDarkTheme ? '#b0d0b0' : '#1a6a8a'
                  }}>{doc.name}</h3>
                  <a href={doc.link} className="download-btn" download style={{
                    display: 'inline-block',
                    background: isDarkTheme ? 'rgba(80, 150, 80, 0.25)' : 'rgba(42, 138, 176, 0.15)',
                    color: isDarkTheme ? '#c0e0c0' : '#1a6a8a',
                    padding: '6px 20px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: 500,
                    border: `1px solid ${isDarkTheme ? 'rgba(100, 180, 100, 0.3)' : 'rgba(42, 138, 176, 0.3)'}`,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}>Скачать</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="contacts" 
          className="section"
          onMouseEnter={() => setHoveredSection('contacts')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="container">
            <h2 className="section-title">Контакты</h2>
            <div className="contacts-grid">
              <div className="contacts-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <p>Россия, ЯНАО, Пуровский район, с.Самбург, ул. Производственная, д.1</p>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <p>+7 (951) 988-09-91; +7(900) 400-63-26</p>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <p>inbox@sovhozpur.ru</p>
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