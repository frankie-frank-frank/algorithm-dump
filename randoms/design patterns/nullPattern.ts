/*
    TO RUN:
    tsc nullPattern.ts && node nullPattern.ts
*/

type CreateName = {
    name: string;
    age: number;
    result: number;
}

type MappedType = {
    [key: string]: CreateName;
}

const permissibleUsers: MappedType[] = [
    {0: {name: "jamie", age: 25, result: 9.2}},
    {1: {name: "malik", age: 29, result: 6.2}},
    {2: {name: "antawn", age: 35, result: 8.0}}
];

class User {
    id: number;
    name: string;
    constructor(id, name){
        this.id = id;
        this.name = name
    }

    createUserProfile(){
        //make sure user is part of permissible types
        //create a new type of profile for the user that recognizes the user's details and extends it to include the profile characteristics
        //return user profile and CreateName item as one object
    }

    hasAccess(){
        return this.name === 'bob'
    }

}

const newUser = new User('233', 'mount')
newUser.createUserProfile()