import React from 'react'
import styles from './Products.module.css';
import Product from '../product/Product';
import { useSelector } from 'react-redux';

const Products = () => {
    // const [products, setProducts] = useState([]);
    const products = useSelector((state) => state.Product)
    console.log(products);
    return (
        <>
            <div className={`container`}>
                <h1>BEST SELLING PRODUCTS</h1>

                <div className={`${styles.gridContainer}`}>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    {/* {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))} */}
                </div>
            </div>
        </>
    );
}

export default Products