type UserObj = {
    firstName?: string,
    lastName?: string,
    businessName?: string,
    email: string,
    password: string
}

class InterrimUsers {
    private static instance: InterrimUsers;
    users: UserObj[];
    private constructor(){        
        this.users = []
    }
    public static getInstance(): InterrimUsers {
        if(InterrimUsers.instance == null){
            InterrimUsers.instance = new InterrimUsers;
        }
        return InterrimUsers.instance
    }

    addUser(userObj: UserObj){
        this.users.push(userObj)
    }

    getUsers(){
        console.log(this.users)
    }
}

export default InterrimUsers;