import interrimUsersArray from "./singletonCall1";

const instance = interrimUsersArray.getInstance()
instance.addUser({lastName: 'akey', email: 'akey', password: 'akey'})
instance.getUsers()