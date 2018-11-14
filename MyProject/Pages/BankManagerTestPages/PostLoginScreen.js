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
var PostLoginScreen = /** @class */ (function (_super) {
    __extends(PostLoginScreen, _super);
    //------------------------------------------------------------------------------
    //CONSTRUCTOR
    function PostLoginScreen() {
        var _this = _super.call(this) || this;
        _this.AddCustomerButton = "//button[@ng-click = 'addCust()']";
        _this.OpenAccountButton = "//button[@ng-click = 'openAccount()']";
        _this.CustomersButton = "//button[@ng-click = 'showCust()']";
        return _this;
    }
    //------------------------------------------------------------------------------
    //FUNCTIONS
    PostLoginScreen.prototype.clickAddCustomerButton = function () {
        this.myClick(this.AddCustomerButton, 'Clicking the Add Customer button');
    };
    PostLoginScreen.prototype.clickOpenAccountButton = function () {
        this.myClick(this.OpenAccountButton, 'Clicking the Open Account button');
    };
    PostLoginScreen.prototype.clickCustomersButton = function () {
        this.myClick(this.CustomersButton, 'Clicking the Customer button');
    };
    return PostLoginScreen;
}(Action_1.Actions));
exports.PostLoginScreen = PostLoginScreen;
