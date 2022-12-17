import interrimUsersArray from "./singleton";

const instance = interrimUsersArray.getInstance()
instance.addUser({lastName: 'mike', email: 'mike', password: 'mike'})

export default interrimUsersArray