document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const dishDetails = [
        { name: '미트볼 스파게티', shortName: '스파게티', grade: 'COMMON', icon: 'Spaghetti.png', color: '#c8b900', minPrice: 243, maxPrice: 810 },
        { name: '어니언 링', shortName: '어니언링', grade: 'COMMON', icon: 'onionRings.png', color: '#c8b900', minPrice: 388, maxPrice: 1296 },
        { name: '갈릭 코코넛 케이크', shortName: '케이크', grade: 'COMMON', icon: 'cake.png', color: '#c8b900', minPrice: 243, maxPrice: 810 },
        { name: '삼겹살 토마토 찌개', shortName: '찌개', grade: 'NORMAL', icon: 'tomatoJjigae.png', color: '#558b2f', minPrice: 576, maxPrice: 1921 },
        { name: '삼색 아이스크림', shortName: '아이스크림', grade: 'NORMAL', icon: 'IceCream.png', color: '#558b2f', minPrice: 758, maxPrice: 2527 },
        { name: '마늘 양갈비 핫도그', shortName: '핫도그', grade: 'NORMAL', icon: 'hotdog.png', color: '#558b2f', minPrice: 549, maxPrice: 1832 },
        { name: '스윗 치킨 햄버거', shortName: '햄버거', grade: 'RARE', icon: 'Burger.png', color: '#0277bd', minPrice: 1083, maxPrice: 3612 },
        { name: '토마토 파인애플 피자', shortName: '피자', grade: 'RARE', icon: 'Pizza.png', color: '#0277bd', minPrice: 878, maxPrice: 2930 },
        { name: '양파 수프', shortName: '수프', grade: 'RARE', icon: 'onionSoup.png', color: '#0277bd', minPrice: 1000, maxPrice: 3335 },
        { name: '토마토 라자냐', shortName: '라자냐', grade: 'EPIC', icon: 'tomatoLasana.png', color: '#ad1457', minPrice: 1253, maxPrice: 4177 },
    ];

    const priceHistoryData = [
        { date: '2025-10-17', prices: [192, 581, 221, 412, 1159, 619, 1550, 478, 1124, 2210] },
        { date: '2025-10-18', prices: [245, 252, 311, 505, 789, 827, 769, 477, 973, 1890] },
        { date: '2025-10-21', prices: [492, 583, 138, 711, 560, 545, 1607, 811, 586, 1070] },
        { date: '2025-10-24', prices: [427, 632, 222, 792, 1900, 921, 1362, 2093, 1048, 1851] },
        { date: '2025-10-27', prices: [354, 541, 228, 855, 718, 1156, 1053, 978, 2125, 1636] },
        { date: '2025-10-30', prices: [563, 746, 344, 1387, 1549, 896, 2022, 1667, 1980, 2815] },
        { date: '2025-11-01', prices: [693, 792, 464, 1009, 1413, 1300, 1296, 2144, 1618, 2759] },
        { date: '2025-11-06', prices: [472, 936, 519, 1096, 1843, 1241, 2064, 1907, 2780, 2578] },
        { date: '2025-11-09', prices: [642, 1105, 384, 1617, 1886, 967, 2471, 2139, 1904, 3752] },
        { date: '2025-11-12', prices: [341, 772, 324, 1031, 2301, 607, 1999, 2793, 1214, 1305] },
        { date: '2025-11-15', prices: [526, 932, 734, 1204, 981, 1542, 1945, 923, 2337, 1277] },
        { date: '2025-11-18', prices: [722, 486, 304, 1790, 1947, 1137, 2984, 1684, 2754, 2907] },
        { date: '2025-11-21', prices: [583, 1027, 349, 1534, 1272, 1627, 2026, 1507, 2113, 3215] },
        { date: '2025-11-24', prices: [331, 725, 552, 834, 808, 1728, 3032, 1325, 1957, 2732] },
        { date: '2025-11-27', prices: [627, 401, 708, 1334, 1982, 1709, 1594, 2227, 2291, 2044] }
    ];

    let priceChart = null;

    // --- DATA PROCESSING ---
    const dishes = dishDetails.map((dish, index) => {
        const priceHistory = priceHistoryData.map(dataPoint => ({
            date: dataPoint.date,
            price: dataPoint.prices[index]
        }));
        const currentPrice = priceHistory[priceHistory.length - 1].price;
        const previousPrice = priceHistory.length > 1 ? priceHistory[priceHistory.length - 2].price : currentPrice;
        const priceDiff = currentPrice - previousPrice;

        return {
            ...dish,
            priceHistory,
            price: currentPrice,
            priceDiff: priceDiff
        };
    });

    // --- DOM MANIPULATION ---
    function populateDishInfo() {
        const containers = {
            COMMON: document.getElementById('common-dishes'),
            NORMAL: document.getElementById('normal-dishes'),
            RARE: document.getElementById('rare-dishes'),
            EPIC: document.getElementById('epic-dishes'),
        };

        dishes.forEach(dish => {
            if (!containers[dish.grade]) return;

            const percentage = ((dish.price - dish.minPrice) / (dish.maxPrice - dish.minPrice)) * 100;

            let priceDiffHtml = '';
            if (dish.priceDiff > 0) {
                priceDiffHtml = `<span class="price-up">▲ +${dish.priceDiff.toLocaleString('ko-KR')}</span>`;
            } else if (dish.priceDiff < 0) {
                priceDiffHtml = `<span class="price-down">▼ ${dish.priceDiff.toLocaleString('ko-KR')}</span>`;
            }

            const dishElement = document.createElement('div');
            dishElement.className = 'dish-info-item';
            dishElement.innerHTML = `
                <span class="grade-tag ${dish.grade.toLowerCase()}">${dish.grade}</span>
                <img src="image/cook/${dish.icon}" alt="${dish.name}">
                <div class="dish-text">
                    <p class="dish-name">${dish.name}</p>
                    <p class="dish-price">현재가: ${dish.price.toLocaleString('ko-KR')} G ${priceDiffHtml}</p>
                    <div class="price-range">
                        <span>하한가: ${dish.minPrice.toLocaleString('ko-KR')} G</span>
                        <span>상한가: ${dish.maxPrice.toLocaleString('ko-KR')} G</span>
                    </div>
                    <div class="price-bar-container">
                        <div class="price-bar" style="width: ${Math.min(100, Math.max(0, percentage))}%;"></div>
                    </div>
                    <p class="price-percentage">현재가 위치: ${percentage.toFixed(2)}%</p>
                </div>`;
            containers[dish.grade].appendChild(dishElement);
        });
    }

    // --- CHART LOGIC ---
    function createChart() {
        const ctx = document.getElementById('priceChart').getContext('2d');

        const initialDatasets = dishes.map(dish => ({
            label: dish.shortName,
            data: dish.priceHistory.map(ph => ({ x: new Date(ph.date), y: ph.price })),
            borderColor: dish.color,
            backgroundColor: dish.color + '33', // For tooltip point fill
            fill: false,
            tension: 0.1,
            pointRadius: 3,
            pointHoverRadius: 6
        }));

        priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: initialDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    title: { display: true, text: '요리 가격 변동 그래프', font: { size: 18 } },
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 20
                        },
                        onHover: (event, legendItem, legend) => {
                            const canvas = legend.chart.canvas;
                            canvas.style.cursor = `url('image/chicky/chickyCusorHover.png'), auto`;
                        },
                        onLeave: (event, legendItem, legend) => {
                            const canvas = legend.chart.canvas;
                            canvas.style.cursor = `url('image/chicky/chickyCusor.png'), auto`;
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                let label = context.dataset.label || '';
                                if (label) label += '  ';
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('ko-KR').format(context.parsed.y) + ' G';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'yyyy-MM-dd',
                            displayFormats: {
                                day: 'MM-dd'
                            }
                        },
                        title: { display: true, text: '날짜' }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (value) => new Intl.NumberFormat('ko-KR').format(value) + ' G'
                        },
                        title: { display: true, text: '가격 (Gold)' }
                    }
                }
            }
        });
    }

    function updateChartRange(startDate, endDate) {
        if (!priceChart) return;
        priceChart.options.scales.x.min = startDate.getTime();
        priceChart.options.scales.x.max = endDate.getTime();
        priceChart.update();
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        document.querySelectorAll('.range-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelector('.range-btn.active')?.classList.remove('active');
                this.classList.add('active');

                const range = this.dataset.range;
                const history = dishes[0].priceHistory;
                const fullEndDate = new Date(history[history.length - 1].date);
                let startDate;

                if (range === 'all') {
                    startDate = new Date(history[0].date);
                } else {
                    startDate = new Date(fullEndDate);
                    if (range === '1m') startDate.setMonth(startDate.getMonth() - 1);
                    else if (range === '3m') startDate.setMonth(startDate.getMonth() - 3);
                    else if (range === '6m') startDate.setMonth(startDate.getMonth() - 6);
                    else if (range === '1y') startDate.setFullYear(startDate.getFullYear() - 1);
                }
                updateChartRange(startDate, fullEndDate);
                // Clear custom date inputs
                document.getElementById('start-date').value = '';
                document.getElementById('end-date').value = '';
            });
        });

        document.getElementById('apply-custom-range').addEventListener('click', () => {
            const startDateValue = document.getElementById('start-date').value;
            const endDateValue = document.getElementById('end-date').value;
            if (startDateValue && endDateValue) {
                const startDate = new Date(startDateValue);
                const endDate = new Date(endDateValue);
                // To include the end date in the chart, set time to end of day
                endDate.setHours(23, 59, 59, 999);
                updateChartRange(startDate, endDate);
                document.querySelector('.range-btn.active')?.classList.remove('active');
            }
        });
    }

    // --- INITIALIZATION ---
    populateDishInfo();
    createChart();
    setupEventListeners();
    // Set default view to 'all'
    document.querySelector('.range-btn[data-range="all"]').click();
});
