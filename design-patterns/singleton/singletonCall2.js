"use strict";
exports.__esModule = true;
var singletonCall1_1 = require("./singletonCall1");
var instance = singletonCall1_1["default"].getInstance();
instance.addUser({ lastName: 'akey', email: 'akey', password: 'akey' });
instance.getUsers();
