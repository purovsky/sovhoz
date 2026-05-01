// src/App.jsx
import './App.css'
import logo from './assets/logo.png'
import map from './assets/map.png'
import HeaderBorder from './components/HeaderBorder';

const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Montserrat:wght@400;500;600;700&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

import { useState, useEffect, useRef } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [imagesLoaded, setImagesLoaded] = useState({})
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState('mission')
  const [isFishingOpen, setIsFishingOpen] = useState(false)
  const [isAquacultureOpen, setIsAquacultureOpen] = useState(false)
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const increaseFontSize = () => {
    if (fontSizeMultiplier < 1.4) {
      setFontSizeMultiplier(prev => prev + 0.1)
    }
  }

  const decreaseFontSize = () => {
    if (fontSizeMultiplier > 0.8) {
      setFontSizeMultiplier(prev => prev - 0.1)
    }
  }

  const getFontSize = (baseSize) => {
    return `${baseSize * fontSizeMultiplier}px`
  }

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

  // Данные для рыболовства (только уникальное - размерный ряд)
  const fishingData = [
    { name: "Щука", мелкая: "до 25 см", средняя: "от 25 см до 45 см", крупная: "от 45 см до 60 см" },
    { name: "Язь", мелкая: "до 14 см", средняя: "от 14 см до 19 см", крупная: "более 19 см" },
    { name: "Плотва", мелкая: "до 12 см", средняя: "от 12 см до 14 см", крупная: "более 14 см" },
    { name: "Окунь", мелкая: "от 12 см", средняя: "от 12 см до 16 см", крупная: "более 16 см" },
    { name: "Елец", мелкая: "от 12 см", средняя: "от 12 см до 16 см", крупная: "более 16 см" },
    { name: "Ерш", мелкая: "от 12 см", средняя: "-", крупная: "-" },
    { name: "Карась", мелкая: "до 14 см", средняя: "от 14 см до 20 см", крупная: "более 20 см" },
    { name: "Мелочь (сорная)", мелкая: "до 14 см", средняя: "-", крупная: "-" }
  ]

  // Данные для рыбоводства (только уникальное - особенности)
  const aquacultureData = [
    { name: "Форель", особенности: "Выращивается в садках в закрытых водоёмах. Нежное мясо с приятным розовым оттенком." },
    { name: "Чир", особенности: "Выращивается в садках в закрытых водоёмах. Ценный вид сиговых рыб. Мясо белое, плотное, с высоким содержанием полезных жиров." },
    { name: "Нельма", особенности: "Выращивается в садках в закрытых водоёмах. Деликатесный вид рыбы из семейства лососёвых. Мясо нежное, жирное, без мелких костей." },
    { name: "Муксун", особенности: "Выращивается в садках в закрытых водоёмах. Северная рыба с нежным мясом и характерным свежим ароматом. Относится к ценным промысловым видам." },
    { name: "Тугун", особенности: "Выращивается в садках в закрытых водоёмах. Маленькая рыбка из семейства сиговых, также известная как «сельдь сосновская». Имеет приятный огуречный запах." }
  ]

  const fishingColumns = ["Наименование", "Мелкая", "Средняя", "Крупная"]

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
      
      for (let i = 0; i < 35; i++) {
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
    about: 'Об обществе',
    gallery: 'Галерея',
    products: 'Продукция',
    documents: 'Сотрудничество',
    contacts: 'Контакты'
  }

   // Компонент табов с полноценными табами и полной заливкой фона
  const TabContent = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    
    const tabs = [
      { id: 'mission', title: 'Миссия', content: (
        <div className="tab-content-inner" style={{ textAlign: 'left' }}>
          <ul style={{ listStyle: 'none', paddingLeft: '0', lineHeight: '1.6', fontSize: getFontSize(13), margin: 0 }}>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              обеспечение экологически чистой и высококачественной продукцией, рыбой, выловленной в благополучных по описторхозу водоёмах
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              соблюдение и развитие традиций рыболовства — сохранение орудий и способов лова рыбы в условиях Арктики
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              сохранение традиционного образа жизни коренных малочисленных народов Севера Пуровского района
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              популяризация и поддержка жизни коренных малочисленных народов Севера
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              активное участие в социальных мероприятиях и программах Пуровского района
            </li>
          </ul>
          <p style={{ marginTop: '16px', fontSize: getFontSize(12), fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
            Реализация миссии осуществляется при системной государственной поддержке в лице Департамента агропромышленного комплекса Ямало-Ненецкого автономного округа и Администрации Пуровского района.
          </p>
        </div>
      ) },
      { id: 'strategy', title: 'Стратегия', content: (
        <div className="tab-content-inner" style={{ textAlign: 'left' }}>
          <ul style={{ listStyle: 'none', paddingLeft: '0', lineHeight: '1.6', fontSize: getFontSize(13), margin: 0 }}>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              развитие производственных мощностей, модернизация оборудования, улучшение инфраструктуры производственных участков
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              расширение рынка сбыта
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              укрепление позиций на рынке
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              социальная ответственность: улучшение уровня оплаты труда, создание комфортных условий труда и обеспечение безопасности сотрудников
            </li>
          </ul>
          <p style={{ marginTop: '16px', fontSize: getFontSize(12), color: 'rgba(255,255,255,0.9)' }}>
            Реализация стратегии, направленная на улучшение организации производственных процессов и условий труда, позволит Обществу сохранить в первую очередь традиционный образ жизни коренных малочисленных народов, профессию Рыбака и свои позиции в рыбодобывающей отрасли, продолжив целенаправленное развитие.
          </p>
        </div>
      ) },
      { id: 'geography', title: 'География', content: (
        <div className="tab-content-inner">
          <div style={{
            width: '100%',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: getFontSize(14),
            border: '1px dashed rgba(255,255,255,0.3)'
          }}>
            <img 
              src={map}
              alt="Карта участков"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                // objectFit: 'contain'
              }}
            />
          </div>
          
          <ul style={{ listStyle: 'none', paddingLeft: '0', fontSize: getFontSize(12), lineHeight: '1.6', margin: 0 }}>
            <li style={{ marginBottom: '6px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              От участка «Тарко-Сале» (1) – до участка «Харампуровский» (база «Кар-Нат», «Хадутэй») (2) по дороге 87 км.
            </li>
            <li style={{ marginBottom: '6px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              От участка «Тарко-Сале» (1) – до участка «озеро Часельское» (база) (3) часть дороги по дороге 110 км, далее только в зимний период по зимнику 55 км.
            </li>
            <li style={{ marginBottom: '6px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              От участка «Тарко-Сале» (1) – до участка «Военто» (рыбоводство) (4) по дороге 147 км.
            </li>
            <li style={{ marginBottom: '6px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              От участка «Тарко-Сале» (1) – до участка «Быстрика» (база, фактория) (5) часть дороги по дороге 200 км, после: в летний период по реке 70 км, в зимний период по зимнику 25 км.
            </li>
            <li style={{ marginBottom: '6px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              От участка «Тарко-Сале» (1) – до участка «Толька Пуровская» (база) (6) часть дороги по дороге 455 км, после: в летний период по реке 362 км, в зимний период по зимнику 230 км.
            </li>
            <li style={{ marginBottom: '6px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              От участка «Тарко-Сале» (1) – до участка «Толька Халясовэй» (база) (7) часть дороги по дороге 455 км, после: в летний период по реке 200 км, в зимний период по зимнику 120 км.
            </li>
            <li style={{ marginBottom: '6px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              От участка «Тарко-Сале» (1) – до участка «Ханымей» (база) (8) часть дороги по дороге 280 км.
            </li>
            <li style={{ marginBottom: '6px', paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0' }}>◆</span>
              От участка «Тарко-Сале» (1) – до участка «Сугмутско-Пякутинский» (база Пяку-то) (9) часть дороги по дороге 300 км.
            </li>
          </ul>
        </div>
      ) }
    ]

    // Цвета для фона табов в зависимости от темы
    const bgColor = isDarkTheme ? '#1a3a2a' : '#1e3279'
    const activeTabBg = isDarkTheme ? '#2a5a3a' : '#2a4a9e'
    const textColor = '#ffffff'

    return (
      <div className="tabs-container" style={{ 
        marginTop: '40px',
        width: '100%',
        backgroundColor: bgColor,
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        {/* Табы - как настоящие вкладки */}
        <div className="tabs-header" style={{ 
          display: 'flex',
          borderBottom: `1px solid rgba(255,255,255,0.2)`,
          backgroundColor: bgColor
        }}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabIndex(index)}
              className={`tab-button ${activeTabIndex === index ? 'active' : ''}`}
              style={{
                flex: 1,
                padding: '14px 20px',
                background: activeTabIndex === index ? activeTabBg : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: activeTabIndex === index ? 600 : 500,
                fontSize: isMobile ? getFontSize(14) : getFontSize(16),
                color: textColor,
                transition: 'all 0.2s ease',
                borderBottom: activeTabIndex === index ? `2px solid ${isDarkTheme ? '#8bc34a' : '#d19250'}` : '2px solid transparent',
                marginBottom: '-1px'
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>
        
        {/* Контент таба */}
        <div className="tabs-content" style={{ 
          padding: '28px 32px',
          minHeight: '350px',
          transition: 'all 0.3s ease-in-out',
          color: '#ffffff',
          backgroundColor: bgColor
        }}>
          {tabs[activeTabIndex].content}
        </div>
      </div>
    )
  }

   const buttonBgColor = isDarkTheme ? '#4a7c59' : '#1e3279'
  const buttonHoverColor = isDarkTheme ? '#5a9c6e' : '#2a4a9e'

  const AboutSection = () => (
    <div className="about-wrapper" style={{ overflow: 'hidden' }}>
      <div className="about-text" style={{ fontSize: getFontSize(isMobile ? 12 : 13), lineHeight: '1.5' }}>
        {/* Логотип внутри текста, обтекаемый */}
        <div className="about-image" style={{ 
          float: 'right',
          marginLeft: '25px',
          marginBottom: '15px',
          width: isMobile ? '140px' : '200px',
          shapeOutside: `circle(50%)`,
          shapeMargin: '15px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
            width: isMobile ? '140px' : '200px',
            height: isMobile ? '140px' : '200px'
          }}>
            <img 
              src={logo}
              alt="Логотип АО СХ община Пуровская"
              loading="lazy"
              style={{
                width: '120%',
                height: '120%',
                objectFit: 'contain',
                borderRadius: '50%'
              }}
            />
          </div>
        </div>
        
        <p><strong>Акционерное общество "Сельскохозяйственная община Пуровская"</strong> осуществляет деятельность на территории Пуровского района Ямало-Ненецкого автономного округа. Основные виды деятельности — рыболовство и рыбоводство.</p>
        
        <p>Образовано в 2005 году при поддержке Администрации Пуровского района. Учредителями Общества выступили департамент имущественных и земельных отношений Администрации Пуровского района и физические лица из числа коренных малочисленных народов Севера, ранее являвшихся членами национальных общин, зарегистрированных на территории района.</p>
        
        <p>Общество является социально значимым предприятием региона. Численность работников составляет более 200 человек, доля работников из числа коренных малочисленных народов Севера составляет не менее 70%, которые ведут кочевой и полукочевой образ жизни, проживают на удалённых труднодоступных территориях Пуровского района. В основном это лесные ненцы, селькупы и ханты.</p>
        
        <p>Профессиональный опыт руководителей Общества позволяет учитывать традиционный образ жизни работников, основанный на историческом опыте их предков в области природопользования, самобытную культуру и сохранение обычаев при организации производственных процессов предприятия, успешно обеспечивать выполнение планов по производству сельскохозяйственной продукции.</p>
        
        <p>АО "СХ община Пуровская" ежегодно добывает более 800 тонн рыбы, обеспечивая население Пуровского района качественной продукцией. Общество является надёжным партнёром.</p>
      </div>
    </div>
  )

  // // Цвета для кнопок в зависимости от темы
  // const buttonBgColor = isDarkTheme ? '#4a7c59' : '#1e3279'
  // const buttonHoverColor = isDarkTheme ? '#5a9c6e' : '#2a4a9e'

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {isDarkTheme && <canvas id="auroraCanvas" className="aurora-canvas"></canvas>}


      {isMobile && (
        <div className="font-control">
          <button className="font-btn" onClick={decreaseFontSize} aria-label="Уменьшить шрифт">−</button>
          <div className="font-size-indicator">{Math.round(fontSizeMultiplier * 100)}%</div>
          <button className="font-btn" onClick={increaseFontSize} aria-label="Увеличить шрифт">+</button>
        </div>
      )}

      <header className="header">
          {!isDarkTheme && !isMobile && <HeaderBorder />}
  
        <div className="container">
          <div className="header-content">
            <h1 className="logo" style={{color: 'white', fontSize: isMobile ? getFontSize(18) : getFontSize(24)}}>Совхоз "Пуровский"</h1>
            
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
            {/* <h2 className="section-title" style={{ fontSize: getFontSize(28) }}>Об обществе</h2> */}
            <AboutSection />
            <TabContent />
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <h2 className="section-title" style={{ fontSize: getFontSize(28) }}>Галерея</h2>
            <div className="carousel-container">
              <button className="carousel-btn prev" onClick={prevImage}>❮</button>
              <div 
                className="carousel-slide"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  minHeight: isMobile ? '300px' : '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: isMobile ? '280px' : '500px',
                    maxWidth: '700px',
                    height: isMobile ? '200px' : '350px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '16px'
                  }}
                >
                  {!imagesLoaded[currentImageIndex] ? (
                    <div className="skeleton skeleton-image"></div>
                  ) : (
                    <img 
                      src={galleryImages[currentImageIndex].url} 
                      alt={galleryImages[currentImageIndex].title}
                      className="carousel-image"
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <p className="image-caption" style={{ marginTop: '12px', fontSize: getFontSize(14) }}>{galleryImages[currentImageIndex].title}</p>
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

        {/* РАЗДЕЛ ПРОДУКЦИИ */}
        <section id="products" className="section">
          <div className="container">
            <h2 className="section-title" style={{ fontSize: getFontSize(28) }}>Продукция</h2>

            <button
              onClick={() => setIsFishingOpen(!isFishingOpen)}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: buttonBgColor,
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: isMobile ? getFontSize(15) : getFontSize(17),
                fontWeight: 600,
                marginBottom: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = buttonHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.background = buttonBgColor}
            >
              Рыболовство
              <span style={{
                transform: isFishingOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                fontSize: getFontSize(18)
              }}>▼</span>
            </button>

            {isFishingOpen && (
              <div style={{
                marginBottom: '24px',
                overflowX: 'auto',
                animation: 'slideDown 0.3s ease-out',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}>
                <table className="products-table">
                  <thead>
                    <tr>
                      {fishingColumns.map((col, idx) => (
                        <th key={idx}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fishingData.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.мелкая}</td>
                        <td>{item.средняя}</td>
                        <td>{item.крупная}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isFishingOpen && (
              <div className="footnote" style={{ textAlign: 'center' }}>
                * Общая информация для всей продукции рыболовства:<br />
                Сезон вылова: зимнего вылова (кроме карася — лето/осень вылова в глазировке).<br />
                Упаковка: полипропиленовый мешок с вкладышем. Срок годности: 8 месяцев. Хранение при t -18°C.
              </div>
            )}

            <button
              onClick={() => setIsAquacultureOpen(!isAquacultureOpen)}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: buttonBgColor,
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: isMobile ? getFontSize(15) : getFontSize(17),
                fontWeight: 600,
                marginBottom: '12px',
                marginTop: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = buttonHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.background = buttonBgColor}
            >
              Рыбоводство
              <span style={{
                transform: isAquacultureOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                fontSize: getFontSize(18)
              }}>▼</span>
            </button>

            {isAquacultureOpen && (
              <div style={{
                marginBottom: '24px',
                overflowX: 'auto',
                animation: 'slideDown 0.3s ease-out',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}>
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Наименование</th>
                      <th>Особенности</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aquacultureData.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.особенности}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isAquacultureOpen && (
              <div className="footnote" style={{ textAlign: 'center' }}>
                * Общая информация для всей продукции рыбоводства:<br />
                Упаковка: полипропиленовый мешок с вкладышем. Срок годности: 8 месяцев. Хранение при t -18°C.
              </div>
            )}

             <div style={{
              background: isDarkTheme ? 'rgba(8, 18, 12, 0.6)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '16px',
              padding: '14px',
              marginTop: '16px',
              textAlign: 'center',
              color: isDarkTheme ? '#d0d8d0' : '#1a2a3a'
            }}>
              <p style={{ fontSize: getFontSize(11), margin: '0 0 8px 0' }}>
                Мы соблюдаем санитарные правила и нормы в полном объёме: регулярное проведение ветеринарно-санитарных экспертиз, обеспечиваем хранение продукции при температуре не менее -18°C.
              </p>
              <p style={{ fontSize: getFontSize(11), margin: '0' }}>
                Предоставляем ветеринарные документы. Наша продукция соответствует ГОСТ 32366-2013
              </p>
            </div>
          </div>
        </section>

        <section id="documents" className="section">
          <div className="container">
            <h2 className="section-title" style={{ fontSize: getFontSize(28) }}>Документы</h2>
            <div className="documents-grid" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)' }}>
              {[
                { name: "Устав предприятия", link: "#" },
                { name: "Свидетельство ОГРН", link: "#" },
                { name: "Лицензия на рыболовство", link: "#" },
                { name: "Сертификаты качества", link: "#" },
                { name: "Отчётность 2024", link: "#" },
                { name: "Коллективный договор", link: "#" }
              ].map((doc, index) => (
                <div key={index} className="document-card">
                  <h3 className="document-name" style={{ fontSize: getFontSize(14) }}>{doc.name}</h3>
                  <a href={doc.link} className="download-btn" download style={{ fontSize: getFontSize(11) }}>Скачать</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      
        <section id="contacts" className="section">
          <div className="container">
            <h2 className="section-title" style={{ fontSize: getFontSize(28) }}>Контакты</h2>
            
            <div className="contacts-grid-wrapper" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '1.5rem',
              background: isDarkTheme ? 'rgba(8, 18, 12, 0.5)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: isMobile ? '1.5rem' : '2rem',
              border: `1px solid ${isDarkTheme ? 'rgba(100, 180, 100, 0.15)' : '#d19250'}`
            }}>
              
              <div className="contacts-info-block">
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ fontSize: getFontSize(15), color: isDarkTheme ? '#b0d0b0' : '#1e3279' }}>Телефон</strong>
                  <p style={{ marginTop: '4px' }}><a href="tel:+73499512345" style={{ color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', textDecoration: 'none', fontSize: getFontSize(14) }}>+7 (34999) 5-12-34</a></p>
                  <p><a href="tel:+73499516789" style={{ color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', textDecoration: 'none', fontSize: getFontSize(14) }}>+7 (34999) 5-67-89</a></p>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ fontSize: getFontSize(15), color: isDarkTheme ? '#b0d0b0' : '#1e3279' }}>E-mail</strong>
                  <p style={{ marginTop: '4px' }}><a href="mailto:info@sovhozpur.ru" style={{ color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', textDecoration: 'none', fontSize: getFontSize(14) }}>info@sovhozpur.ru</a></p>
                  <p><a href="mailto:zakaz@sovhozpur.ru" style={{ color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', textDecoration: 'none', fontSize: getFontSize(14) }}>zakaz@sovhozpur.ru</a></p>
                </div>
                
                <div>
                  <strong style={{ fontSize: getFontSize(15), color: isDarkTheme ? '#b0d0b0' : '#1e3279' }}>Адрес</strong>
                  <p style={{ marginTop: '4px', color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', lineHeight: 1.5, fontSize: getFontSize(14) }}>
                    Ямало-Ненецкий АО, Пуровский район,<br />
                    г. Тарко-Сале, ул. Совхозная, 1
                  </p>
                </div>
              </div>
              
              <div className="contacts-map-block">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=77.6667,64.9167&z=12&pt=77.6667,64.9167,pm2rdl"
                  width="100%" 
                  height="220" 
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen
                  loading="lazy"
                  title="Карта совхоза Пуровский"
                />
                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                  <a 
                    href="https://yandex.ru/maps/?text=Тарко-Сале+Совхозная+1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: isDarkTheme ? '#8bc34a' : '#1e3279', fontSize: getFontSize(12), textDecoration: 'none' }}
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
          <p style={{ fontSize: getFontSize(12) }}>© 2026 Совхоз "Пуровский". Все права защищены.</p>
        </div>
      </footer>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default App