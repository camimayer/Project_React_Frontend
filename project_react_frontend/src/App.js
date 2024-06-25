import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoutes';
import RecipeList from './pages/RecipeList'

function App() {
  return (  
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<PrivateRoute><RecipeList /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
