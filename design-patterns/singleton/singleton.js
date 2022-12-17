"use strict";
exports.__esModule = true;
var InterrimUsers = /** @class */ (function () {
    function InterrimUsers() {
        this.users = [];
    }
    InterrimUsers.getInstance = function () {
        if (InterrimUsers.instance == null) {
            InterrimUsers.instance = new InterrimUsers;
        }
        return InterrimUsers.instance;
    };
    InterrimUsers.prototype.addUser = function (userObj) {
        this.users.push(userObj);
    };
    InterrimUsers.prototype.getUsers = function () {
        console.log(this.users);
    };
    return InterrimUsers;
}());
exports["default"] = InterrimUsers;
