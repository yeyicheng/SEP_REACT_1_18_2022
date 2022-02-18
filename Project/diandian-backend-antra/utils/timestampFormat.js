function timestampFormat( timestamp ) {
    function zeroize( num ) {
        return (String(num).length === 1 ? '0' : '') + num;
    }
    timestamp /= 1000;
    const curTimestamp = new Date().getTime() / 1000; //当前时间戳
    const timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

    const curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
    const tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象

    const Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    const H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

    if ( timestampDiff < 60 ) { // 一分钟以内
        return "刚刚";
    } else if( timestampDiff < 3600 ) { // 一小时前之内
        return Math.floor( timestampDiff / 60 ) + "分钟前";
    } else if ( curDate.getFullYear() === Y && curDate.getMonth()+1 === m && curDate.getDate() === d ) {
        return '今天 ' + zeroize(H) + ':' + zeroize(i);
    } else {
        const yesterday = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
        const beforeYesterday = new Date( (curTimestamp - 86400 * 2) * 1000 );
        if ( yesterday.getFullYear() === Y && yesterday.getMonth()+1 === m && yesterday.getDate() === d ) {
            return '昨天 ' + zeroize(H) + ':' + zeroize(i);
        } else if ( beforeYesterday.getFullYear() === Y &&
            beforeYesterday.getFullYear() === Y &&
            beforeYesterday.getMonth()+1 === m &&
            beforeYesterday.getDate() === d ) {
            return '前天 ' + zeroize(H) + ':' + zeroize(i);
        } else if ( curDate.getFullYear() === Y ) {
            return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        } else {
            return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        }
    }
}

module.exports = timestampFormat;

