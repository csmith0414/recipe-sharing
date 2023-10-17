const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#recipe-title').value.trim();
    const ingredients = document.querySelector('#recipe-ingredients').value.trim();
    const instructions = document.querySelector('#recipe-instructions').value.trim();
  
    if (title && ingredients && instructions) {
      const response = await fetch(`/api/userRecipes`, {
        method: 'POST',
        body: JSON.stringify({ title, ingredients, instructions }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("profile.js " + response);
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create profile');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    console.log(event)
    if (event.target.hasAttribute('id')) {

      const id = event.target.getAttribute('id');
  
      const response = await fetch(`/api/userRecipes/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.recipeList')
    .addEventListener('click', delButtonHandler);
  