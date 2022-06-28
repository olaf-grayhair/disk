import {React, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { login, registration } from '../../actions/user';
import { increment } from '../../reducers/userSlice';
import Input from '../../utils/input/Input';
import style from './login.module.scss'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const state = useSelector((state) => state.user.user)


    console.log(state, 'LOGIN state');
    const send = () => {
        dispatch(login(email, password))
    }
    
    const www = () => {
        dispatch(increment())
    }

    return (
        <div className={style.login}>
            <div className={style.block}>
                <h2>Login</h2>
                <Input value={email} 
                action={setEmail} 
                placeholder={'enter email...'}/>

                <Input value={password} 
                action={setPassword}
                placeholder={'enter password...'}/>

                <button onClick={send}>Login</button>
                <button onClick={www}>PLUS</button>
            </div>
        </div>
    );
}

export default Login;
