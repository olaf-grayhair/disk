import {React, useEffect} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import style from './app.module.scss'
import Navbar from "./navbar/Navbar";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";
import User from "./user/User";
import Home from '../pages/home/Home'
import { showMenu } from "../reducers/userSlice";


function App() {
  const {isAuth, user} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const showContextMenu = useSelector((state) => state.user.showContextMenu)
  
  const closeMenu = (e) => {
    dispatch(showMenu(false))
    console.log(e.target.value, 'APP');
  }

  useEffect(() => {
    dispatch(auth())
  }, []);
  
  return (
    <BrowserRouter>
      <div className={style.app} onClick={closeMenu}>
        <Navbar/>
        {!isAuth ?
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/registration' element={<Registration/>} />
            <Route path='/login' element={<Login/>} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>//need to find out
          :
          <Routes>
            <Route exact path="/" element={<Disk/>} />
            <Route path={user.email} element={<User/>} />
            <Route path="/login" element={<Navigate replace to="/" />} />
            {/* <Route path={user.email} element={<Navigate replace to="/" />} /> */}
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
