import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import { signUp } from '../api';

function SignUp() {
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
            await signUp(username, password);
            toast.success('Inscription réussie !', {
                onClose: () => navigate('/login')
            });
        } catch (error) {
            toast.error(error.message || 'Échec de l\'inscription');
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>S'inscrire</h2>
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
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default SignUp;
