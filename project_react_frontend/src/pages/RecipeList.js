import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeList.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchRecipes, deleteRecipe } from '../apiService';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');

    const loadRecipes = async () => {
        try {
            const data = await fetchRecipes();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const handleDelete = async (id) => {
        try {
            const data = await deleteRecipe(id);
            toast.success(data.message);
            loadRecipes();
        } catch (error) {
            console.error('Error deleting recipe:', error);
            toast.error(error.message);
        }
    };

    const filteredRecipes = recipes.filter(recipe => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            recipe.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            recipe.ingredients.toLowerCase().includes(lowerCaseSearchTerm) ||
            recipe.category.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    return (
        <div className="home-container">
            <input
                type="text"
                placeholder="Rechercher des recettes..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="recipes-container">
                {filteredRecipes.map(recipe => (
                    <div className="recipe-card" key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)}>
                        <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
                        <div className="recipe-details">
                            <h3>
                                {recipe.name}
                                {recipe.userID == userId && <span className="star">★</span>}
                            </h3>
                            <p>{recipe.category}</p>
                            <button className="modify-button" onClick={(e) => { e.stopPropagation(); navigate(`/edit/${recipe.id}`); }}>Modifier</button>
                            <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(recipe.id); }}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
