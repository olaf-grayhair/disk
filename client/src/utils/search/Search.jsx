import {React, useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchFile } from '../../actions/file';
import style from './search.module.scss'

const Search = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch()
    const serchValue = (e) => {
        setSearch(e.target.value)
        dispatch(searchFile(search))
    }
    return (
        <div className={style.search}>
            <input type="text" 
                   placeholder='Search in drive'
                   value={search}
                   onChange={serchValue}
            />
        </div>
    );
}

export default Search;
