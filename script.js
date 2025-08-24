const btnSearch = document.getElementById('btnSearch');
const input = document.getElementById('search');
const result = document.getElementById('result');

const apikey = '3cbe0b12';

btnSearch.addEventListener('click', () => {
    const query = input.value;
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apikey}`

    result.innerHTML = '<div class="loading"></div>';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True" && data.Search.length > 0) {
                const movie = data.Search[0];
                fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apikey}`)
                    .then(res => res.json())
                    .then(details => {
                        result.innerHTML = `
                            <h2>${details.Title} (${details.Year})</h2>
                            <img src="${details.Poster}" alt="Poster">
                            <div class="details">
                                <p>${details.Plot}</p>
                                <p><strong>Gênero:</strong> ${details.Genre}</p>
                                <p><strong>Nota IMDb:</strong> ${details.imdbRating}</p>
                            </div>
                        `;

                    });
            } else {
                result.innerHTML = "<p>Filme não encontrado!</p>";
            }
        });
});