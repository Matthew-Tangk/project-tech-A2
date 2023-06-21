 /* Image upload preview */
 const fileInput = document.querySelector("#upload-image");
 const errorMessage = document.querySelector("#error-message");

 fileInput.addEventListener("change", () => {
   const file = fileInput.files[0];
   if (file) {
     const reader = new FileReader();

     reader.addEventListener("error", (event) => {
       const error = reader.error;
       errorMessage.textContent = `Error reading the file ${error.message}`;
     });

     reader.readAsDataURL(file);
     document.querySelector("img").src = URL.createObjectURL(file);
     
   }
 });

 /* Image upload server-side check */
 document.querySelector("#upload-image").addEventListener("change", (event) => {
   const messageElement = document.querySelector("#message");
   const file = event.target.files[0];
   
   if (file) {
     const fr = new FileReader();
     fr.onload = () => {
       if (fr.readyState === FileReader.DONE) {
         messageElement.textContent = "File uploaded successfully!";
         messageElement.style.color = "green";
       }
     };
     fr.onerror = () => {
       messageElement.textContent = "There was an error with uploading the file.";
       messageElement.style.color = "red";
     };
     fr.readAsDataURL(file);
   }
 });

 
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