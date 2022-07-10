import React from 'react';
import { useDispatch } from 'react-redux';
import style from './userinfo.module.scss'

import { deleteAvatar, uploadAvatar } from '../../../actions/user';
import { API_URL } from '../../../utils/urls';
import userImg from '../../../assets/images/user.png'


const UserInfo = ({avatar, id, email, name}) => {
    const dispatch = useDispatch()

    const addAvatar = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    const delAvatar = () => {
        dispatch(deleteAvatar(id))
    }

    return (
        <div className={style.userinfo}>
            <div className={style.img}>
                <img 
                src={avatar? API_URL + avatar : userImg} alt={name} />
            </div>
            <div className={style.avatar}>
                <label htmlFor='inputFile'>Select file</label>
                <input 
                 id='inputFile'
                 type="file" 
                 accept='image/*'
                 onChange={addAvatar}/>
                <button onClick={delAvatar}>Delete avatar</button>
            </div>
            <span>Login <b>{email}</b></span>
        </div>
    );
}

export default UserInfo;
