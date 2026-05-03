import './App.css'
import logo from './assets/logo.png'
import map from './assets/map_company.png'
import companyCard from './assets/company_card.pdf'
import HeaderBorder from './components/HeaderBorder'
import dance from './assets/dance.jpg'
import avrora from './assets/avrora.jpg'
import berry from './assets/berry.jpg'
import fish from './assets/fish.jpg'
import fish1 from './assets/fish1.jpg'
import fish2 from './assets/fish2.jpg'
import fish3 from './assets/fish3.jpg'
import fisher from './assets/fisher.jpg'
import tarko from './assets/tarko.jpg'
import winter from './assets/winter.jpg'
import storage from './assets/storage.jpg'
import NewsSection from './components/NewsSection'

const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Montserrat:wght@400;500;600;700&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'

// Константы вынесены за пределы компонента
const galleryImagesConst = [
  { url: dance, title: "Танцы" },
  { url: avrora, title: "Аврора (северное сияние)" },
  { url: berry, title: "Ягоды северные" },
  { url: fish, title: "Рыболовство" },
  { url: fish1, title: "Рыболовство" },
  { url: fish2, title: "Рыболовство" },
  { url: fish3, title: "Рыболовство" },
  { url: fisher, title: "Рыбаки Пуровского района" },
  { url: tarko, title: "Тарко-Сале" },
  { url: winter, title: "Зима" },
  { url: storage, title: "Склад хранения продукции" }
]

const fishingDataConst = [
  { name: "Щука", мелочь: "до 25 см", мелкая: "от 25 см до 45 см", средняя: "от 45 см до 60 см", крупная: "более 60 см" },
  { name: "Язь",  мелочь: "от 12 см до 14 см",мелкая: "от 15 см до 20 см", средняя: "от 20 см до 30 см", крупная: "более 30 см" },
  { name: "Плотва",  мелочь: "от 12 см до 14 см",мелкая: "от 14 см до 19 см", средняя: "-", крупная: "более 19 см" },
  { name: "Окунь",  мелочь: "-",мелкая: "от 12 см до 25 см", средняя: "-", крупная: "более 14 см" },
  { name: "Елец", мелочь: "от 12 см", мелкая: "-", средняя: "-", крупная: "более 14 см" },
  { name: "Ерш (не подразд.)",  мелочь: "-",мелкая: "-", средняя: "-", крупная: "-" },
  { name: "Карась",  мелочь: "-",мелкая: "от 12 см до 16 см", средняя: "-", крупная: "более 16 см" },
]

const aquacultureDataConst = [
  { name: "Форель", особенности: "Выращивается в садках в закрытых водоёмах. Нежное мясо с приятным розовым оттенком." },
  { name: "Чир", особенности: "Выращивается в садках в закрытых водоёмах. Ценный вид сиговых рыб. Мясо белое, плотное, с высоким содержанием полезных жиров." },
  { name: "Нельма", особенности: "Выращивается в садках в закрытых водоёмах. Деликатесный вид рыбы из семейства лососёвых. Мясо нежное, жирное, без мелких костей." },
  { name: "Муксун", особенности: "Выращивается в садках в закрытых водоёмах. Северная рыба с нежным мясом и характерным свежим ароматом. Относится к ценным промысловым видам." },
  { name: "Тугун", особенности: "Выращивается в садках в закрытых водоёмах. Маленькая рыбка из семейства сиговых, также известная как «сельдь сосновская». Имеет приятный огуречный запах." }
]

const fishingColumnsConst = ["Наименование", "Мелочь", "Мелкая", "Средняя", "Крупная"]
const sectionsConst = ['about', 'gallery', 'products', 'documents', 'contacts']
const sectionNamesConst = {
  about: 'Об обществе',
  gallery: 'Галерея',
  products: 'Продукция',
  documents: 'Сотрудничество',
  contacts: 'Контакты'
}

// Вынесенный компонент AboutSection для предотвращения перерисовки
const AboutSection = React.memo(({ isMobile, getFontSize }) => {
  return (
    <div className="about-wrapper" style={{ overflow: 'hidden' }}>
      <div className="about-text" style={{ fontSize: getFontSize(isMobile ? 12 : 13), lineHeight: '1.5' }}>
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
                width: '100%',
                height: '100%',
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
})

// Вынесенный компонент TabContent
const TabContent = React.memo(({ isDarkTheme, isMobile, getFontSize, setIsMapFullscreen, map }) => {
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
        <div 
          style={{
            width: '100%',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={() => setIsMapFullscreen(true)}
        >
          <img 
            src={map}
            alt="Карта участков Пуровского района"
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.6)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: getFontSize(10),
            color: '#ffffff'
          }}>
            Нажмите для увеличения
          </div>
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
      <div className="tabs-header" style={{ 
        display: 'flex',
        borderBottom: `1px solid rgba(255,255,255,0.2)`,
        backgroundColor: bgColor
      }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabIndex(index)}
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
})

// Основной компонент App
function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState({})
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFishingOpen, setIsFishingOpen] = useState(false)
  const [isAquacultureOpen, setIsAquacultureOpen] = useState(false)
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1)
  const [isMapFullscreen, setIsMapFullscreen] = useState(false)
  const mobileMenuRef = useRef(null)
  const carouselRef = useRef(null)

  const isMobile = windowWidth <= 768

  const [showFontControls, setShowFontControls] = useState(false)
  const hideTimeoutRef = useRef(null)

  const increaseFontSize = useCallback(() => {
    if (fontSizeMultiplier < 1.4) {
      setFontSizeMultiplier(prev => prev + 0.1)
    }
    setShowFontControls(true)
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    hideTimeoutRef.current = setTimeout(() => setShowFontControls(false), 2000)
  }, [fontSizeMultiplier])

  const decreaseFontSize = useCallback(() => {
    if (fontSizeMultiplier > 0.8) {
      setFontSizeMultiplier(prev => prev - 0.1)
    }
    setShowFontControls(true)
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    hideTimeoutRef.current = setTimeout(() => setShowFontControls(false), 2000)
  }, [fontSizeMultiplier])

  const getFontSize = useCallback((baseSize) => {
    return `${baseSize * fontSizeMultiplier}px`
  }, [fontSizeMultiplier])

  const buttonBgColor = isDarkTheme ? '#4a7c59' : '#1e3279'
  const buttonHoverColor = isDarkTheme ? '#5a9c6e' : '#2a4a9e'

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme)
    localStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkTheme(true)
    } else if (savedTheme === 'light') {
      setIsDarkTheme(false)
    } else {
      setIsDarkTheme(false)
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

  // Предзагрузка всех изображений
  useEffect(() => {
    const loadAllImages = async () => {
      const loadPromises = galleryImagesConst.map((img, idx) => {
        return new Promise((resolve) => {
          const image = new Image()
          image.src = img.url
          image.onload = () => {
            setImagesLoaded(prev => ({ ...prev, [idx]: true }))
            resolve()
          }
          image.onerror = () => resolve()
        })
      })
      await Promise.all(loadPromises)
    }
    
    loadAllImages()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150
      for (const section of sectionsConst) {
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

  // Бесконечный скролл для карусели (только для мобильных)
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;
    
    const handleTransitionEnd = () => {
      if (!carouselRef.current) return;
      
      if (currentImageIndex >= galleryImagesConst.length) {
        carouselRef.current.style.transition = 'none';
        setCurrentImageIndex(0);
        carouselRef.current.style.transform = `translateX(-${1 * 100}%)`;
        
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
          }
        }, 50);
      }
      else if (currentImageIndex < 0) {
        carouselRef.current.style.transition = 'none';
        setCurrentImageIndex(galleryImagesConst.length - 1);
        carouselRef.current.style.transform = `translateX(-${galleryImagesConst.length * 100}%)`;
        
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
          }
        }, 50);
      }
    };
    
    const carousel = carouselRef.current;
    carousel.addEventListener('transitionend', handleTransitionEnd);
    
    return () => {
      carousel.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentImageIndex, isMobile]);

  // Автопрокрутка для мобильных
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile]);

  // Обновление transform при изменении индекса (только для мобильных)
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;
    carouselRef.current.style.transform = `translateX(-${(currentImageIndex + 1) * 100}%)`;
  }, [currentImageIndex, isMobile]);

  const nextImage = useCallback(() => {
    if (isMobile) return;
    setCurrentImageIndex((prev) => (prev + 1) % galleryImagesConst.length);
  }, [isMobile])

  const prevImage = useCallback(() => {
    if (isMobile) return;
    setCurrentImageIndex((prev) => (prev - 1 + galleryImagesConst.length) % galleryImagesConst.length);
  }, [isMobile])

  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const burgerMenu = document.querySelector('.burger-menu')
        if (burgerMenu && !burgerMenu.contains(event.target)) {
          setIsMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Эффект для северного сияния
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

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {isDarkTheme && <canvas id="auroraCanvas" className="aurora-canvas"></canvas>}

      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.95)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)'
        }}>
          <button
            onClick={() => setIsMapFullscreen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2001
            }}
          >
            ✕
          </button>
          
          <div style={{
            width: isMobile ? '95%' : '90%',
            height: isMobile ? '85%' : '85%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto'
          }}>
            <img 
              src={map}
              alt="Карта участков Пуровского района"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: getFontSize(12),
            background: 'rgba(0,0,0,0.5)',
            padding: '6px 12px',
            borderRadius: '20px'
          }}>
            Карта участков Пуровского района
          </div>
        </div>
      )}

      {isMobile && (
        <div 
          className={`font-control-vertical ${showFontControls ? 'font-control-visible' : ''}`}
          style={{ opacity: showFontControls ? 1 : 0.4 }}
        >
          <button className="font-btn-vertical" onClick={increaseFontSize} aria-label="Увеличить шрифт">+</button>
          <button className="font-btn-vertical" onClick={decreaseFontSize} aria-label="Уменьшить шрифт">−</button>
        </div>
      )}

      <header className="header">
        {!isDarkTheme && !isMobile && <HeaderBorder />}
  
        <div className="container">
          <div className="header-content">
            <h1 className="logo" style={{color: 'white', fontSize: isMobile ? getFontSize(18) : getFontSize(24)}}>Совхоз "Пуровский"</h1>
            
            <div className="desktop-nav">
              <nav className="nav">
                {sectionsConst.map((section) => (
                  <button
                    key={section}
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                    onClick={() => scrollToSection(section)}
                  >
                    {sectionNamesConst[section]}
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

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
        <div className="mobile-menu-content">
          {sectionsConst.map((section) => (
            <button
              key={section}
              className={`mobile-nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => scrollToSection(section)}
            >
              {sectionNamesConst[section]}
            </button>
          ))}
        </div>
      </div>

      <main>
        <section id="about" className="section">
          <div className="container">
            <AboutSection isMobile={isMobile} getFontSize={getFontSize} />
            <TabContent 
              isDarkTheme={isDarkTheme} 
              isMobile={isMobile} 
              getFontSize={getFontSize} 
              setIsMapFullscreen={setIsMapFullscreen} 
              map={map} 
            />
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <h2 className="section-title" style={{ fontSize: getFontSize(28) }}>Галерея</h2>
            <div className="carousel-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
              {!isMobile && (
                <button className="carousel-btn prev" onClick={prevImage}>❮</button>
              )}
              <div 
                className="carousel-slide"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  minHeight: isMobile ? '280px' : '450px',
                  height: isMobile ? '280px' : '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: isMobile ? '100%' : '500px',
                    maxWidth: '100%',
                    height: isMobile ? '250px' : '350px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '16px'
                  }}
                >
                  {isMobile ? (
                    <div
                      ref={carouselRef}
                      style={{
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${(currentImageIndex + 1) * 100}%)`,
                        height: '100%',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      {/* Последнее изображение */}
                      <div style={{ minWidth: '100%', width: '100%', height: '100%', position: 'relative', flexShrink: 0 }}>
                        {imagesLoaded[galleryImagesConst.length - 1] ? (
                          <img 
                            src={galleryImagesConst[galleryImagesConst.length - 1].url} 
                            alt={galleryImagesConst[galleryImagesConst.length - 1].title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                            loading="lazy"
                          />
                        ) : (
                          <div className="skeleton skeleton-image" style={{ width: '100%', height: '100%' }}></div>
                        )}
                      </div>
                      
                      {/* Все основные изображения */}
                      {galleryImagesConst.map((image, index) => (
                        <div key={index} style={{ minWidth: '100%', width: '100%', height: '100%', position: 'relative', flexShrink: 0 }}>
                          {imagesLoaded[index] ? (
                            <img 
                              src={image.url} 
                              alt={image.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                              loading="lazy"
                            />
                          ) : (
                            <div className="skeleton skeleton-image" style={{ width: '100%', height: '100%' }}></div>
                          )}
                        </div>
                      ))}
                      
                      {/* Первое изображение */}
                      <div style={{ minWidth: '100%', width: '100%', height: '100%', position: 'relative', flexShrink: 0 }}>
                        {imagesLoaded[0] ? (
                          <img 
                            src={galleryImagesConst[0].url} 
                            alt={galleryImagesConst[0].title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                            loading="lazy"
                          />
                        ) : (
                          <div className="skeleton skeleton-image" style={{ width: '100%', height: '100%' }}></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      {imagesLoaded[currentImageIndex] ? (
                        <img 
                          src={galleryImagesConst[currentImageIndex].url} 
                          alt={galleryImagesConst[currentImageIndex].title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                          loading="lazy"
                        />
                      ) : (
                        <div className="skeleton skeleton-image" style={{ width: '100%', height: '100%' }}></div>
                      )}
                    </div>
                  )}
                </div>
                {/* {!isMobile && (
                  <p className="image-caption" style={{ marginTop: '12px', fontSize: getFontSize(14) }}>
                    {galleryImagesConst[currentImageIndex].title}
                  </p>
                )} */}
              </div>
              {!isMobile && (
                <button className="carousel-btn next" onClick={nextImage}>❯</button>
              )}
            </div>
            {!isMobile && (
              <div className="carousel-dots">
                {galleryImagesConst.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

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
              <div className="products-table-wrapper">
                <table className="products-table">
                  <thead>
                    <tr>
                      {fishingColumnsConst.map((col, idx) => (
                        <th key={idx}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fishingDataConst.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.мелочь}</td>
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
              <div className="footnote-wrapper">
                <div className="footnote">
                  * Общая информация для всей продукции рыболовства:<br />
                  Сезон вылова: зимнего вылова без глазировки, весна/лето/осень вылова в глазировке.<br />
                  Упаковка: полипропиленовый мешок с вкладышем. Срок годности: 8 месяцев. Хранение при t -18°C.
                </div>
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
              <div className="products-table-wrapper">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th className="name-column">Наименование</th>
                      <th className="desc-column">Особенности</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aquacultureDataConst.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600, whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                          {item.name}
                        </td>
                        <td style={{ lineHeight: '1.4', verticalAlign: 'top', wordBreak: 'break-word', whiteSpace: 'normal' }}>
                          {item.особенности}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* {isAquacultureOpen && (
              <div className="footnote-wrapper">
                <div className="footnote">
                  * Общая информация для всей продукции рыбоводства:<br />
                  Упаковка: полипропиленовый мешок с вкладышем. Срок годности: 8 месяцев. Хранение при t -18°C.
                </div>
              </div>
            )} */}

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
            <h2 className="section-title" style={{ fontSize: getFontSize(24), marginBottom: '20px' }}>Сотрудничество</h2>
            
            <div style={{
              background: isDarkTheme ? 'rgba(8, 18, 12, 0.5)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              padding: isMobile ? '20px' : '30px',
              marginBottom: '30px'
            }}>
              
              <div style={{
                background: isDarkTheme ? '#4a7c59' : '#1e3279',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '25px',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: getFontSize(14),
                  lineHeight: '1.5',
                  margin: 0,
                  color: '#ffffff'
                }}>
                  Может применяется <strong style={{ color: '#ffffff' }}>гибкий ценовой подход</strong> в зависимости от местоположения склада хранения продукции, 
                  периодов приобретения, объёма партии и условий транспортировки.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '20px',
                marginBottom: '25px'
              }}>
                <div style={{
                  background: isDarkTheme ? 'rgba(8, 18, 12, 0.4)' : 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '16px',
                  padding: '20px'
                }}>
                  <h4 style={{
                    fontSize: getFontSize(16),
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: isDarkTheme ? '#b0d0b0' : '#1e3279'
                  }}>
                    По вопросам приобретения рыбной продукции
                  </h4>
                  <p style={{ 
                    fontSize: getFontSize(14), 
                    marginBottom: '8px',
                    color: isDarkTheme ? '#d0d8d0' : '#2a3a4a'
                  }}>
                    <strong style={{ color: isDarkTheme ? '#8bc34a' : '#d19250' }}>Девятериков Александр Николаевич</strong>
                  </p>
                  <p style={{ 
                    fontSize: getFontSize(14), 
                    marginBottom: '8px',
                    color: isDarkTheme ? '#d0d8d0' : '#2a3a4a'
                  }}>
                    первый заместитель генерального директора
                  </p>
                  <a href="tel:+79519866036" style={{
                    display: 'inline-block',
                    fontSize: getFontSize(18),
                    fontWeight: 'bold',
                    color: isDarkTheme ? '#8bc34a' : '#d19250',
                    textDecoration: 'none',
                    marginTop: '10px'
                  }}>
                    +7-951-986-60-36
                  </a>
                </div>

                <div style={{
                  background: isDarkTheme ? 'rgba(8, 18, 12, 0.4)' : 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '16px',
                  padding: '20px'
                }}>
                  <h4 style={{
                    fontSize: getFontSize(16),
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: isDarkTheme ? '#b0d0b0' : '#1e3279'
                  }}>
                    Стационарный телефон
                  </h4>
                  <a href="tel:+73499728066" style={{
                    display: 'inline-block',
                    fontSize: getFontSize(18),
                    fontWeight: 'bold',
                    color: isDarkTheme ? '#8bc34a' : '#d19250',
                    textDecoration: 'none',
                    marginBottom: '5px'
                  }}>
                    8 (34997) 2-80-66
                  </a>
                </div>
              </div>

              <div style={{
                background: isDarkTheme ? 'rgba(8, 18, 12, 0.4)' : 'rgba(255, 255, 255, 0.6)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <h4 style={{
                  fontSize: getFontSize(16),
                  fontWeight: 600,
                  marginBottom: '15px',
                  color: isDarkTheme ? '#b0d0b0' : '#1e3279',
                  borderBottom: `2px solid ${isDarkTheme ? '#4a7c59' : '#d19250'}`,
                  paddingBottom: '8px'
                }}>
                  Закупочная деятельность
                </h4>
                
                <p style={{
                  fontSize: getFontSize(13),
                  lineHeight: '1.5',
                  marginBottom: '15px',
                  color: isDarkTheme ? '#d0d8d0' : '#2a3a4a'
                }}>
                  Наша организация проводит закупки на основании Федерального закона от 18.07.2011 № 223-ФЗ 
                  «О закупках товаров, работ, услуг отдельными видами юридических лиц».
                </p>
                
                <p style={{
                  fontSize: getFontSize(13),
                  lineHeight: '1.5',
                  marginBottom: 0,
                  color: isDarkTheme ? '#d0d8d0' : '#2a3a4a'
                }}>
                  <strong>Соблюдение принципов прозрачности, конкуренции и эффективного расходования средств</strong> – 
                  обязательное условие нашей закупочной деятельности. Все процедуры осуществляются открыто и 
                  регламентируются утвержденным Положением о закупках товаров, работ, услуг.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <a 
                href={companyCard}
                download="Карточка_предприятия_Совхоз_Пуровский.pdf"
                style={{
                  display: 'inline-block',
                  background: isDarkTheme ? '#4a7c59' : '#d19250',
                  color: 'white',
                  padding: '12px 28px',
                  borderRadius: '40px',
                  textDecoration: 'none',
                  fontSize: getFontSize(15),
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = isDarkTheme ? '#5a9c6e' : '#e0a060'}
                onMouseLeave={(e) => e.currentTarget.style.background = isDarkTheme ? '#4a7c59' : '#d19250'}
              >
                Скачать карточку предприятия (PDF)
              </a>
            </div>
          </div>
        </section>

        <NewsSection isDarkTheme={isDarkTheme} getFontSize={getFontSize} isMobile={isMobile} />
      
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
                <div style={{ marginBottom: '1.2rem' }}>
                  <strong style={{ fontSize: getFontSize(15), color: isDarkTheme ? '#b0d0b0' : '#1e3279' }}>Телефон</strong>
                  <p style={{ marginTop: '4px' }}>
                    <a href="tel:+73499728066" style={{ color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', textDecoration: 'none', fontSize: getFontSize(14) }}>
                      8 (34997) 2-80-66
                    </a>
                  </p>
                </div>
                
                <div style={{ marginBottom: '1.2rem' }}>
                  <strong style={{ fontSize: getFontSize(15), color: isDarkTheme ? '#b0d0b0' : '#1e3279' }}>E-mail</strong>
                  <p style={{ marginTop: '4px' }}>
                    <a href="mailto:zakupki@obpur.ru" style={{ color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', textDecoration: 'none', fontSize: getFontSize(14) }}>
                      zakupki@obpur.ru
                    </a>
                  </p>
                </div>
                
                <div>
                  <strong style={{ fontSize: getFontSize(15), color: isDarkTheme ? '#b0d0b0' : '#1e3279' }}>Адрес</strong>
                  <p style={{ marginTop: '4px', color: isDarkTheme ? '#d0d8d0' : '#2a3a4a', lineHeight: 1.5, fontSize: getFontSize(14) }}>
                    Ямало-Ненецкий автономный округ,<br />
                    г. Тарко-Сале, микрорайон Советский, д. 6А
                  </p>
                </div>
                
                <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: `1px solid ${isDarkTheme ? 'rgba(100, 180, 100, 0.2)' : 'rgba(0,0,0,0.1)'}` }}>
                  <p style={{ fontSize: getFontSize(12), color: isDarkTheme ? '#b0d0b0' : '#4a6a7a' }}>
                    <strong>По вопросам приобретения рыбной продукции:</strong>
                  </p>
                  <p style={{ fontSize: getFontSize(12), marginTop: '5px', color: isDarkTheme ? '#d0d8d0' : '#2a3a4a' }}>
                    Девятериков Александр Николаевич
                  </p>
                  <p style={{ marginTop: '5px' }}>
                    <a href="tel:+79519866036" style={{ color: isDarkTheme ? '#8bc34a' : '#1e3279', textDecoration: 'none', fontSize: getFontSize(14), fontWeight: 'bold' }}>
                      +7-951-986-60-36
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="contacts-map-block">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=77.4167,64.9167&z=15&pt=77.4167,64.9167,pm2rdl&what=Тарко-Сале, микрорайон Советский, 6А"
                  width="100%" 
                  height="250" 
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen
                  loading="lazy"
                  title="Карта Совхоз Пуровский - г. Тарко-Сале, микрорайон Советский, д. 6А"
                />
                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                  <a 
                    href="https://yandex.ru/maps/?text=Тарко-Сале+микрорайон+Советский+6А"
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: isDarkTheme ? '#8bc34a' : '#1e3279', fontSize: getFontSize(12), textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = isDarkTheme ? '#a0e0a0' : '#2a4a9e'}
                    onMouseLeave={(e) => e.currentTarget.style.color = isDarkTheme ? '#8bc34a' : '#1e3279'}
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
    </div>
  )
}

export default App