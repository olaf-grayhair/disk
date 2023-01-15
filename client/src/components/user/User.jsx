import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { sizeOfFiles } from '../../utils/sizeOfFiles';
import style from './user.module.scss'
import UserInfo from './user-info/UserInfo';
import Button from '../../UI/button/Button';
import { getAllFiles } from '../../actions/file';
import UserFiles from './user-files/UserFiles';
import Circle from './circle/Circle';
import { uploads } from '../../utils/uploads';
import Loader from '../../utils/loader/Loader'

const User = () => {
    const history = useNavigate()
    const returnPrev = () => {
        history(-1)
    }
    const { diskSpace, usedSpace, email, avatar, name } = useSelector(state => state.user.user)

    const value = Math.round((usedSpace / diskSpace) * 100)
    //////disk info
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFiles())
    }, []);

    const files = useSelector(state => state.settings.allFiles)

    // if (files.length === 0) {
    //     console.log('files');
    //     return <Loader />
    // }

    let array = [...files]

    const searchFile = (text) => {
        return array.filter(file => file.typeOffile.includes(text))
    }

    const fileSize = (array) => {
        return array.reduce((a, b) => a + b.size, 0)

    }

    const text = searchFile('text')
    const archive = searchFile('archive')
    const media = searchFile('media')
    const image = searchFile('image')

    return (
        <div className={style.user}>
            <Button
                name={'back'}
                action={returnPrev}
            />
            <div className={style.user__info}>
                <UserInfo
                    avatar={avatar}
                    email={email}
                    name={name}
                />
                <div className={style.user__disk}>
                    <div className={style.circle__block}>
                        <Circle value={value} text={'Used space'} size={sizeOfFiles(usedSpace)} />

                        <Circle value={100 - value} text={'Free space'}
                            size={sizeOfFiles(diskSpace - usedSpace)} />
                    </div>
                    {files.length === 0 
                    ? <h2>You don't have any dirs or files!</h2> 
                    : <div className={style.block}>
                        {image.length > 0 && <UserFiles
                            file={image}
                            text={"images"}
                            img={uploads(image[0].type)}
                            size={sizeOfFiles(fileSize(image))}
                        />}

                        {text.length > 0 && <UserFiles
                            file={text}
                            text={"documents"}
                            img={uploads(text[0].type)}
                            size={sizeOfFiles(fileSize(text))}
                        />}

                        {archive.length > 0 && <UserFiles
                            file={archive}
                            text={"archive"}
                            img={uploads(archive[0].type)}
                            size={sizeOfFiles(fileSize(archive))}
                        />}

                        {media.length > 0 && <UserFiles
                            file={media}
                            text={"media"}
                            img={uploads(media[0].type)}
                            size={sizeOfFiles(fileSize(media))}
                        />}

                    </div>}
                    
                    {/* <div className={style.block}>
                        {image.length > 0 && <UserFiles
                            file={image}
                            text={"images"}
                            img={uploads(image[0].type)}
                            size={sizeOfFiles(fileSize(image))}
                        />}

                        {text.length > 0 && <UserFiles
                            file={text}
                            text={"documents"}
                            img={uploads(text[0].type)}
                            size={sizeOfFiles(fileSize(text))}
                        />}

                        {archive.length > 0 && <UserFiles
                            file={archive}
                            text={"archive"}
                            img={uploads(archive[0].type)}
                            size={sizeOfFiles(fileSize(archive))}
                        />}

                        {media.length > 0 && <UserFiles
                            file={media}
                            text={"media"}
                            img={uploads(media[0].type)}
                            size={sizeOfFiles(fileSize(media))}
                        />}

                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default User;
