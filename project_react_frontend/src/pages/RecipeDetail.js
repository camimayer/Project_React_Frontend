import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RecipeDetail.css';
import { fetchRecipeById, fetchUserById } from '../apiService';

function RecipeCard() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadRecipeAndUser = async () => {
      try {
        const recipeData = await fetchRecipeById(id);
        setRecipe(recipeData);
        const userData = await fetchUserById(recipeData.userID);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching recipe or user details:', error);
      }
    };

    loadRecipeAndUser();
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
