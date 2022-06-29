import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dowloadFile, uploadFile } from '../../../actions/file';
import style from './filelist.module.scss'
import File from './file/File'
import ContextMenu from '../../../utils/contextmenu/ContextMenu';
import { showMenu } from '../../../reducers/userSlice';
import EmptyFolder from '../../../utils/empty-folder/EmptyFolder';
import Loader from '../../../utils/loader/Loader';


const FileList = () => {
    const [dragEnter, setDragEnter] = useState(false);
    const dispatch = useDispatch()
    const {files, currentDir} = useSelector((state) => state.file)
    const showContextMenu = useSelector((state) => state.user.showContextMenu)
    const loader = useSelector(state => state.settings.loader)
    const view = useSelector(state => state.settings.view)

    function dragEnterHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
        console.log(e.target);
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }
    /////
    const [points, setPoints] = useState({ x: 0, y: 0 })

    const openMenu = (e) => {
        dispatch(showMenu(true))
        setPoints({ x: e.pageX, y: e.pageY })
    }

    const closeMenu = (e) => {
        e.stopPropagation()
        // dowloadFile()
        console.log('close');
      }

    const directories = files.map(dir => <File {...dir} key={dir._id} 
        openMenu={openMenu} onClick={e => e.stopPropagation()}

    />)
    const content = directories.length >= 1 ? directories : <EmptyFolder/>


    if(view === 'list') {
        return (
            <div className={style.filelist}>
                {!dragEnter
                    ? <div className={style.list}
                        onDragEnter={dragEnterHandler}
                        onDragLeave={dragLeaveHandler}
                        onDragOver={dragEnterHandler}>
                        <div className={style.header}>
                            <span>name</span>
                            <span>date</span>
                            <span>format</span>
                            <span>size</span>
                        </div>
                        {loader ? <Loader/> : content}
                    </div>
    
                    : <div className={style.dragDrop}
                        onDragEnter={dragEnterHandler}
                        onDragLeave={dragLeaveHandler}
                        onDragOver={dragEnterHandler}
                        onDrop={dropHandler}>
                        <span>Upload files...</span>
                    </div>
                }
                {showContextMenu && <ContextMenu top={points.y} left={points.x}/>}
            </div>
        );
    }


    if(view === 'grid') {
        return (
            <div className={style.filelist}>
                {!dragEnter
                    ? <div className={style.grid}
                        onDragEnter={dragEnterHandler}
                        onDragLeave={dragLeaveHandler}
                        onDragOver={dragEnterHandler}>
                        {loader ? <Loader/> : content}
                    </div>
    
                    : <div className={style.dragDrop}
                        onDragEnter={dragEnterHandler}
                        onDragLeave={dragLeaveHandler}
                        onDragOver={dragEnterHandler}
                        onDrop={dropHandler}>
                        <span>Upload files...</span>
                    </div>
                }
                {showContextMenu && <ContextMenu top={points.y} left={points.x}/>}
            </div>
        );
    }
}

export default FileList;
