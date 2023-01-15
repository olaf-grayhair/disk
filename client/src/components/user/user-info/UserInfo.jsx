import React from 'react';
import { useDispatch } from 'react-redux';
import style from './userinfo.module.scss'

import { deleteAvatar, uploadAvatar } from '../../../actions/user';
import userImg from '../../../assets/images/user.png'
import { baseURL } from '../../../utils/instance';
import Button from '../../../UI/button/Button';


const UserInfo = ({ avatar, id, email, name }) => {
    const dispatch = useDispatch()

    const addAvatar = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    const delAvatar = () => {
        if (avatar !== undefined) {
            dispatch(deleteAvatar(id))
        }
    }

    return (
        <div className={style.userinfo}>
            <div className={style.img}>
                <img
                    src={avatar ? baseURL + avatar : userImg} alt={name} />
            </div>
            <div className={style.avatar}>


                <div className={style.buttons}>
                    <label htmlFor='inputFile'>Select file</label>
                    <input
                        id='inputFile'
                        type="file"
                        accept='image/*'
                        onChange={addAvatar} />
                    <Button name='delete' action={delAvatar} />
                </div>

            </div>
            <span>Login <b>{email}</b></span>
        </div>
    );
}

export default UserInfo;
