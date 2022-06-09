import React from 'react'
import styles from './Product.module.css';

const Product = () => {

    return (
        <div className={`${styles.gridItem}`}>
            <div className={`${styles.gridImage}`}>
                <img
                    className={`${styles.coffeeImage}`}
                    src='/images/l.png'
                    alt="coffee"
                />
            </div>
            <div className={`${styles.flexContainer}`}>
                <h2>
                    <b>Mackbook pro</b>
                </h2>
                <h3 className={`${styles.price}`}>₹96000</h3>
            </div>
            {/* <p className={`${styles.gray}`}>
                {product.desc}
            </p> */}
            <div className={`${styles.btnContainer}`}>
                <button className={`${styles.btn}`} >ADD</button>
                {/* <button className={`${styles.btn}`} onClick={(e) => addToCart(product, e)}>ADD</button> */}
            </div>
        </div>
    );
}

export default Product