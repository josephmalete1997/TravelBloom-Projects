const recommendations = [
    {
        id: 1,
        type: 'beach',
        name: 'Bali Beaches',
        location: 'Bali, Indonesia',
        description: 'Experience the pristine white sand beaches and crystal clear waters of Bali.',
        images: [
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: {
            latitude: -8.4095,
            longitude: 115.1889
        },
        localInfo: {
            language: 'Indonesian',
            currency: 'Indonesian Rupiah (IDR)',
            timeZone: 'UTC+8',
            bestTimeToVisit: 'April to October'
        }
    },
    {
        id: 2,
        type: 'beach',
        name: 'Maldives Paradise',
        location: 'Maldives',
        description: 'Discover overwater bungalows and vibrant coral reefs in this tropical paradise.',
        images: [
            'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: {
            latitude: 3.2028,
            longitude: 73.2207
        },
        localInfo: {
            language: 'Dhivehi',
            currency: 'Maldivian Rufiyaa (MVR)',
            timeZone: 'UTC+5',
            bestTimeToVisit: 'November to April'
        }
    },
    {
        id: 3,
        type: 'temple',
        name: 'Angkor Wat',
        location: 'Siem Reap, Cambodia',
        description: 'Explore the ancient temple complex and marvel at its intricate stone carvings.',
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/20171126_Angkor_Wat_4712_DxO.jpg/1280px-20171126_Angkor_Wat_4712_DxO.jpg',
            'https://images.unsplash.com/photo-1605145183635-33ddb7583c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: {
            latitude: 13.4125,
            longitude: 103.8670
        },
        localInfo: {
            language: 'Khmer',
            currency: 'Cambodian Riel (KHR)',
            timeZone: 'UTC+7',
            bestTimeToVisit: 'November to March'
        }
    },
    {
        id: 4,
        type: 'temple',
        name: 'Kyoto Temples',
        location: 'Kyoto, Japan',
        description: 'Visit the serene temples surrounded by beautiful gardens and traditional architecture.',
        images: [
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1493997181344-712f2f19d87a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: {
            latitude: 35.0116,
            longitude: 135.7681
        },
        localInfo: {
            language: 'Japanese',
            currency: 'Japanese Yen (JPY)',
            timeZone: 'UTC+9',
            bestTimeToVisit: 'March to May and October to November'
        }
    },
    {
        id: 5,
        type: 'country',
        name: 'Italy Exploration',
        location: 'Italy',
        description: 'From Rome to Venice, experience the rich history, art, and cuisine of Italy.',
        images: [
            'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: {
            latitude: 41.8719,
            longitude: 12.5674
        },
        localInfo: {
            language: 'Italian',
            currency: 'Euro (EUR)',
            timeZone: 'UTC+1',
            bestTimeToVisit: 'April to June and September to October'
        }
    },
    {
        id: 6,
        type: 'country',
        name: 'New Zealand Adventure',
        location: 'New Zealand',
        description: 'Discover breathtaking landscapes from mountains to beaches in this diverse country.',
        images: [
            'https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        coordinates: {
            latitude: -40.9006,
            longitude: 174.8860
        },
        localInfo: {
            language: 'English, Māori',
            currency: 'New Zealand Dollar (NZD)',
            timeZone: 'UTC+12',
            bestTimeToVisit: 'December to March'
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const recommendationResults = document.getElementById('recommendationResults');
    const emailForm = document.getElementById('emailForm');
    const modal = document.getElementById('detailsModal');
    const closeModal = document.getElementById('closeModal');
    
    if (!modal) {
        createModal();
    }

    displayRecommendations(recommendations);

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayRecommendations(recommendations);
            return;
        }
        
        if (recommendationResults) {
            recommendationResults.innerHTML = '<div class="loading">Searching for destinations...</div>';
            recommendationResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        searchDestinations(searchTerm)
            .then(results => {
                if (results.length > 0) {
                    displayRecommendations(results);
                } else {
                    const filteredRecommendations = recommendations.filter(rec => {
                        return rec.name.toLowerCase().includes(searchTerm) || 
                               rec.location.toLowerCase().includes(searchTerm) || 
                               rec.type.toLowerCase().includes(searchTerm) || 
                               rec.description.toLowerCase().includes(searchTerm);
                    });
                    
                    displayRecommendations(filteredRecommendations);
                }
                
                if (recommendationResults) {
                    recommendationResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            })
            .catch(error => {
                console.error('Search error:', error);
                
                const filteredRecommendations = recommendations.filter(rec => {
                    return rec.name.toLowerCase().includes(searchTerm) || 
                           rec.location.toLowerCase().includes(searchTerm) || 
                           rec.type.toLowerCase().includes(searchTerm) || 
                           rec.description.toLowerCase().includes(searchTerm);
                });
                
                displayRecommendations(filteredRecommendations);
                
                if (recommendationResults) {
                    recommendationResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
    }

    async function searchDestinations(query) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const results = recommendations.filter(rec => {
                return rec.name.toLowerCase().includes(query) || 
                       rec.location.toLowerCase().includes(query) || 
                       rec.type.toLowerCase().includes(query) || 
                       rec.description.toLowerCase().includes(query);
            });
            
            if (results.length > 0) {
                return results.map(result => {
                    return {
                        ...result,
                        weather: getRandomWeather(),
                        localEvents: getLocalEvents(result.location),
                        exchangeRate: getExchangeRate(result.localInfo.currency)
                    };
                });
            }
            
            if (query.length > 2) {
                const image1 = await fetchPixabayImage(query, 'travel');
                const image2 = await fetchPixabayImage(query, 'landmark');
                
                const newLocation = {
                    id: 100 + Math.floor(Math.random() * 900),
                    type: getRandomType(),
                    name: `${capitalizeFirstLetter(query)} Destination`,
                    location: `${capitalizeFirstLetter(query)}, ${getRandomCountry()}`,
                    description: `Discover the beauty of ${capitalizeFirstLetter(query)} with its unique attractions and local culture.`,
                    images: [
                        image1 || `https://source.unsplash.com/800x600/?${query},travel`,
                        image2 || `https://source.unsplash.com/800x600/?${query},landmark`
                    ],
                    coordinates: {
                        latitude: (Math.random() * 180 - 90).toFixed(4) * 1,
                        longitude: (Math.random() * 360 - 180).toFixed(4) * 1
                    },
                    localInfo: {
                        language: getRandomLanguage(),
                        currency: getRandomCurrency(),
                        timeZone: `UTC${getRandomTimeZone()}`,
                        bestTimeToVisit: getRandomSeason()
                    },
                    weather: getRandomWeather(),
                    localEvents: getLocalEvents(query),
                    exchangeRate: getExchangeRate(getRandomCurrency())
                };
                
                return [newLocation];
            }
            
            return [];
        } catch (error) {
            console.error('API search error:', error);
            return [];
        }
    }
    
    async function fetchPixabayImage(query, category) {
        const apiKey = '39936477-2b4a1f9d5b4c6a2e7d1e3f2c8';
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query + ' ' + category)}&image_type=photo&per_page=3`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.hits && data.hits.length > 0) {
                const randomIndex = Math.floor(Math.random() * Math.min(3, data.hits.length));
                return data.hits[randomIndex].largeImageURL;
            }
            
            return null;
        } catch (error) {
            console.error('Error fetching Pixabay image:', error);
            return null;
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function getRandomType() {
        const types = ['beach', 'temple', 'country', 'city', 'mountain', 'island'];
        return types[Math.floor(Math.random() * types.length)];
    }
    
    function getRandomCountry() {
        const countries = ['France', 'Spain', 'Thailand', 'Australia', 'Brazil', 'Canada', 'South Africa', 'Morocco'];
        return countries[Math.floor(Math.random() * countries.length)];
    }
    
    function getRandomLanguage() {
        const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Thai', 'Japanese', 'Arabic'];
        return languages[Math.floor(Math.random() * languages.length)];
    }
    
    function getRandomCurrency() {
        const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'THB', 'ZAR'];
        return currencies[Math.floor(Math.random() * currencies.length)];
    }
    
    function getRandomTimeZone() {
        const zones = ['+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+10', '+11', '+12', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-10', '-11', '-12'];
        return zones[Math.floor(Math.random() * zones.length)];
    }
    
    function getRandomSeason() {
        const seasons = [
            'January to March', 'April to June', 'July to September', 'October to December',
            'Spring', 'Summer', 'Fall', 'Winter',
            'Dry season', 'Rainy season'
        ];
        return seasons[Math.floor(Math.random() * seasons.length)];
    }
    
    function getRandomWeather() {
        const weathers = [
            {condition: 'Sunny', temperature: Math.floor(Math.random() * 15) + 20},
            {condition: 'Cloudy', temperature: Math.floor(Math.random() * 10) + 15},
            {condition: 'Rainy', temperature: Math.floor(Math.random() * 10) + 10},
            {condition: 'Snowy', temperature: Math.floor(Math.random() * 10) - 5},
            {condition: 'Partly Cloudy', temperature: Math.floor(Math.random() * 10) + 18}
        ];
        return weathers[Math.floor(Math.random() * weathers.length)];
    }
    
    function getLocalEvents(location) {
        const events = [
            `${capitalizeFirstLetter(location)} Annual Festival`,
            `${capitalizeFirstLetter(location)} Food Fair`,
            `Cultural Exhibition of ${capitalizeFirstLetter(location)}`,
            `${capitalizeFirstLetter(location)} Music Concert`,
            `Traditional ${capitalizeFirstLetter(location)} Celebration`
        ];
        
        const numEvents = Math.floor(Math.random() * 3) + 1;
        const selectedEvents = [];
        
        for (let i = 0; i < numEvents; i++) {
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            if (!selectedEvents.includes(randomEvent)) {
                selectedEvents.push(randomEvent);
            }
        }
        
        return selectedEvents;
    }
    
    function getExchangeRate(currency) {
        const rates = {
            'USD': 1.0,
            'EUR': 0.85,
            'GBP': 0.75,
            'JPY': 110.5,
            'AUD': 1.35,
            'CAD': 1.25,
            'THB': 33.2,
            'ZAR': 15.5,
            'Indonesian Rupiah (IDR)': 14500,
            'Maldivian Rufiyaa (MVR)': 15.4,
            'Cambodian Riel (KHR)': 4100,
            'Japanese Yen (JPY)': 110.5,
            'Euro (EUR)': 0.85,
            'New Zealand Dollar (NZD)': 1.45
        };
        
        return rates[currency] || Math.random() * 10 + 1;
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            displayRecommendations(recommendations);
        });
    }

    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            console.log('Form submitted:', { name, email, subject, message });
            
            showNotification('Thank you for your message! We will get back to you soon.');
            emailForm.reset();
        });
    }

    function displayRecommendations(recs) {
        if (!recommendationResults) return;
        
        if (recs.length === 0) {
            recommendationResults.innerHTML = '<p class="no-results">No recommendations found. Please try a different search term.</p>';
            return;
        }
        
        recommendationResults.innerHTML = '';
        
        recs.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            
            const hasApiData = rec.weather || rec.localEvents || rec.exchangeRate;
            
            let localInfoHTML = '';
            if (rec.localInfo) {
                localInfoHTML = `
                    <div class="local-info">
                        <p><strong>Language:</strong> ${rec.localInfo.language}</p>
                        <p><strong>Currency:</strong> ${rec.localInfo.currency}</p>
                        <p><strong>Time Zone:</strong> ${rec.localInfo.timeZone}</p>
                        <p><strong>Best Time to Visit:</strong> ${rec.localInfo.bestTimeToVisit}</p>
                    </div>
                `;
            }
            
            let weatherHTML = '';
            if (rec.weather) {
                weatherHTML = `
                    <div class="weather-info">
                        <p><strong>Current Weather:</strong> ${rec.weather.condition}, ${rec.weather.temperature}°C</p>
                    </div>
                `;
            }
            
            let eventsHTML = '';
            if (rec.localEvents && rec.localEvents.length > 0) {
                eventsHTML = `
                    <div class="events-info">
                        <p><strong>Local Events:</strong> ${rec.localEvents.join(', ')}</p>
                    </div>
                `;
            }
            
            card.innerHTML = `
                <div class="recommendation-image">
                    <img src="${rec.images[0]}" alt="${rec.name}" onerror="this.src='https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>
                <div class="recommendation-info">
                    <h3>${rec.name}</h3>
                    <p class="location">${rec.location}</p>
                    <p>${rec.description}</p>
                    ${hasApiData ? weatherHTML + eventsHTML : ''}
                    <div class="recommendation-actions">
                        <a href="#" class="btn view-details" data-id="${rec.id}">View Details</a>
                    </div>
                </div>
            `;
            
            recommendationResults.appendChild(card);
        });
        
        const viewDetailsButtons = document.querySelectorAll('.view-details');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const recId = parseInt(this.getAttribute('data-id'));
                const recommendation = recs.find(rec => rec.id === recId);
                
                if (recommendation) {
                    showRecommendationDetails(recommendation);
                }
            });
        });
    }

    function createModal() {
        const modalHTML = `
            <div id="detailsModal" class="modal">
                <div class="modal-content">
                    <span id="closeModal" class="close-modal">&times;</span>
                    <div id="modalContent"></div>
                </div>
            </div>
            <div id="notification" class="notification"></div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
    }

    function showRecommendationDetails(recommendation) {
        const modal = document.getElementById('detailsModal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) return;
        
        let localInfoHTML = '';
        if (recommendation.localInfo) {
            localInfoHTML = `
                <div class="modal-section">
                    <h3>Local Information</h3>
                    <ul class="local-info-list">
                        <li><strong>Language:</strong> ${recommendation.localInfo.language}</li>
                        <li><strong>Currency:</strong> ${recommendation.localInfo.currency}</li>
                        <li><strong>Time Zone:</strong> ${recommendation.localInfo.timeZone}</li>
                        <li><strong>Best Time to Visit:</strong> ${recommendation.localInfo.bestTimeToVisit}</li>
                    </ul>
                </div>
            `;
        }
        
        let weatherHTML = '';
        if (recommendation.weather) {
            weatherHTML = `
                <div class="modal-section">
                    <h3>Current Weather</h3>
                    <p class="weather-info">
                        <span class="weather-condition">${recommendation.weather.condition}</span>
                        <span class="weather-temp">${recommendation.weather.temperature}°C</span>
                    </p>
                </div>
            `;
        }
        
        let eventsHTML = '';
        if (recommendation.localEvents && recommendation.localEvents.length > 0) {
            const eventsList = recommendation.localEvents.map(event => `<li>${event}</li>`).join('');
            eventsHTML = `
                <div class="modal-section">
                    <h3>Local Events</h3>
                    <ul class="events-list">
                        ${eventsList}
                    </ul>
                </div>
            `;
        }
        
        let mapHTML = '';
        if (recommendation.coordinates) {
            mapHTML = `
                <div class="modal-section">
                    <h3>Location</h3>
                    <div class="modal-map">
                        <iframe 
                            width="100%" 
                            height="250" 
                            frameborder="0" 
                            style="border:0" 
                            src="https://www.openstreetmap.org/export/embed.html?bbox=${recommendation.coordinates.longitude-0.1}%2C${recommendation.coordinates.latitude-0.1}%2C${recommendation.coordinates.longitude+0.1}%2C${recommendation.coordinates.latitude+0.1}&amp;layer=mapnik&amp;marker=${recommendation.coordinates.latitude}%2C${recommendation.coordinates.longitude}" 
                            allowfullscreen>
                        </iframe>
                        <small>
                            <a href="https://www.openstreetmap.org/?mlat=${recommendation.coordinates.latitude}&amp;mlon=${recommendation.coordinates.longitude}#map=12/${recommendation.coordinates.latitude}/${recommendation.coordinates.longitude}" target="_blank">View larger map</a>
                        </small>
                    </div>
                </div>
            `;
        }
        
        modalContent.innerHTML = `
            <h2>${recommendation.name}</h2>
            <p class="modal-location">${recommendation.location}</p>
            <div class="modal-images">
                <img src="${recommendation.images[0]}" alt="${recommendation.name} Image 1" class="modal-image active" onerror="this.src='https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                <img src="${recommendation.images[1]}" alt="${recommendation.name} Image 2" class="modal-image" onerror="this.src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
            </div>
            <div class="modal-thumbnails">
                <img src="${recommendation.images[0]}" alt="Thumbnail 1" class="modal-thumbnail active" data-index="0" onerror="this.src='https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                <img src="${recommendation.images[1]}" alt="Thumbnail 2" class="modal-thumbnail" data-index="1" onerror="this.src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
            </div>
            <p class="modal-description">${recommendation.description}</p>
            
            <div class="modal-details">
                ${localInfoHTML}
                ${weatherHTML}
                ${eventsHTML}
                ${mapHTML}
            </div>
            
            <div class="modal-actions">
                <a href="#" class="btn book-now">Book Now</a>
            </div>
        `;
        
        modal.style.display = 'block';
        
        const thumbnails = document.querySelectorAll('.modal-thumbnail');
        const images = document.querySelectorAll('.modal-image');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                images.forEach(img => img.classList.remove('active'));
                images[index].classList.add('active');
            });
        });
        
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    function showNotification(message) {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(function() {
            notification.classList.remove('show');
        }, 3000);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 