import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditRecipe.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchRecipeById, updateRecipe } from '../api';

function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    loadRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
    if (value.trim() === '') {
      setErrors({ ...errors, [name]: 'Ce champ est obligatoire' });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (recipe.name.trim() === '') newErrors.name = 'Ce champ est obligatoire';
    if (recipe.ingredients.trim() === '') newErrors.ingredients = 'Ce champ est obligatoire';
    if (recipe.instructions.trim() === '') newErrors.instructions = 'Ce champ est obligatoire';
    if (recipe.category.trim() === '') newErrors.category = 'Ce champ est obligatoire';
    if (recipe.imageUrl.trim() === '') newErrors.imageUrl = 'Ce champ est obligatoire';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const data = await updateRecipe(id, recipe);
      toast.success(data.message || 'Recipe updated successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Error updating recipe');
    }
  };

  return (
    <div className="edit-recipe-container">
      <form className="edit-recipe-form" onSubmit={handleSubmit}>
        <h2>Modifier recette</h2>
        <div>
          <label htmlFor="name">Nom recette</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="ingredients">Ingrédients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
          ></textarea>
          {errors.ingredients && <div className="error-message">{errors.ingredients}</div>}
        </div>
        <div>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
          {errors.instructions && <div className="error-message">{errors.instructions}</div>}
        </div>
        <div>
          <label htmlFor="category">Catégorie</label>
          <input
            type="text"
            id="category"
            name="category"
            value={recipe.category}
            onChange={handleChange}
          />
          {errors.category && <div className="error-message">{errors.category}</div>}
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && <div className="error-message">{errors.imageUrl}</div>}
        </div>
        <button type="submit">Mettre à jour recette</button>
      </form>
    </div>
  );
}

export default RecipeForm;
