const API_URL = 'http://localhost:3008/api';

export const fetchRecipes = async () => {
    const response = await fetch(`${API_URL}/recipe/`, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) {
        throw new Error('Error fetching recipes');
    }
    return response.json();
};

export const deleteRecipe = async (id) => {
    const response = await fetch(`${API_URL}/recipe/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error deleting recipe');
    }
    return response.json();
};

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data;
};


export const signUp = async (username, password) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Sign up failed');
    }

    return response.json();
};

export const fetchRecipeById = async (id) => {
    const response = await fetch(`${API_URL}/recipe/${id}`, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) {
        throw new Error('Error fetching recipe');
    }
    return response.json();
};

export const updateRecipe = async (id, recipe) => {
    const response = await fetch(`${API_URL}/recipe/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(recipe)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error updating recipe');
    }

    return data;
};

export const fetchUserById = async (id) => {
    const response = await fetch(`${API_URL}/auth/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id })
    });

    if (!response.ok) {
        throw new Error('Error fetching user details');
    }

    return response.json();
};