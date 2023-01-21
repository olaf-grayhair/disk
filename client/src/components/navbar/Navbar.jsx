import { React, useState } from 'react';
import style from './navbar.module.scss'
import logo from '../../assets/images/cloud-logo.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userSlice';
import Search from '../../utils/search/Search';
import userImg from '../../assets/images/user.png'
import { baseURL } from '../../utils/instance';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const { isAuth, user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const exit = () => {
        dispatch(logout())
    }

    return (
        <div className={style.navbar}>
            <Link to='/disk'>
                <img className={style.logo} src={logo} alt="" />
            </Link>
            <div className={style.login}>
                {!isAuth && <Link to='/registration' className={style.text}>Resistration</Link>}
                {!isAuth && <Link to='/login' className={style.text}>Login</Link>}
                {isAuth &&
                    <div className={style.user}>
                        <Search setSearch={setSearch} search={search} />
                        <div className={style.userPanel}>
                            <Link to={user.email} className={style.text}>
                                <img
                                    src={user.avatar ? baseURL + user.avatar : userImg} alt={user.name} />
                            </Link>
                            <span className={style.text} onClick={exit}>Exit</span>
                        </div>

                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;
