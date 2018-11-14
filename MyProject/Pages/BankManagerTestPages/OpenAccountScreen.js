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
var protractor_1 = require("protractor");
var Action_1 = require("../../Actions/Action");
var OpenAccountScreen = /** @class */ (function (_super) {
    __extends(OpenAccountScreen, _super);
    // myPageCollection = browser.findElements(by.className('HTMLFormControlsCollection'));
    //------------------------------------------------------------------------------
    //CONTRUCTOR
    function OpenAccountScreen(name, DropdownItemText) {
        var _this = _super.call(this) || this;
        //this.CustomerName = "//select[@id = 'userSelect']";
        _this.CustomerName = "//*[contains(text(),'" + name + "')]";
        //this.Currency = "//select[@id = 'currency']";
        _this.Currency = "//*[contains(text(),'" + DropdownItemText + "')]";
        _this.ProcessButton = "//button[@type = 'submit']";
        return _this;
    }
    //------------------------------------------------------------------------------
    //FUNCTIONS
    OpenAccountScreen.prototype.selectCustomerName = function () {
        this.dropDown(this.CustomerName, 'select Name item directly');
    };
    OpenAccountScreen.prototype.selectCurrency = function () {
        this.dropDown(this.Currency, 'select currency item directly');
    };
    OpenAccountScreen.prototype.clickProcessButton = function () {
        this.myClick(this.ProcessButton, 'Clicking the Process Button');
        var alertdialog = protractor_1.browser.switchTo().alert();
        var myAlertText = alertdialog.getText();
        console.log(myAlertText);
        alertdialog.accept();
    };
    return OpenAccountScreen;
}(Action_1.Actions));
exports.OpenAccountScreen = OpenAccountScreen;
