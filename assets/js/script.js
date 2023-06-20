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