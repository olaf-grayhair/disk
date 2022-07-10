export const sizeOfFiles = (size) => {
    if(size.toString().length <= 6 && size > 0) {
        return `${(size / 1024).toFixed(1)} Kb`
    }
    if(size.toString().length >= 7 && size.toString().length <= 9) {
        return `${(size / 1024 / 1024).toFixed(1)} Mb`
    }
    if(size.toString().length >= 10) {
        return `${(size / 1024 / 1024 / 1024).toFixed(1)} Gb`
    }
    if(size === 0 ) {
        return '-'
    }
}