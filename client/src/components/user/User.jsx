import {React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { sizeOfFiles } from '../../utils/sizeOfFiles';
import style from './user.module.scss'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UserInfo from './user-info/UserInfo';
import Button from '../../UI/button/Button';
import { getAllFiles } from '../../actions/file';
import UserFiles from './user-files/UserFiles';

const User = () => {
    const history = useNavigate()
    const returnPrev = () => {
      history(-1)
    }
    const {diskSpace, usedSpace, email, avatar, name} = useSelector(state => state.user.user)

    const value = Math.round((usedSpace / diskSpace) * 100)

    const dispatch = useDispatch()
    const files = useSelector(state => state.settings.allFiles)

    let array = [...files]

    const searchFile = (text) => {
        return array.filter(file => file.typeOffile.includes(text))
    }

    const fileSize = (array) => {
        return array.reduce((a, b) => a + b.size, 0)
         
     }

    const text = searchFile('text')
    const image = searchFile('image')
    const archive = searchFile('archive')
    const media = searchFile('media')



    let a = fileSize(image)
    console.log(a);


    useEffect(() => {
        dispatch(getAllFiles())
    }, []);
    
    return (
        <div className={style.user}>
            <Button
            name={'back'}
            action={returnPrev}
            />
            <div className={style.user__wrap}>
                <UserInfo 
                 avatar={avatar}
                 email={email}
                 name={name}
                 />
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
                <UserFiles file={image}/>
            </div>
        </div>
    );
}

export default User;
