import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useSelector } from "react-redux";

const Navigation = () => {
    const { user } = useSelector((state) => state.user);
    const flexContainer = {
        display: "flex",
        alignItem: "center",
        textDecoration: "none",
        backgroundColor: "rgb(15 15 6)",
        color: "rgb(231 242 63)",
        borderRadius: "34px",
        width: "72px",
        justifyContent: "space-between",
        padding: "2px 8px",
    };
    const textDeco = {
        textDecoration: "none",
        color: "#0D0F12",
        fontSize: "larger",
        padding: "0 15px 0 0",
    };
    return (
        <div className={`${styles.navbar} container`}>
            <div>
                <Link style={textDeco} to="/">
                    Home
                </Link>
                <Link style={textDeco} to="products">
                    Products
                </Link>
                <Link style={textDeco} to="account">
                    Account
                </Link>
            </div>
            <Link to="/">
                <img className={styles.logo} src="/images/logo.png" alt="logo" />
            </Link>
            <div className={styles.rightFlex}>
                {user ?
                    <Link style={textDeco} to="register">
                        logout
                    </Link>
                    :
                    // <Link style={textDeco} to="login">
                    //     Login
                    // </Link> === true &&
                    <Link style={textDeco} to="login">
                        Login
                    </Link>
                }

                <Link style={flexContainer} to="cart">
                    <h2 className={`${styles.cartMargin}`}>2</h2>
                    <span>
                        <img
                            className={`${styles.cartImage}`}
                            src="/images/cart.png"
                            alt="cart"
                        />
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;
