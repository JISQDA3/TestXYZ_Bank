"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Action_1 = require("../../Actions/Action");
var LoginScreen = /** @class */ (function (_super) {
    __extends(LoginScreen, _super);
    //------------------------------------------------------------------------------
    //CONSTRUCTOR
    function LoginScreen() {
        var _this = _super.call(this) || this;
        _this.CustomerLoginButton = "//button[@ng-click = 'customer()']";
        _this.BankManagerLoginButton = "//button[@ng-click = 'manager()']";
        return _this;
    }
    //------------------------------------------------------------------------------
    //FUNCTIONS
    LoginScreen.prototype.clickCustomerLoginButton = function () {
        this.myClick(this.CustomerLoginButton, 'Clicking the Customer Login button');
    };
    LoginScreen.prototype.clickBankManagerLoginButton = function () {
        this.myClick(this.BankManagerLoginButton, 'Clicking the Bank Manager Login button');
    };
    return LoginScreen;
}(Action_1.Actions));
exports.LoginScreen = LoginScreen;
