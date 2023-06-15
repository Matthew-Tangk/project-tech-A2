/* Select & deselect artists */
  const selectArtist = document.querySelectorAll("#selectGenres ul li ");
  selectArtist.forEach(genre => {
    genre.addEventListener('click', () => {
      if (genre.classList.contains('selectedGenre')) { 
        genre.classList.remove('selectedGenre'); 
      } else { 
        genre.classList.add('selectedGenre'); 
      }
    });
  });