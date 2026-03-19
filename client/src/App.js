import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import FoodList from './Pages/FoodList';
import AddFood from './Pages/AddFood';
import EditFood from './Pages/EditFood';
import Profile from './Pages/Profile';
import Error from './Pages/Error';
import { useEffect } from 'react';
import { current } from './JS/Actions/user';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const dispatch = useDispatch()

  useEffect(()=> {
    if (localStorage.getItem("token")) {
      dispatch(current())
    } 
  },[dispatch])



  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listfood" element={<FoodList />} />
        <Route path="/addfood" element={<AddFood />} />
        <Route path="/editfood/:id" element={<EditFood />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
