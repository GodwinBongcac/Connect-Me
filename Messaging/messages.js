const messageForm = document.querySelector('#message-form');
const messageList = document.querySelector('#message-list');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const content = messageForm.querySelector('#message-content').value;

  // Send a request to the server to create a new message
  fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipientId: recipient.id,
      content
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Display the new message on the page
      const newMessage = document.createElement('div');
      newMessage.innerHTML = `
        <p>${data.message.content}</p>
        <p>From ${data.message.sender.username}</p>
      `;
      messageList.appendChild(newMessage);

      // Clear the form
      messageForm.reset();
    } else {
      // Display an error message
      alert(data.message);
    }
  });
});