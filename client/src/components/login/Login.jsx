import {React, useState} from 'react';
import { useDispatch } from 'react-redux'

import { login } from '../../actions/user';
import { setFiles } from '../../reducers/fileSlice';
import Button from '../../UI/button/Button';
import Input from '../../utils/input/Input';
import style from './login.module.scss'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const send = () => {
        dispatch(login(email, password))
        dispatch(setFiles())
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
                placeholder={'enter password...'}
                />

                <Button name={'Login'} 
                action={send}
                />
            </div>
        </div>
    );
}

export default Login;
