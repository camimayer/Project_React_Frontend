import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoutes';
import RecipeList from './pages/RecipeList'
import AddRecipe from './pages/AddRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetail from './pages/RecipeDetail'


function App() {
  return (  
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<PrivateRoute><RecipeList /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditRecipe /></PrivateRoute>} />
        <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetail /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
