export default function toTitleCase(strToConv){
    const parts = strToConv.split(' ');
    const titleCasedParts = parts.map(charSet=>{
        return charSet[0].toUpperCase() + charSet.slice(1);
    })
    return titleCasedParts.join(' ');
}