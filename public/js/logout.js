const logout = async () => {
  // Ask the user for confirmation
  const userConfirmed = window.confirm("Are you sure you want to log out?");

  // If the user confirms, proceed with the logout
  if (userConfirmed) {
    // Api call to logout the user
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // Redirects to the homepage if the logout was successful
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};
  
  // Event listener for the logout button
  document
  .querySelector('#logout')
  .addEventListener('click', logout);
  