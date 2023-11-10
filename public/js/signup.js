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

    // Check if the username is unique
    const isUnique = await isUsernameUnique(user_name);

    if (!isUnique) {
      alert('Username is already taken. Please choose a different one.'); // Replace this with a modal ******
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
  

  async function isUsernameUnique(username) {
    try {
      const response = await fetch(`/api/users/check-username/${user_name}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // server responded with success status
        const data = await response.json();
        return data.isUnique;
      } else {
        // server responded with error status
        console.error('Failed to check for unique username');
        return false;
      }
    } catch (error) {
      console.error('Error checking for unique username', error);
      return false;
    }
  };