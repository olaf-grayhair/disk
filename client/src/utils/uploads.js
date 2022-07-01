import dir from '../assets/images/dir.png'
import img from '../assets/images/img.png'
import txt from '../assets/images/txt.png'
import rar from '../assets/images/rar.png'
import mp4 from '../assets/images/mp4.png'


export const uploads = (item) => {
    let file = item.toLowerCase()
    if(file === 'png' || file === 'jpg') {
        return img
    }
    if(file === 'txt') {
        return txt
    }
    if(file === 'zip') {
        return rar
    }
    if(file === 'mp4') {
        return mp4
    }
    else{
        return dir
    }
}