import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../apiService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUsernameError('');
        setPasswordError('');

        let hasError = false;

        if (username.trim() === '') {
            setUsernameError('Name is required!');
            hasError = true;
        }

        if (password.trim() === '') {
            setPasswordError('Password is required!');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const data = await login(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.result.id);
            toast.success('Connecté avec succès !', {
                onClose: () => navigate('/')
            });
        } catch (error) {
            toast.error(error.message || 'Échec de la connexion');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Connexion</h2>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    {usernameError && <span className="error">{usernameError}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {passwordError && <span className="error">{passwordError}</span>}
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
