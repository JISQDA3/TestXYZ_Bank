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
var AddCustomersScreen = /** @class */ (function (_super) {
    __extends(AddCustomersScreen, _super);
    // myPageCollection = browser.findElements(by.className('HTMLFormControlsCollection'));
    //------------------------------------------------------------------------------
    //CONTRUCTOR
    function AddCustomersScreen() {
        var _this = _super.call(this) || this;
        _this.HomeButton = "//button[@ng-click = 'home()']";
        //this.firstName = "//input[@ng-model = 'fname']";
        _this.firstName = "//input[@placeholder = 'First Name']";
        //this.lastName = "//input[@ng-model = 'lname']";
        _this.lastName = "//input[@placeholder = 'Last Name']";
        //this.postalCode = "//input[@ng-model = 'postCd']";
        _this.postalCode = "//input[@placeholder = 'Post Code']";
        _this.BottomAddCustomerButton = "//button[@type = 'submit']";
        return _this;
    }
    //------------------------------------------------------------------------------
    //FUNCTIONS
    AddCustomersScreen.prototype.clickHomeButton = function () {
        this.myClick(this.HomeButton, 'Clicking the Home Button at the top of the screen');
    };
    AddCustomersScreen.prototype.enterFirstName = function (keys) {
        //Method#1:
        var myBrowserObj = protractor_1.browser.findElement(protractor_1.by.xpath(this.firstName));
        protractor_1.browser.executeScript("arguments[0].value = '" + keys + "';", myBrowserObj);
        //Method#2:
        // var myObj: WebElement = browser.findElement(by.xpath(this.firstName));
        // myObj.sendKeys(keys)
        //Method#3:
        // this.myClick(this.firstName,'clicking into firstName field');
        // this.mySendKeys(this.firstName,'Entering the First name',keys)
    };
    AddCustomersScreen.prototype.enterLastName = function (keys) {
        this.myClick(this.lastName, 'clicking into lastName field');
        this.mySendKeys(this.lastName, 'Entering the Last name', keys);
    };
    AddCustomersScreen.prototype.enterPostalCode = function (keys) {
        this.myClick(this.postalCode, 'clicking into postalCode field');
        this.mySendKeys(this.postalCode, 'Entering the Postal Code', keys);
    };
    AddCustomersScreen.prototype.clickBottomAddCustomerButton = function () {
        this.myClick(this.BottomAddCustomerButton, 'Clicking the Add Customer Button at the bottom of the screen');
        var alertdialog = protractor_1.browser.switchTo().alert();
        alertdialog.accept();
        var myAlertText = alertdialog.getText();
        console.log(myAlertText);
    };
    return AddCustomersScreen;
}(Action_1.Actions));
exports.AddCustomersScreen = AddCustomersScreen;
