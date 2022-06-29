import React from 'react';
import style from './loadfile.module.scss'

const LoadFile = ({action}) => {

    return (
        <div className={style.loadfile}>
            <label htmlFor="myfile" className={style.label}>Upload files</label>
            <input type="file" 
                className={style.input} 
                id="myfile" 
                name="myfile" 
                multiple="multiple"
                onChange={action}
                />
        </div>
    );
}

export default LoadFile;
