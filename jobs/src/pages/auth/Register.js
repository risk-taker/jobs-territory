import React, { useState } from 'react'
import styles from './Auth.module.css';
import { Link } from 'react-router-dom';
import { register } from '../../http/index';
// const {useNavigate} from  'useNavigate';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { add } from '../../store/userSlice';

const Register = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeat_password] = useState('');

    const submit = async () => {
        const { data } = await register({
            name,
            email,
            password,
            repeat_password
        })
        dispatch(add(data));
        navigate('/');
    }
    return (
        <div className={`${styles.container} container`}>
            <div>
                <label htmlFor="name">Name:
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" />
                </label>
                <label htmlFor="email">Email:
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
                </label>
                <label htmlFor="password">Password:
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
                </label>
                <label htmlFor="confirmPassword">
                    Confirm Password:
                    <input value={repeat_password} onChange={(e) => setRepeat_password(e.target.value)} type="password" name="repeat_password" id="confirmPassword" />
                </label>
                <button className={`${styles.btn}`} onClick={submit}>Submit</button>
                <h6 className={`${styles.btn}`}>
                    <Link to='/login'>Already register?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Register