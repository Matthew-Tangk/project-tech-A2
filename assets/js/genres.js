/* Select & deselect Genres */
const checkboxes = document.querySelectorAll("#selectGenres ul li input[type='checkbox']");
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const li = checkbox.parentElement;
    if (li.classList.contains('selectedGenre')) { 
      li.classList.remove('selectedGenre'); 
    } else { 
      li.classList.add('selectedGenre'); 
    }
  });
});
