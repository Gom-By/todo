const obj1 = {
    id: 0,
    value: "feuille"
}
const obj2 = {
    id: 1,
    value: "papier"
}

const arrayObj = []

arrayObj.push(obj1)
arrayObj.push(obj2)

const objJson = JSON.stringify(arrayObj)

console.log(arrayObj);
console.log(objJson);
