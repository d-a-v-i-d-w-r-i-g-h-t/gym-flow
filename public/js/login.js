const loginFormHandler = async (event) => {
    // Prevents page reload on form submit
    event.preventDefault();
  
    // Retrieves the user input for their username and password
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // Validates that the fields are not blank
    if (username && password) {
        // Api call to login the user
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Redirects to the homepage once the login was successful
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  // Event listener for the login form submit button
  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);