const registrationForm = document.querySelector('#registration-form');

registrationForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const username = registrationForm.querySelector('#username').value;
  const email = registrationForm.querySelector('#email').value;
  const password = registrationForm.querySelector('#password').value;

  registerUser(username, email, password);
}

function registerUser(username, email, password) {
  fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
 .then(response => {
    if (!response.ok) {
      throw new Error('Invalid response from server');
    }
    return response.json();
  })
 .then(data => {
    if (data.success) {
      // Redirect the user to the login page
      window.location.href = '/login';
    } else {
      // Display an error message
      alert(data.message);
    }
  })
 .catch(error => {
    // Handle errors here
    console.error(error);
  });
}