
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