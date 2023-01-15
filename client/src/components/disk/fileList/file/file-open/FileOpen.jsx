import { React, useState } from 'react';
import { baseURL } from '../../../../../utils/instance';
import style from './fileopen.module.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Audio from '../../../../audio/Audio';
import Image from '../../../../image/Image';

const FileOpen = ({ filePath, setstate, type }) => {
    const file = baseURL + filePath

    const hide = () => {
        setstate(false)
    }

    const typeOfFile = () => {
        if (type === 'pdf') {
            return <DocViewer documents={[
                { uri: file }, // Local File
            ]} pluginRenderers={DocViewerRenderers} />
        }
        if (type === 'jpg' || type === 'png' || type === 'gif' || type === 'jpeg') {
            return <Image file={file}/>
        }
        if (type === 'mp3' || type === 'ape' || type === 'avi') {
            return <Audio file={file} />
        }
    }

    return (
        <div className={style.inactive}
            onClick={hide}>
            <div
                className={style.container}
                onClick={e => e.stopPropagation()} >
                <div onClick={hide}
                    className={style.close}>
                    <AiOutlineCloseCircle size={40} />
                </div>
                {typeOfFile()}    
            </div>

        </div>
    );
}

export default FileOpen;
