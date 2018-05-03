const cookie = {
    set(cookieName, cookieValue, seconds, path){
        let expires = new Date();
        cookieValue = cookieValue ? cookieValue : "";
        if (!!seconds) {
            expires.setTime(expires.getTime() + seconds);
        } else {
            expires.setTime(expires.getTime() + (30 * 60 * 1000));
        }

        let data = encodeURI(cookieName) + "=" + encodeURI(cookieValue)
            + (';expires=' + expires.toGMTString())
            + (path ? ';path=' + path : ';path=/');

        document.cookie = data;
    },
    get(name){
        let cookie_start = document.cookie.indexOf(name + '=');
        let cookie_end = document.cookie.indexOf(";", cookie_start);
        let v = cookie_start == -1 ? '' : decodeURI(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));

        //好像url和cookie中有可能会获取到undefined字符串
        v = v === 'undefined' ? '' : v;
        return v;
    },
    del(name){
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT;path=/;";
    }
};
let util = {
    getDataFromTime(time) {
        if(!time) return;
        let data = new Date(time);
        let year = data.getFullYear(),
            month = data.getMonth() + 1,
            date = data.getDate(),
            hour = data.getHours(),
            minute = data.getMinutes(),
            second = data.getSeconds();
        return `${year}-${month > 9 ? month : '0' + month}-${date > 9 ? date : '0' + date} ${hour > 9 ? hour : '0' + hour}:${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`;
    },
    setCookie(cookieName, cookieValue, seconds, path){
        let expires = new Date();
        cookieValue = cookieValue ? cookieValue : "";
        if (!!seconds) {
            expires.setTime(expires.getTime() + seconds);
        } else {
            expires.setTime(expires.getTime() + (30 * 60 * 1000));
        }

        let data = encodeURI(cookieName) + "=" + encodeURI(cookieValue)
            + (';expires=' + expires.toGMTString())
            + (path ? ';path=' + path : ';path=/');

        document.cookie = data;
    },
    getCookie(name){
        let cookie_start = document.cookie.indexOf(name + '=');
        let cookie_end = document.cookie.indexOf(";", cookie_start);
        let v = cookie_start == -1 ? '' : decodeURI(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));

        //好像url和cookie中有可能会获取到undefined字符串
        v = v === 'undefined' ? '' : v;
        return v;
    },
    delCookie(name){
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT;path=/;";
    }
};
module.exports = util;