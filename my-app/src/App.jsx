// src/App.jsx
import './App.css'
import logo from './assets/logo.png'
import HeaderBorder from './components/HeaderBorder';

// Импорт современных шрифтов Google Fonts
const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Montserrat:wght@400;500;600;700&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

import { useState, useEffect, useRef } from 'react'
// Компонент секции "О нас" с текстом и круглым логотипом на белом фоне
const AboutSection = () => (
  <div className="about-wrapper">
    <div className="about-text">
      <p>АО «Совхоз Пуровский» – одно из крупных и стабильно развивающихся хозяйств не только Пуровского района, но и Ямало-Ненецкого автономного округа. Успех его деятельности связан с трудолюбием оленеводов и рыбаков, а также с профессиональным опытом руководителей всех подразделений совхоза. Какие бы задачи ни ставило время, коллектив умеет намеченные планы выполнять, а трудности, возникающие на пути, преодолевать целеустремленно и с неизменным положительным результатом.</p>
      <p>АО «Совхоз Пуровский» обеспечивает рабочими местами большую часть тундрового населения района и жителей села Самбург, он является поселкообразующим предприятием этого муниципального образования.</p>
    </div>
    <div className="about-image">
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
      }}>
        <img 
          src={logo}
          alt="Логотип Совхоз Пуровский"
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '50%'
          }}
        />
      </div>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

const isMobile = windowWidth <= 768;
const imageHeight = isMobile ? 250 : 350;
const slideMinHeight = isMobile ? 300 : 450;

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

  // Данные о продукции
  const products = [
    { name: "Мясо оленей I категории", category: "Оленина" },
    { name: "Мясо оленей II категории", category: "Оленина" },
    { name: "Оленина «Праздничная»", category: "Оленина" },
    { name: "Фарш олений замороженный", category: "Оленина" },
    { name: "Шея оленя", category: "Оленина" },
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
    { name: "Языки", category: "Субпродукты" },
    { name: "Сердце", category: "Субпродукты" },
    { name: "Почки", category: "Субпродукты" },
    { name: "Камусы оленя", category: "Субпродукты" }
  ]

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = []
    acc[product.category].push(product)
    return acc
  }, {})

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    localStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light')
  }


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setIsDarkTheme(false)
    } else if (savedTheme === 'dark') {
      setIsDarkTheme(true)
    }
  }, [])

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    } else {
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    }
  }, [isDarkTheme])

  useEffect(() => {
    galleryImages.forEach((img, idx) => {
      const image = new Image()
      image.src = img.url
      image.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [idx]: true }))
      }
    })
  }, [])

  // Отслеживание активной секции при скролле
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'gallery', 'products', 'documents', 'contacts']
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    setIsMenuOpen(false)
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
      
// Светящиеся пятна (очень медленное движение, но видимые)
for (let i = 0; i < 35; i++) {
  // Используем синус с очень маленьким коэффициентом для плавного движения
  const x = (Math.sin(i * 5.3 + time * 0.0006) * 0.4 + 0.5) * canvas.width
  const y = canvas.height * (0.2 + Math.sin(i * 3.7 + time * 0.0004) * 0.15)
  const radius = 50 + Math.sin(i * 2.1) * 25
  const opacity = 0.06 + Math.sin(i * 2.5) * 0.03
  
  const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
  spotGradient.addColorStop(0, `rgba(100, 220, 150, ${opacity})`)
  spotGradient.addColorStop(0.4, `rgba(70, 180, 120, ${opacity * 0.6})`)
  spotGradient.addColorStop(0.7, `rgba(50, 140, 100, ${opacity * 0.3})`)
  spotGradient.addColorStop(1, `rgba(40, 100, 70, 0)`)
  
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

  const sections = ['about', 'gallery', 'products', 'documents', 'contacts']
  const sectionNames = {
    about: 'О нас',
    gallery: 'Галерея',
    products: 'Продукция',
    documents: 'Документация',
    contacts: 'Контакты'
  }

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {isDarkTheme && <canvas id="auroraCanvas" className="aurora-canvas"></canvas>}

      <header className="header">
       {!isDarkTheme && !isMobile && <HeaderBorder />}
  

        <div className="container">
          <div className="header-content">
            <h1 className="logo" style={{color: 'white'}}>Совхоз "Пуровский"</h1>
            
            {/* Десктопная навигация */}
            <div className="desktop-nav">
              <nav className="nav">
                {sections.map((section) => (
                  <button
                    key={section}
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                    onClick={() => scrollToSection(section)}
                  >
                    {sectionNames[section]}
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

            {/* Мобильные контролы: тогл + бургер */}
            <div className="mobile-controls">
              <button 
                className={`theme-toggle mobile ${isDarkTheme ? 'dark' : 'light'}`} 
                onClick={toggleTheme}
                aria-label="Переключить тему"
              >
                <div className="toggle-track">
                  <div className="toggle-thumb"></div>
                </div>
              </button>
              <button 
                className={`burger-menu ${isMenuOpen ? 'open' : ''}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Меню"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {sections.map((section) => (
            <button
              key={section}
              className={`mobile-nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => scrollToSection(section)}
            >
              {sectionNames[section]}
            </button>
          ))}
        </div>
      </div>

      <main>
        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title"></h2>
            <AboutSection />
          </div>
        </section>

        {/* <section id="gallery" className="section">
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
        </section> */}
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
        style={{
          flex: 1,
          textAlign: 'center',
          cursor: 'pointer',
          minHeight: '450px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: isMobile ? '300px' : '500px',
            maxWidth: '700px',
            height: '350px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px'
          }}
        >
          <div
            key={currentImageIndex}
            style={{
              width: '100%',
              height: '100%',
              background: isDarkTheme ? '#2a3a2f' : '#d0d8d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: isDarkTheme ? '#8bc34a' : '#2a8ab0',
              animation: 'slideIn 0.4s ease-out'
            }}
          >
            
          </div>
        </div>
        <p className="image-caption" style={{ marginTop: '16px' }}>Описание изображения {currentImageIndex + 1}</p>
      </div>
      <button className="carousel-btn next" onClick={nextImage}>❯</button>
    </div>
    <div className="carousel-dots">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          className={`dot ${currentImageIndex === index ? 'active' : ''}`}
          onClick={() => setCurrentImageIndex(index)}
        />
      ))}
    </div>
  </div>
</section>

        <section id="products" className="section">
          <div className="container">
            <h2 className="section-title">Продукция</h2>
            
            <div className="products-info-block" style={{
              textAlign: 'center',
              marginBottom: '30px',
              padding: '16px 20px',
              background: isDarkTheme ? 'rgba(8, 18, 12, 0.5)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px'
            }}>
              <p style={{ 
                fontSize: '14px', 
                lineHeight: 1.5, 
                marginBottom: '10px',
                color: isDarkTheme ? '#d0d8d0' : '#1a2a3a'
              }}>
                АО "Совхоз Пуровский" предлагает свежезамороженную продукцию и полуфабрикаты из оленины и рыбы.
              </p>
              <p style={{ 
                fontSize: '13px', 
                color: isDarkTheme ? '#b0d0b0' : '#1a6a8a'
              }}>
                По вопросам приобретения: 
                <strong> +7(908)855-29-35</strong> (Пётр Константинович) или 
                <strong> inbox@sovhozpur.ru</strong>
              </p>
            </div>

            {Object.entries(groupedProducts).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '25px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '12px',
                  color: isDarkTheme ? '#b0d0b0' : '##1e3279',
                  borderLeft: `3px solid ${isDarkTheme ? '#7CB342' : '#2a8ab0'}`,
                  paddingLeft: '12px'
                }}>{category}</h3>
                <div className="products-grid">
                  {items.map((product, idx) => (
                    <div key={idx} className="product-card" style={{
                      background: isDarkTheme ? 'rgba(8, 18, 12, 0.4)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      transition: 'all 0.2s ease',
                      border: `1px solid ${isDarkTheme ? 'rgba(100, 180, 100, 0.15)' : 'rgba(42, 138, 176, 0.25)'}`,
                      fontSize: '13px',
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
                color: isDarkTheme ? '#b0d0b0' : '#3a6a7a'
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
    <div className="documents-grid">
      {[
        { name: "Документ 1", link: "#" },
        { name: "Документ 2", link: "#" },
        { name: "Документ 3", link: "#" },
        { name: "Документ 4", link: "#" },
        { name: "Документ 5", link: "#" },
        { name: "Документ 6", link: "#" }
      ].map((doc, index) => (
        <div key={index} className="document-card">
          <h3 className="document-name">{doc.name}</h3>
          <a href={doc.link} className="download-btn" download>Скачать</a>
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
    
    <div className="contacts-grid-wrapper" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      background: isDarkTheme ? 'rgba(8, 18, 12, 0.5)' : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(8px)',
      borderRadius: '24px',
      padding: '2rem',
      border: `1px solid ${isDarkTheme ? 'rgba(100, 180, 100, 0.15)' : 'rgba(100, 180, 200, 0.3)'}`
    }}>
      
      {/* Левая колонка - контакты */}
      <div className="contacts-info-block">
        <div style={{ marginBottom: '1.5rem' }}>
          <strong style={{ 
            fontSize: '16px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            marginBottom: '8px',
            display: 'block',
            color: isDarkTheme ? '#b0d0b0' : '##1e3279'
          }}>Телефон</strong>
          <p style={{ marginTop: '8px' }}>
            <a href="tel:+73499512345" style={{ 
              color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', 
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}>+7 (34999) 5-12-34</a>
          </p>
          <p>
            <a href="tel:+73499516789" style={{ 
              color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', 
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}>+7 (34999) 5-67-89</a>
          </p>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <strong style={{ 
            fontSize: '16px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            marginBottom: '8px',
            display: 'block',
            color: isDarkTheme ? '#b0d0b0' : '##1e3279'
          }}>E-mail</strong>
          <p style={{ marginTop: '8px' }}>
            <a href="mailto:info@purovsky-sovhoz.ru" style={{ 
              color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', 
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}>info@purovsky-sovhoz.ru</a>
          </p>
          <p>
            <a href="mailto:zakaz@sovhozpur.ru" style={{ 
              color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', 
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}>zakaz@sovhozpur.ru</a>
          </p>
        </div>
        
        <div>
          <strong style={{ 
            fontSize: '16px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            marginBottom: '8px',
            display: 'block',
            color: isDarkTheme ? '#b0d0b0' : '##1e3279'
          }}>Адрес</strong>
          <p style={{ 
            marginTop: '8px',
            color: isDarkTheme ? '#d0d8d0' : '#2a3a4a',
            lineHeight: 1.5
          }}>
            Ямало-Ненецкий АО, Пуровский район,<br />
            пос. Пуровск, ул. Совхозная, 1
          </p>
        </div>
      </div>
      
      {/* Правая колонка - Яндекс.Карта */}
      <div className="contacts-map-block">
        <iframe 
          src="https://yandex.ru/map-widget/v1/?ll=77.6667,64.9167&z=12&pt=77.6667,64.9167,pm2rdl"
          width="100%" 
          height="250" 
          style={{ border: 0, borderRadius: '16px' }}
          allowFullScreen
          loading="lazy"
          title="Карта совхоза Пуровский"
        />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a 
            href="https://yandex.ru/maps/?text=Пуровск+Совхозная+1" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: isDarkTheme ? '#8bc34a' : '#2a8ab0', 
              fontSize: '13px', 
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = isDarkTheme ? '#a0e0a0' : '#1a6a8a'}
            onMouseLeave={(e) => e.target.style.color = isDarkTheme ? '#8bc34a' : '#2a8ab0'}
          >
            Открыть в Яндекс.Картах →
          </a>
        </div>
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