const updateButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      
      const id = window.location.pathname.split('/')[2];
      console.log(id)
      document.location.replace(`/api/posts/update/${id}`)
    } else {
      alert('Cannot update post');
    };
  }

  document
  .querySelector('.update-post-form')
  .addEventListener('click', updateButtonHandler);