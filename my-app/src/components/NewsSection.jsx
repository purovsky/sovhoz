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
            marginTop: '40px', 
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{
                maxWidth: isMobile ? '100%' : '800px',
                width: '100%',
                position: 'relative',
                zIndex: 10
            }}>
                <h3 style={{
                    fontSize: getFontSize(20),
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '20px',
                    color: isDarkTheme ? '#ffffff' : '#1e3279',
                    textAlign: 'center',
                    borderBottom: `2px solid ${isDarkTheme ? '#8bc34a' : '#d19250'}`,
                    paddingBottom: '10px',
                    width: '100%',
                    fontWeight: 600,
                    position: 'relative',
                    zIndex: 10
                }}>
                    Мы в СМИ
                </h3>
                
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                    position: 'relative',
                    zIndex: 10
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
                                maxWidth: '400px',
                                position: 'relative',
                                zIndex: 10
                            }}
                        >
                            <div style={{
                                background: isDarkTheme ? 'rgba(8, 18, 12, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '12px',
                                padding: '15px',
                                border: `1px solid ${isDarkTheme ? 'rgba(139, 195, 74, 0.4)' : 'rgba(0,0,0,0.1)'}`,
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                zIndex: 10
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = `0 4px 12px ${isDarkTheme ? 'rgba(139, 195, 74, 0.3)' : 'rgba(0,0,0,0.15)'}`;
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
                                marginBottom: '8px',
                                flexWrap: 'wrap',
                                gap: '4px'
                            }}>
                                <span style={{
                                    fontSize: getFontSize(9),
                                    color: isDarkTheme ? '#8bc34a' : '#d19250',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {item.source}
                                </span>
                                <span style={{
                                    fontSize: getFontSize(8),
                                    color: isDarkTheme ? '#a0c0a0' : '#8a9aa0'
                                }}>
                                    {item.date}
                                </span>
                            </div>
                            
                            <h4 style={{
                                fontSize: getFontSize(13),
                                fontWeight: 600,
                                marginBottom: '8px',
                                lineHeight: '1.3',
                                color: isDarkTheme ? '#e8f0e8' : '#1e3279'
                            }}>
                                {item.title}
                            </h4>
                            
                            <p style={{
                                fontSize: getFontSize(10),
                                lineHeight: '1.4',
                                marginBottom: '10px',
                                color: isDarkTheme ? '#c0d0c0' : '#4a6a7a'
                            }}>
                                {item.description}
                            </p>
                            
                            <div style={{
                                fontSize: getFontSize(9),
                                color: isDarkTheme ? '#8bc34a' : '#1e3279',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: 500
                            }}>
                                Читать подробнее
                                <span style={{ fontSize: '11px' }}>→</span>
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