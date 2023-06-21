const artistCheckboxes = document.querySelectorAll('form fieldset div input');
const artistCountText = document.querySelector('form > p:first-of-type');
const artistCountNumber = document.querySelector('form > p:nth-of-type(2) > span');
const javascriptFallbackText = document.querySelector('form > p:last-of-type');
console.log(artistCheckboxes);

javascriptFallbackText.classList.add('jsactive');

let artistCheckedCount = 0;

artistCheckboxes.forEach(artist => {
    artist.addEventListener('change', () => {

        if(artist.checked) {
            artistCheckedCount = artistCheckedCount + 1;

        } else {
            artistCheckedCount = artistCheckedCount - 1;

        }

        countEvents();
        artistCountNumber.innerHTML=artistCheckedCount;
    });
})

const countEvents = () => {
    if(artistCheckedCount >1 && artistCheckedCount < 5) {
        artistCountText.innerHTML="Great start, love your choices!"
    } else if(artistCheckedCount == 5) {
        artistCountText.innerHTML="wow that many! I almost dont believe you";
    } else if (artistCheckedCount > 5) {
        artistCountText.innerHTML="Keep adding!";
    }
}