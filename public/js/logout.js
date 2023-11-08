const logout = async () => {
    // Apit call to logout the user
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
  };
  
  // Event listener for the logout button
  document
  .querySelector('#logout')
  .addEventListener('click', logout);
  