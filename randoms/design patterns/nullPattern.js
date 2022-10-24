/*
    TO RUN:
    tsc nullPattern.ts && node nullPattern.ts
*/
var permissibleUsers = [
    { 0: { name: "jamie", age: 25, result: 9.2 } },
    { 1: { name: "malik", age: 29, result: 6.2 } },
    { 2: { name: "antawn", age: 35, result: 8.0 } }
];
var User = /** @class */ (function () {
    function User(id, name) {
        this.id = id;
        this.name = name;
    }
    User.prototype.createUserProfile = function () {
        var objKeys = permissibleUsers.keys();
        console.log(objKeys);
        // permissibleUsers.find((item: MappedType) => {
        //     objKeys.
        // })
    };
    User.prototype.hasAccess = function () {
        return this.name === 'bob';
    };
    return User;
}());
var newUser = new User('233', 'mount');
newUser.createUserProfile();
