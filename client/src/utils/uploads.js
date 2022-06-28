import dir from '../assets/images/dir.png'
import img from '../assets/images/img.png'
import txt from '../assets/images/txt.png'
import rar from '../assets/images/rar.png'
import mp4 from '../assets/images/mp4.png'


export const uploads = () => {
    if(splitFile === 'png' || splitFile === 'jpg') {
        return img
    }
    if(splitFile === 'txt') {
        return txt
    }
    if(splitFile === 'zip') {
        return rar
    }
    if(splitFile === 'mp4') {
        return mp4
    }
    else{
        return dir
    }
}