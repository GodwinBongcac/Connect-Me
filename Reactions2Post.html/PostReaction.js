const postReactions = document.querySelectorAll('#post-reactions button');

postReactions.forEach((reaction) => {
  reaction.addEventListener('click', () => {
    const reactionType = reaction.dataset.reaction;

    // Send a request to the server to add a reaction to the post
    fetch('/api/posts/reactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: post.id,
        reactionType
      })
    })
   .then(response => response.json())
   .then(data => {
      if (data.success) {
        updateReactionCount(reactionType, data.reactionCount);
      } else {
        displayErrorMessage(data.message);
      }
    })
   .catch(error => {
      console.error('Error:', error);
      displayErrorMessage('An error occurred while processing your request.');
    });
  });
});

function updateReactionCount(reactionType, reactionCount) {
  post.reactionCount[reactionType] = reactionCount;
  const reactionCountElement = reaction.nextElementSibling;
  reactionCountElement.textContent = `Reaction count: ${reactionCount}`;
}

function displayErrorMessage(message) {
  alert(message);
}