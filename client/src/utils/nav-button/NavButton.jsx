import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/file';
import { clearNav, remNav, setCurrentDir } from '../../reducers/fileSlice';
import style from './navbutton.module.scss'

const NavButton = ({name, _id, action, dirNum, id}) => {
    const dispatch = useDispatch()

    const { currentDir, dirStack, dirCount } = useSelector((state) => state.file)

    const handleClick = () => {
        const minusTwo = dirStack[dirStack.length - 2]._id
        const minusOne = dirStack[dirStack.length - 1]._id

        console.log(dirNum, dirCount);
        if(_id === currentDir) {
            return
        }
        if(_id === null) {
            dispatch(clearNav())
            dispatch(getFiles(minusTwo))
            dispatch(setCurrentDir(null))
        }else {
            dispatch(remNav())
            dispatch(getFiles(minusTwo))
            dispatch(setCurrentDir(minusTwo))
        }
    }

    return (
        <div className={style.navbutton} onClick={handleClick}>
            <div className={style.navigate}>
                {name}
            </div>
            <div  
            className={dirNum !== id ? style.arrow : style.active}></div>
        </div>
    );
}

export default NavButton;
