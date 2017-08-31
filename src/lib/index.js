export const dateFormatter = (startTime, endTime, errMsg) => 
    (endTime !== errMsg && startTime !== endTime) ? `${startTime} - ${endTime}` : `${startTime}`;


export const excerpt = (description, length = 140) => {
    let _result = description
                        .replace(/<(?:.|\n)*?>/gm, '')
                        .replace(/&#39;/gi, "'")
                        .substring(0, length);

    return _result += (description.length > length) ? "..." : "";
};