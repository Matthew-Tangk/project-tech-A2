/* Select & deselect artists */
  const selectArtist = document.querySelectorAll("#artistList ul li");
  selectArtist.forEach(artist => {
    artist.addEventListener('click', () => {
      if (artist.classList.contains('selected')) { 
        artist.classList.remove('selected'); 
      } else { 
        artist.classList.add('selected'); 
      }
    });
  });