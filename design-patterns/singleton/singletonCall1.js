"use strict";
exports.__esModule = true;
var singleton_1 = require("./singleton");
var instance = singleton_1["default"].getInstance();
instance.addUser({ lastName: 'mike', email: 'mike', password: 'mike' });
exports["default"] = singleton_1["default"];
