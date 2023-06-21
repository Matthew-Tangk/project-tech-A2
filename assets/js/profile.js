const birthdate = document.querySelector('#profileData > section > p:nth-of-type(2)').innerHTML;
const ageTextfield = document.querySelector('#profileData > section > p:nth-of-type(2)')

// Get the current date
const currentDate = new Date();

// Convert the birthdate string to a Date object
const birthdateObj = new Date(birthdate);

// Calculate the difference in milliseconds between the current date and the birthdate
const ageInMilliseconds = currentDate - birthdateObj;

// Convert the age from milliseconds to years
const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

ageTextfield.innerHTML = ageInYears + " years";



const showNotificationInvite = (notificationMessage) => {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    // notification.textContent = notificationMessage;
  
    const link = document.createElement('a');
    link.href = '/invites'; // Replace with the desired URL or relative path
    link.textContent = notificationMessage;
  
    notification.appendChild(link);
  
    notification.addEventListener('click', () => {
      window.location.href = link.href;
    });
  
    const body = document.querySelector('body');
    body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 5000)
  }
  
  const showNotificationAfterSeconds = 5000;
  
  setTimeout(() => {
    showNotificationInvite('WoW! You have got a new invite!');
  }, showNotificationAfterSeconds);
