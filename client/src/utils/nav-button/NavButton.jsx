import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/file';
import { clearNav, remNav, setCurrentDir, backNav } from '../../reducers/fileSlice';
import style from './navbutton.module.scss'

const NavButton = ({name, _id, dirNum, id}) => {
    const dispatch = useDispatch()

    const { currentDir, dirStack } = useSelector((state) => state.file)
    const user = useSelector((state) => state.user.user)

    const moveBack = () => {
        if(_id === currentDir) {
            return
        }
        if(_id === null) {
            dispatch(clearNav())
            dispatch(getFiles(user.id))
            dispatch(setCurrentDir(null))
        }else {
            dispatch(backNav(_id))
            dispatch(getFiles(_id))
            dispatch(setCurrentDir(_id))
        }
    }

    return (
        <div className={style.navbutton} onClick={moveBack}>
            <div className={style.navigate}>
                {name}
            </div>
            <div  
            className={dirNum !== id ? style.arrow : style.active}></div>
        </div>
    );
}

export default NavButton;
