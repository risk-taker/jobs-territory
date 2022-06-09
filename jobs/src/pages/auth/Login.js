import React, { useState } from 'react'
import styles from './Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { loggin } from '../../http';
import { useDispatch } from 'react-redux';
import { add } from '../../store/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async () => {
        const { data } = await loggin({
            email,
            password,
        })
        dispatch(add(data));
        navigate('/');
    }
    return (
        <div className={`${styles.container} container`}>
            <div>
                <label htmlFor="email">Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="myemail" id="email" />
                </label>
                <label htmlFor="password">Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="mypassword" id="password" />
                </label>
                <button className={`${styles.btn}`} onClick={submit}>Submit</button>
                <h6 className={`${styles.btn}`}>
                    <Link to='/register'>Create Account</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login