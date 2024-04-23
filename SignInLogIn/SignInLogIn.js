const loginForm = document.querySelector('#login-form');

// Validate email input
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password input
function isValidPassword(password) {
  return password.length >= 8;
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const email = loginForm.querySelector('#email').value;
  const password = loginForm.querySelector('#password').value;

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!isValidPassword(password)) {
    alert('Please enter a password with at least 8 characters.');
    return;
  }

  // Send a request to the server to authenticate the user
  fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
 .then(response => {
    if (!response.ok) {
      throw new Error('Invalid email or password.');
    }
    return response.json();
  })
 .then(data => {
    if (data.success) {
      // Store the user's session token in a cookie
      document.cookie = `session_token=${data.token}; path=/`;

      // Redirect the user to the home page
      window.location.href = '/';
    } else {
      // Display an error message
      alert(data.message);
    }
  })
 .catch(error => {
    // Display an error message
    alert(error.message);
  });
}

// Add event listener to form
loginForm.addEventListener('submit', handleSubmit);