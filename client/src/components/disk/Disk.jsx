import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, pushFile, uploadFile } from '../../actions/file';
import { addFile, popupState, remNav, setCurrentDir } from '../../reducers/fileSlice';
import NavButton from '../../utils/nav-button/NavButton';
import LoadFile from '../load-files/LoadFile';
import Popup from '../popup/Popup';
import style from './disk.module.scss'
import FileList from './fileList/FileList'
import File from './fileList/file/File'
import Sort from '../../utils/sort/Sort';
import { FaListUl } from 'react-icons/fa';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { setView } from '../../reducers/settingsSlice';


const Disk = () => {
    const [sort, setSort] = useState('')
    const dispatch = useDispatch()
    const {files, currentDir, popupDisplay, dirStack, dirCount } = useSelector((state) => state.file)

    const stack = dirStack.map((el, id )=> 
    <NavButton {...el} key={el._id} dirCount={dirCount} id={id}
    />)
/////////
    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
        console.log('useEffect', sort);
    }, [currentDir, sort]);

    const openPopup = () => {
        dispatch(popupState(true))
    }

    const closePopup = () => {
        dispatch(popupState(false))
    }

    const createDir = (dirName, currentDir) => {
        dispatch(pushFile(dirName, currentDir))
    }


    const back = () => {
        if (dirStack.length > 1) {
            const popNav = dirStack[dirStack.length - 2]._id
            dispatch(remNav())
            dispatch(getFiles(popNav))
            dispatch(setCurrentDir(popNav))
        } 
    }

    const uploads = (e) => {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const setGridView = () => {
        dispatch(setView('grid'))
        localStorage.setItem('setView','grid')
    }

    const setListView = () => {
        dispatch(setView('list'))
        localStorage.setItem('setView','list')
    }

    return (
        <div className={style.disk}>
            <div className={style.nav__wrap}>
                {dirStack < 1 ? <NavButton name={'My disk'}/> : stack}
            </div>
            <div className={style.btn__block}>
                <div className={style.btn__left}>
                    <button onClick={back}>Back</button>
                    <button onClick={openPopup}>New folder</button>
                    <LoadFile action={uploads}/>
                </div>
                <div className={style.btn__right}>
                    <Sort setSort={setSort}/>
                    <button className={style.btn} 
                    onClick={setListView}>
                        <FaListUl size={'1.2em'}/>
                    </button>

                    <button className={style.btn}
                    onClick={setGridView}>
                        <BsFillGrid3X3GapFill size={'1.2em'}/>
                    </button>
                </div>
            </div>
            <FileList/>
            <Popup 
                popupDisplay={popupDisplay}
                cansel={closePopup}
                create={createDir}
                currentDir={currentDir}
            />
        </div>
    );
}

export default Disk;
