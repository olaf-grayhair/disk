import React from 'react';
import style from './loadfile.module.scss'

const LoadFile = ({action}) => {
    // const uploads = (e) => {
    //     const files = [...e.target.files]
    //     files.forEach(file => )
    //     console.log(files);
    // }
    return (
        <div className={style.loadfile}>
            <label for="myfile" className={style.label}>Upload files</label>
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
