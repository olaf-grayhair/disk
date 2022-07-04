import {React, useState} from 'react';
import { useDispatch } from 'react-redux';
import { registration } from '../../actions/user';
import Button from '../../UI/button/Button';
import Input from '../../utils/input/Input';
import style from './registration.module.scss'

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const send = () => {
        dispatch(registration(email, password))
    }
    return (
        <div className={style.registration}>
            <div className={style.block}>
                <h2>Registration</h2>
                <Input value={email} 
                action={setEmail} 
                placeholder={'enter email...'}/>

                <Input value={password} 
                action={setPassword}
                placeholder={'enter password...'}/>

                <Button
                name={'Registration'}
                action={send}
                />
            </div>
        </div>
    );
}

export default Registration;
