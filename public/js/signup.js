async function isUsernameUnique(username) {
  try {
    const response = await fetch(`/api/users/check-username/${username}`, {
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

const usernameInput = document.querySelector('#username-signup');

// Event listener for username input check on blur
usernameInput.addEventListener('blur', async () => {
  const username = usernameInput.value.trim();
  if (username !== '') {
    const isUnique = await isUsernameUnique(username);
    if (!isUnique) {
      alert(
`Username '${username}' is already taken.
Please choose a different username.`
      ); // Replace this with a modal ******
      // Clear the username input field
      usernameInput.value = '';
      // Set the focus back on the username input field
      usernameInput.focus();
    }
  }
 });


// Event listener for the signup form submit
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
  

const signupFormHandler = async (event) => {
  // Prevent the reload of the page upon form submit
  event.preventDefault();

  const passwordInput = document.querySelector('#password-signup');
  const confirmPasswordInput = document.querySelector('#confirm-password-signup');

  // Stores the user's input from the signup form
  const user_name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Check if any of the required fields is missing
  if ( !user_name || !email || !password || !confirmPassword ) {
    // Display an alert to inform the user
    alert('Please provide all required information'); // Replace this with a modal ******
    return; // Stop signup execution
  }

  // Check if passwords match
  if ( password !== confirmPassword ) {
    alert('Passwords do not match. Please re-enter.'); // Replace this with a modal ******
    // Clear the password input fields
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    // Set the focus back on the first password input field 
    passwordInput.focus();
    return; // Stop signup execution
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


