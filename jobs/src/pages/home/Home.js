import React from 'react'
import Products from '../../components/products/Products';
import styles from './Home.module.css';

const Home = () => {
    return (
        <>
            <div className={`${styles.tired}`}>
                <div className={`${styles.tiredMargin}`}>
                    <h1 className={`${styles.coffeeMargin}`}>
                        <b>
                            <span className={styles.coffee}>Shopping </span>
                        </b>
                        <br />
                        is better than Psychiatrist.
                    </h1>
                    <p className={`${styles.text}`}>
                        “If shopping doesn't make <br /> you <b>Happy</b> are in the, wrong <br />{" "}
                        shop”
                    </p>
                </div>
                <div className={`${styles.hero}`}>
                    <img src="/images/hero.png" alt="hero" />
                </div>
            </div>
            <Products />
        </>
    )
}

export default Home;