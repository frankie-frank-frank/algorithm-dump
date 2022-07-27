const bcrypt = require('bcryptjs')

const bcryptFunc = async (val) => {
    let awaitVal = await bcrypt.hash(val, 10)
    return awaitVal
}

console.log(bcryptFunc(24234))