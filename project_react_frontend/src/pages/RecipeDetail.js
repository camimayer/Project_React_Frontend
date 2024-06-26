import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Detail.css';

function RecipeCard() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3008/api/recipe/${id}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setRecipe(data);
      fetch('http://localhost:3008/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id: data.userID })
      })
      .then(response => response.json())
      .then(userData => setUser(userData))
      .catch(error => console.error('Error fetching user details:', error));
    })
    .catch(error => console.error('Error fetching recipe details:', error));
  }, [id]);

  if (!recipe || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.title} />
      <div className="recipe-details">
        <div className="recipe-category"><span>Category:</span> {recipe.category}</div>
        <div className="recipe-ingredients"><span>Ingredients:</span> {recipe.ingredients}</div>
        <div className="recipe-instructions"><span>Instructions:</span> {recipe.instructions}</div>
        <div className="recipe-instructions"><span>Created by:</span> {user.username}</div>
      </div>
      <div className="recipe-title">{recipe.title}</div>
    </div>
  );
}

export default RecipeCard;
