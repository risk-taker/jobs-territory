import React from 'react'
import styles from './Account.module.css';
import { useSelector } from 'react-redux';
const Account = () => {
    const { user } = useSelector((state) => state.user);
    // console.log(user);
    return (
        <>
            {
                !user ?
                    <h1 className="container">Please login first</h1>
                    :
                    <div className={styles.cardWrapper}>
                        <div className={styles.card} >
                            <h1><span>Name:</span>{user.name}</h1>
                            <h1><span>Email:</span> {user.email}</h1>
                            <h1><span>Account Id:</span> {user._id}</h1>
                        </div>
                    </div>
            }
        </>
    )
}

export default Account