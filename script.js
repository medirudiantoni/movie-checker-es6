const inputSearch = document.getElementById("inputSearch");
const buttonSearch = document.getElementById("buttonSearch");
const movieContainer = document.getElementById("movieContainer");
const overlayModal = document.getElementById("overlayModal");

function movieCard(movie) {
  return `<div class="w-32 md:w-56 h-fit mb-5 relative">
                <div class="detailButton absolute top-0 left-0 w-full h-full cursor-pointer" data-imdbid="${movie.imdbID}"></div>
                <div class="w-full h-fit md:h-[320px] flex bg-slate-950">
                    <img src="${movie.Poster}" alt="poster" class="w-full h-full object-cover">
                </div>
                <div class="w-full min-h-[100px] mt-2 p-2 text-center">
                    <h4 class="text-lg mb-2">${movie.Title}</h4>
                    <p class="text-slate-400">${movie.Year}</p>
                </div>
            </div>`;
}

function movieDetailModal(movie) {
  return `<div class="container containerDetail overflow-y-scroll h-screen md:h-[600px] bg-slate-800 relative p-5 md:p-10">
                <div class="modalCloser absolute top-0 right-0 py-2 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 cursor-pointer">Close</div>

                <div class=" w-full h-full flex flex-col md:flex-row gap-5 justify-start md:pt-10">
                    <div class="w-[300px] h-full flex">
                        <img src="${movie.Poster}" alt="poster" class="w-full h-fit object-cover">
                    </div>
                    <div class="max-w-[400px]">
                        <h1 class="text-xl border-b pb-2 mb-2">${movie.Title}</h1>
                        <ul>
                            <li class="my-2">Year: ${movie.Year}</li>
                            <li class="my-2">Genre: ${movie.Genre}</li>
                            <li class="my-2">Director: ${movie.Director}</li>
                            <li class="my-2">Writer: ${movie.Writer}</li>
                            <li class="my-2">Actors: ${movie.Actors}</li>
                            <li class="my-2">Awards: ${movie.Awards}</li>
                            <li class="my-2">Plot: ${movie.Plot}</li>
                        </ul>
                    </div>
                </div>

            </div>`;
}

function loadingSpinAnimation() {
  return `<div id="wrapper">
                <div class="profile-main-loader">
                  <div class="loader">
                    <svg class="circular-loader"viewBox="25 25 50 50" >
                      <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="white" stroke-width="3" />
                    </svg>
                  </div>
                </div>
            </div>`;
}

buttonSearch.addEventListener("click", function (event) {
  event.preventDefault();
  movieContainer.innerHTML = loadingSpinAnimation();
  const inputValue = inputSearch.value;
  const fetchValue =
    fetch(`https://www.omdbapi.com/?apikey=54ef65bc&s=${inputValue}
    `);
  fetchValue
    .then((res) => res.json())
    .then((res) => {
      if (res.Response === "True") {
        let cards = "";
        const movies = res.Search;
        movies.forEach((movie) => {
          cards += movieCard(movie);
          return (movieContainer.innerHTML = cards);
        });
      } else {
        movieContainer.innerHTML = 'film tidak ditemukan'
      }
    });
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("detailButton")) {
    document.body.style.overflowY = 'hidden';
    const imdbid = e.target.getAttribute("data-imdbid");
    overlayModal.innerHTML = loadingSpinAnimation();
    overlayModal.classList.add("translate-y-full");
    const movieDetail =
      fetch(`https://www.omdbapi.com/?apikey=54ef65bc&i=${imdbid}
        `);
    movieDetail
      .then((res) => res.json())
      .then((res) => {
        let detailModal = movieDetailModal(res);
        overlayModal.innerHTML = detailModal;
      });
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modalCloser")) {
    document.body.style.overflowY = 'scroll';
    overlayModal.classList.remove("translate-y-full");
    overlayModal.innerHTML = "";
  }
});
