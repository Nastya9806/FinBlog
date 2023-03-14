
export const cutDescription = (text, limit) => {
    const rus = /[а-я]/i.test(text);
    if (text.length <= limit) return text
    let spaceIndex
    if(rus){
       spaceIndex = text.indexOf(' ', limit - 40)
       text = text.slice(0, spaceIndex)
    } else{
        spaceIndex = text.indexOf(' ', limit)
        text = text.slice(0, spaceIndex)
    }
    return text + ' ...'
}

export const cutTitle = (title) => {
    let newStr = String(title)
    if(newStr.length > 40){
        return `${newStr.slice(0, 40)}...`
    } else{
        return newStr
    }
}

const str = 'ssssssssssssssssssssssssssssssssssssssssjjjjjjjjjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
console.log(str.length)