const signupFormHandler = async (event) => {
    // Prevent the reload of the page upon form submit
    event.preventDefault();
  
    // Stores the user's input from the signup form
    const user_name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();

    // Check if any of the required fields is missing
    if ( !user_name || !email || !password || !confirmPassword ) {
      // Display an alert to inform the user
      alert('Please provide all required information'); // Replace this with a modal ******
      return; // Stop signup execution
    }

    // Check if passwords match
    if ( password !== confirmPassword ) {
      alert('Passwords do not match. Please re-enter.'); // Replace this with a modal ******
    }

    // Api call to create a new user
    if (user_name && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ user_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Redirects top the homepage if the user creation was successful
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up');
      }
    }
  };
  
  // Event listener for the signup form submit
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
  