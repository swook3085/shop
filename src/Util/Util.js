// 숫자 체크
export function numberCheck(data) {
    if(isNaN(data) === true) {
            return true
    } else {
        return false
    }
}

// 이미지 체크
export function imgCheck(fileName) {
    var ext = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
    if (!(ext === "gif" || ext === "jpg" || ext === "png")) {
        return false;
    } else {
        return true
    }
}

export function numberWithCommas(price) {
    if(parseInt(price) === 0) {
        return price;
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 콤마 풀기
export function uncomma(str) {
    str = String(str);
    return parseFloat(str.replace(/,/gi, ""));
}
export function isEmptyValid(value) { 
    if (value === null) {
        return true
    }
    if (typeof value === 'undefined') {
        return true 
    }
    if (typeof value === 'string' && value === '') {
        return true
    }
    if (Array.isArray(value) && value.length < 1) {
        return true 
    }
    if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1){
        return true 
    }
    if (typeof value === 'object' && value.constructor.name === 'String' && Object.keys(value).length < 1) {
        return true // new String() 
    }
    
    return false 
};