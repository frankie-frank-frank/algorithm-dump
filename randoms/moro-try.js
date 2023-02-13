const valArr = [
    {
        selector: 'sss',
        opus: 'mutiny'
    },
    {
        selector: 'jjj',
        opus: 'mutiny'
    }
]

const returnArr = valArr.map((item, key) => {
    const { selector } = item
    return selector
})

console.log(returnArr)