const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    // const id = event.target.getAttribute('data-id');
    // split path name to get routing parameter - post id
    const id = window.location.pathname.split('/')[2];
    console.log(id)
    // console.log(id)
    // document.location.replace(`/api/posts/update/${id}`)

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .getElementById('post-del')
  .addEventListener('click', delButtonHandler);
