const commentForm = document.querySelector('#comment-form');
const commentsContainer = document.querySelector('#comments');

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const content = commentForm.querySelector('#comment-content').value;

  // Send a request to the server to create a new comment
  fetch('/api/posts/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      postId: post.id,
      content
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Display the new comment on the page
      const newComment = document.createElement('div');
      newComment.innerHTML = `
        <p>${data.comment.content}</p>
        <p>By ${data.comment.user.username}</p>
      `;
      commentsContainer.appendChild(newComment);

      // Clear the form
      commentForm.reset();
    } else {
      // Display an error message
      alert(data.message);
    }
  });
});