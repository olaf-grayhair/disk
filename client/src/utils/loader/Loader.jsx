import {React, CSSProperties } from "react";
import ClockLoader  from "react-spinners/ClockLoader"
import style from './loader.module.scss'

const Loader = () => {

    return (
        <div className={style.loader}>
            <ClockLoader 
                color={"#123abc"}
                size={150} 
                speedMultiplier={1.5}
            />
        </div>

    );
}

export default Loader;
