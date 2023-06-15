console.log("hello");

window.addEventListener('DOMContentLoaded', (event) => {
    // Retrieve the text container element
    const textContainer = document.querySelector('.text-container');

    // Retrieve the h1, h2, and h2 elements inside the text container
    const h1Element = textContainer.querySelector('h1');
    const h2Elements = textContainer.querySelectorAll('h2');

    // Extract the text content from the elements
    const h1Text = h1Element.textContent;
    const h2Text1 = h2Elements[0].textContent;
    const h2Text2 = h2Elements[1].textContent;
    const h2Text3 = h2Elements[2].textContent;
