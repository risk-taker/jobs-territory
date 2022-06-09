import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation/Navigation';
import Home from './pages/home/Home';
import Products from './components/products/Products';
import Cart from './pages/cart/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Account from './pages/account/Account';
import { useEffect } from 'react';
import { getProducts } from './http';
import { useDispatch } from 'react-redux';
import { addProducts } from './store/productSlice';


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const products = async () => {
            const { data } = await getProducts()
            dispatch(addProducts(data));
        }
        products()
    }, [])
    return (
        <>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/products' element={<Products />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/account' element={<Account />}></Route>
            </Routes>
        </>
    );
}


export default App;
