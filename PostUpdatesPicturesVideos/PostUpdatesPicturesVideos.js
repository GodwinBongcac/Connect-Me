const postForm = document.querySelector('#post-form');

postForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const content = postForm.querySelector('#content').value;
  const image = postForm.querySelector('#image').files[0];
  const video = postForm.querySelector('#video').files[0];

  // Validate that either image or video is selected, but not both
  if ((image && video) || (!image &&!video)) {
    alert('Please select either an image or a video, but not both.');
    return;
  }

  // Send a request to the server to create a new post
  const formData = new FormData();
  formData.append('content', content);
  if (image) formData.append('image', image);
  if (video) formData.append('video', video);

  fetch('/api/posts', {
    method: 'POST',
    body: formData
  })
 .then(response => {
    if (!response.ok) {
      throw new Error('Error creating post: ' + response.statusText);
    }
    return response.json();
  })
 .then(data => {
    if (data.success) {
      // Display the new post on the page
      const newPost = document.createElement('div');
      newPost.innerHTML = `
        <p>${data.post.content}</p>
        ${data.post.image? `<img src="${data.post.image}" alt="${data.post.content}">` : ''}
        ${data.post.video? `<video src="${data.post.video}" controls></video>` : ''}
      `;
      document.querySelector('#posts').appendChild(newPost);

      // Clear the form
      postForm.reset();
    } else {
      // Display an error message
      alert(data.message);
    }
  })
 .catch(error => {
    console.error(error);
    alert('An error occurred while creating the post. Please try again later.');
  });
});