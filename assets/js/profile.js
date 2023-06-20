const birthdate = document.querySelector('#profileData > section > p:nth-of-type(2)').innerHTML;
const ageTextfield = document.querySelector('#profileData > section > p:nth-of-type(2)')
console.log(birthdate)

// Get the current date
const currentDate = new Date();

// Convert the birthdate string to a Date object
const birthdateObj = new Date(birthdate);

// Calculate the difference in milliseconds between the current date and the birthdate
const ageInMilliseconds = currentDate - birthdateObj;

// Convert the age from milliseconds to years
const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

ageTextfield.innerHTML = ageInYears + " years";
