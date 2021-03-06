
const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const postId = window.location.pathname.split('/')[4];
    // document.location.replace(`/posts/update/${postId}`);

    if (title && content) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace(`/posts/${postId}`);
      } else {
        alert('Failed to update post');
      }
    }
  };

  document
  .querySelector('.update-post-form')
  .addEventListener('submit', updateFormHandler);