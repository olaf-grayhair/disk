import {React, useState} from 'react';
import { useDispatch } from 'react-redux';
import { FiDelete } from 'react-icons/fi';
import { searchFile } from '../../actions/file';
import style from './search.module.scss'

const Search = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch()
    
    const serchValue = (e) => {
        setSearch(e.target.value)
        dispatch(searchFile(e.target.value))
    }

    const clear = () => {
        setSearch('')
        dispatch(searchFile(''))
    }

    return (
        <div className={style.search}>
            <input type="text" 
                   placeholder='Search in drive'
                   value={search}
                   onChange={serchValue}
            />
            {search && 
            <button className={style.clear}
                onClick={clear}>
                <FiDelete size={'1.3em'}/>
            </button>}
            
        </div>
    );
}

export default Search;
