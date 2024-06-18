document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById('newsContainer');
    const form = document.getElementById('searchForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = form.querySelector('input').value;
        fetchNews(query);
    });

    function fetchNews(query) {
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=2024-06-17&sortBy=popularity&apiKey=25bb929c819846568c9a552fabacd28b`;

        fetch(url)
            .then(response => response.json())
            .then(data => displayNews(data.articles))
            .catch(error => console.error('Error fetching news:', error));
    }

    function displayNews(articles) {
        // Clear existing news articles
        newsContainer.innerHTML = '';
        
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                    </div>
                </div>
            `;
            newsContainer.appendChild(card);
        });
    }

    // Fetch initial news
    fetchNews('usa');
});
