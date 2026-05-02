// src/components/NewsSection.jsx
import React from 'react';

const NewsSection = ({ isDarkTheme, getFontSize, isMobile }) => {
    const newsItems = [
        {
            id: 1,
            title: "Красная рыба на стол ямальцам",
            description: "В Тарко-Сале начали продажу местной форели, выращенной в Пуровском районе.",
            date: "Сен 2022",
            source: "Вести Ямал",
            link: "https://vesti-yamal.ru/ru/vjesti_jamal/krasnaya_ryba_na_stol_yamalcam_v_tarko-sale_prodayut_mestnuyu_forel/"
        },
        {
            id: 2,
            title: "Форель из Тарко-Сале пойдёт в другие города",
            description: "Предприятие планирует расширить географию поставок свежей форели по всему округу.",
            date: "Сен 2022",
            source: "ТВ Импульс",
            link: "https://tv-impulse.ru/news/apk/forel-vyrashhennuyu-v-tarko-sale-budut-postavlyat-i-v-drugie-goroda-okruga/"
        }
    ];

    return (
        <div style={{ 
            marginTop: '30px', 
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{
                maxWidth: isMobile ? '100%' : '800px',
                width: '100%'
            }}>
                <h3 style={{
                    fontSize: getFontSize(18),
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '15px',
                    color: isDarkTheme ? '#b0d0b0' : '#1e3279',
                    textAlign: 'center',
                    borderBottom: `2px solid ${isDarkTheme ? '#4a7c59' : '#d19250'}`,
                    paddingBottom: '6px',
                    width: '100%'
                }}>
                    Мы в СМИ
                </h3>
                
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    {newsItems.map((item) => (
                        <a 
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                display: 'block',
                                width: '100%',
                                maxWidth: '370px'
                            }}
                        >
                            <div style={{
                                background: isDarkTheme ? 'rgba(8, 18, 12, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '8px',
                                padding: '10px 12px',
                                border: `1px solid ${isDarkTheme ? 'rgba(100, 180, 100, 0.2)' : 'rgba(0,0,0,0.08)'}`,
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '6px',
                                flexWrap: 'wrap',
                                gap: '4px'
                            }}>
                                <span style={{
                                    fontSize: getFontSize(8),
                                    color: isDarkTheme ? '#8bc34a' : '#d19250',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {item.source}
                                </span>
                                <span style={{
                                    fontSize: getFontSize(7),
                                    color: isDarkTheme ? '#b0d0b0' : '#8a9aa0'
                                }}>
                                    {item.date}
                                </span>
                            </div>
                            
                            <h4 style={{
                                fontSize: getFontSize(12),
                                fontWeight: 600,
                                marginBottom: '6px',
                                lineHeight: '1.3',
                                color: isDarkTheme ? '#d0d8d0' : '#1e3279'
                            }}>
                                {item.title}
                            </h4>
                            
                            <p style={{
                                fontSize: getFontSize(9),
                                lineHeight: '1.3',
                                marginBottom: '8px',
                                color: isDarkTheme ? '#b0d0b0' : '#4a6a7a',
                                opacity: 0.85
                            }}>
                                {item.description}
                            </p>
                            
                            <div style={{
                                fontSize: getFontSize(8),
                                color: isDarkTheme ? '#8bc34a' : '#1e3279',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                Читать
                                <span style={{ fontSize: '10px' }}>→</span>
                            </div>
                        </div>
                    </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsSection;