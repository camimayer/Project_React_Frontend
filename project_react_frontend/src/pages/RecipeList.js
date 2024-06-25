import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeList.css';

const initialRecipes = [
    {
        id: 1,
        title: "Pizza Margherita",
        description: "A classic Italian pizza with fresh mozzarella and basil.",
        image: "https://via.placeholder.com/300?text=Pizza+Margherita"
    },
    {
        id: 2,
        title: "Chocolate Cake",
        description: "A rich and moist chocolate cake perfect for dessert.",
        image: "https://via.placeholder.com/300?text=Chocolate+Cake"
    },
    {
        id: 3,
        title: "Caesar Salad",
        description: "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
        image: "https://via.placeholder.com/300?text=Caesar+Salad"
    },
    {
        id: 4,
        title: "Spaghetti Carbonara",
        description: "A creamy pasta dish with pancetta, eggs, and Parmesan cheese.",
        image: "https://via.placeholder.com/300?text=Spaghetti+Carbonara"
    },
    {
        id: 5,
        title: "Tiramisu",
        description: "A popular Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.",
        image: "https://via.placeholder.com/300?text=Tiramisu"
    },
    {
        id: 6,
        title: "Grilled Cheese Sandwich",
        description: "A classic sandwich with melted cheese between two slices of grilled bread.",
        image: "https://via.placeholder.com/300?text=Grilled+Cheese+Sandwich"
    },
    {
        id: 7,
        title: "Beef Tacos",
        description: "Soft tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
        image: "https://via.placeholder.com/300?text=Beef+Tacos"
    },
    {
        id: 8,
        title: "Chicken Curry",
        description: "A flavorful curry with tender chicken pieces and aromatic spices.",
        image: "https://via.placeholder.com/300?text=Chicken+Curry"
    },
    {
        id: 9,
        title: "Vegetable Stir Fry",
        description: "A quick and healthy dish with mixed vegetables and a savory sauce.",
        image: "https://via.placeholder.com/300?text=Vegetable+Stir+Fry"
    },
    {
        id: 10,
        title: "Lemonade",
        description: "A refreshing drink made with freshly squeezed lemons, water, and sugar.",
        image: "https://via.placeholder.com/300?text=Lemonade"
    }
];

const RecipeList = () => {
    const [recipes, setRecipes] = useState(initialRecipes);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3008/api/recipes', {
            headers: {
                'authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setRecipes(data))
        .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:3008/api/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(() => {
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        })
        .catch(error => console.error('Error deleting recipe:', error));
    };

    return (
        <div className="home-container">
            <input type="text" placeholder="Rechercher des recettes..." className="search-bar" />
            <div className="recipes-container">
                {recipes.map(recipe => (
                    <div className="recipe-card" key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)}>
                        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                        <div className="recipe-details">
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <button className="modify-button" onClick={(e) => { e.stopPropagation(); }}>Modifier</button>
                            <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(recipe.id); }}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
