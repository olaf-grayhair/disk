import React from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { sizeOfFiles } from '../../utils/sizeOfFiles';
import style from './user.module.scss'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const User = () => {
    const history = useNavigate()
    const returnPrev = () => {
      history(-1)
    }
    const {diskSpace, usedSpace, email} = useSelector(state => state.user.user)

    const value = Math.round((usedSpace / diskSpace) * 100)

    
    return (
        <div className={style.user}>
            <h2>User {email}</h2>
            <div className={style.wrap}>
                <div className={style.circul__block}>
                    <div className={style.circul}>
                        <CircularProgressbar value={value} text={`${value}%`}/>
                    </div>
                    <span>Used space  
                        <b className={style.bold}> {sizeOfFiles(usedSpace)}</b>
                    </span>
                </div>

                <div className={style.circul__block}>
                    <div className={style.circul}>
                        <CircularProgressbar value={100 - value} text={`${100 - value}%`}/>
                    </div>
                    <span>Free space  
                        <b className={style.bold}> {sizeOfFiles(diskSpace -usedSpace)}</b>
                    </span>
                </div>
                <div className={style.circul__block}>
                    <div className={style.circul}>
                        <CircularProgressbar value={100} text={`${100}%`}/>
                    </div>
                    <span>Total space  
                        <b className={style.bold}> {sizeOfFiles(diskSpace)}</b>
                    </span>
                </div>
            </div>
            <button onClick={returnPrev}>BACK</button>
        </div>
    );
}

export default User;
