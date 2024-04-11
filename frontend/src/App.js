import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Home/homePage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AdminDashboard from "./Pages/AdminDashboard/adminDashboard";
import WomenShoes from "./Pages/Shoes/WomenShoes/womenShoes";
import MenShoes from "./Pages/Shoes/menShoes/menShoes";
import Mens from "./Pages/Mens/Mens";
import ProductDetails from "./Pages/ProductDetails/productDetails";
import Cart from "./Pages/Cart/Cart";
import MensTop from "./Pages/Mens/mensTop";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/admin" element={<AdminDashboard/>}/>
                    <Route path="/women Shoes" element={<WomenShoes/>}/>
                    <Route path="/menShoes" element={<MenShoes/>}/>
                    <Route path="mens" element={<Mens/>}/>
                    <Route path="/mensTop" element={<MensTop/>}/>
                    <Route path="/product/:id" element={<ProductDetails/>}/>
                    <Route path="/get-cart" element={<Cart/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;

