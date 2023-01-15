import dir from '../assets/images/dir.png'
import img from '../assets/images/img.png'
import txt from '../assets/images/txt.png'
import rar from '../assets/images/rar.png'
import mp4 from '../assets/images/mp4.png'
import mp3 from '../assets/images/mp3.png'
import pdf from '../assets/images/pdf.png'


export const splitFile = (nameOfFile) => {
    return nameOfFile.split('.', -1).pop()
}

export const uploads = (item) => {
    let file = item.toLowerCase()
    if(file === 'png' || file === 'jpg' || file === 'gif' || file === 'jpeg') {
        return img
    }
    if(file === 'txt' || file === 'docx') {
        return txt
    }
    if(file === 'zip') {
        return rar
    }
    if(file === 'mp4' || file === 'avi') {
        return mp4
    }
    if(file === 'mp3' || file === 'ape') {
        return mp3
    }
    if(file === 'pdf') {
        return pdf
    }
    else{
        return dir
    }
}