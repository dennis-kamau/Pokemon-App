const ConvertToUniqueArray = (arr: Array<any>, key: string) => {
    const map = new Map();
    arr.forEach(item => {
        map.set(item[key], item);
    });
    return [...map.values()];
}

export default ConvertToUniqueArray;