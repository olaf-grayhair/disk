import {React, useState, useEffect} from 'react';
import style from './file.module.scss'

import dir from '../../../../assets/images/dir.png'
import img from '../../../../assets/images/img.png'
import txt from '../../../../assets/images/txt.png'
import rar from '../../../../assets/images/rar.png'
import mp4 from '../../../../assets/images/mp4.png'

import { addNav, setCurrentDir } from '../../../../reducers/fileSlice';
import { setContextMenu } from "../../../../reducers/userSlice";

import { useDispatch, useSelector } from 'react-redux';
import ContextMenu from '../../../../utils/contextmenu/ContextMenu';
import { deleteFile, dowloadFile } from '../../../../actions/file';
import {sizeOfFiles} from '../../../../utils/sizeOfFiles.js';


const FileList = ({name, type, size, date,  _id, openMenu, setMenu}) => {
    const dispatch = useDispatch()
    const splitFile = name.split('.', -1).pop()

    const [points, setPoints] = useState({ x: 0, y: 0 })
    const openContextMenu = (e) => {
        e.preventDefault()
        setMenu(_id, name)
        dispatch(setContextMenu(true))
        setPoints({ x: e.pageX, y: e.pageY })
    }
    const changePage = (e) => {
        if(type === 'dir') {
            dispatch(setCurrentDir(_id))
            const pushItem = {name, _id}
            dispatch(addNav(pushItem))
        }
        // else{
        //     setMenu(false)
        //     console.log('else');
        // }

        // if (e.type === "click") {
        //     console.log("Left click");
        //     setMenu(false)
        //     dispatch(setContextMenu(false))
        // } 
    }

    const splited = () => {
        if(splitFile === 'png' || splitFile === 'jpg') {
            return <img src={img} className={style.logo} alt="" />
        }
        if(splitFile === 'txt') {
            return <img src={txt} className={style.logo} alt="" />
        }
        if(splitFile === 'zip') {
            return <img src={rar} className={style.logo} alt="" />
        }
        if(splitFile === 'mp4' || splitFile === 'avi') {
            return <img src={mp4} className={style.logo} alt="" />
        }
        else{
            return <img src={dir} className={style.logo} alt="" />
        }
    }

    console.log(sizeOfFiles(size));
    // const openMenu = (e) => {
    //     if(type !== 'dir') {
    //         e.preventDefault()
    //         // dispatch(setContextMenu(true))
    //         if (e.type === "contextmenu") {
    //             console.log("Right click");
    //             setMenu(!menu)
    //             dispatch(setContextMenu(true))
    //         }
    //         setPoints({ x: e.pageX, y: e.pageY })
    //     }
    //     console.log(menu, 'menu', contextMenu, 'contextMenu');
    // }

    // const closeMenu = (e) => {
    //     console.log(e.type, 'e.type');
    //     setMenu(false)
    //   }
    
    const download = (e) => {
        e.stopPropagation()
        dowloadFile(_id, name)
        console.log(_id);
    }

    const detele = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(_id))
    }

    return (
        <div className={style.file} 
            onClick={changePage}
            // onContextMenu={openContextMenu}
            // onContextMenu={openMenu}
            >
            {splited()}
            <span>{name}</span>
            <span>{date.slice(0, 10)}</span>
            <span>{type}</span>
            <span>{sizeOfFiles(size)}</span>
            {/* <button onClick={download}>download</button> */}
            <button onClick={detele}>Delete</button>
        </div>
    );
}

export default FileList;
