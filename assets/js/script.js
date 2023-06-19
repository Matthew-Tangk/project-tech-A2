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
