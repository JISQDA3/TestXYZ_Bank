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
var DeleteCustomersScreen = /** @class */ (function (_super) {
    __extends(DeleteCustomersScreen, _super);
    // myPageCollection = browser.findElements(by.className('HTMLFormControlsCollection'));
    //------------------------------------------------------------------------------
    //CONTRUCTOR
    function DeleteCustomersScreen() {
        var _this = _super.call(this) || this;
        _this.HomeButton = "//button[@ng-click = 'home()']";
        _this.SearchCustomerField = "//input[@placeholder = 'Search Customer']";
        //this.myDeleteBtnTD = "//td[@class = 'ng-binding' and contains( text(), '" + this.firstnameVal +"')]/following-sibling::td[@class = 'ng-binding' and contains( text(), '" + this.lastnameVal + "')]/following-sibling::td[3]";
        //this.myDeleteBtnLocator= "//button[@ng-click = 'deleteCust(cust)']";
        _this.firstNameLink = "//a[@ng-click = 'sortType = 'fName'; sortReverse = !sortReverse']";
        _this.lastNameLink = "//a[@ng-click = 'sortType = 'lName'; sortReverse = !sortReverse']";
        _this.postalCodeLink = "//a[@ng-click = 'sortType = 'postCd'; sortReverse = !sortReverse']";
        _this.myCustomerTable = "//div[@class = 'marTop ng-scope'";
        return _this;
    }
    //------------------------------------------------------------------------------
    //FUNCTIONS
    DeleteCustomersScreen.prototype.clickHomeButton = function () {
        this.myClick(this.HomeButton, 'Clicking the Home Button at the top of the screen');
    };
    DeleteCustomersScreen.prototype.enterSearchCustomerField = function (keys) {
        //Method#1:
        var myBrowserObj = protractor_1.browser.findElement(protractor_1.by.xpath(this.SearchCustomerField));
        protractor_1.browser.executeScript("arguments[0].value = '" + keys + "';", myBrowserObj);
        //Method#2:
        // var myObj: WebElement = browser.findElement(by.xpath(this.firstName));
        // myObj.sendKeys(keys)
        //Method#3:
        // this.myClick(this.firstName,'clicking into firstName field');
        // this.mySendKeys(this.firstName,'Entering the First name',keys)
    };
    DeleteCustomersScreen.prototype.clickFirstNameLink = function () {
        this.myClick(this.firstNameLink, 'clicking firstNameLink link');
    };
    DeleteCustomersScreen.prototype.clickLastNameLink = function () {
        this.myClick(this.lastNameLink, 'clicking lastNameLink link');
    };
    DeleteCustomersScreen.prototype.clickPostalCodeLink = function () {
        this.myClick(this.postalCodeLink, 'clicking postalCodeLink link');
    };
    DeleteCustomersScreen.prototype.clickDeleteButton = function (firstnameVal, lastnameVal) {
        //delete button
        //this.myDeleteBtnTD = "//td[@class = 'ng-binding' and contains( text(), '" + firstnameVal + "')]/following-sibling::td[@class = 'ng-binding' and contains( text(), '" + lastnameVal + "')]/following-sibling::td[3]";
        this.myDeleteBtnTD = "//td[@class = 'ng-binding' and contains( text(), '" + firstnameVal + "')]/following-sibling::td[@class = 'ng-binding' and contains( text(), '" + lastnameVal + "')]/following-sibling::td[3]/button";
        protractor_1.element(protractor_1.by.xpath(this.myDeleteBtnTD)).click().then(null, function () {
            /*
                        this.browser.sendKeys(protractor.Key.TAB);
                        this.browser.sendKeys(protractor.Key.TAB);
                        this.browser.sendKeys(protractor.Key.PAGE_DOWN);
                        this.browser.sendKeys(protractor.Key.PAGE_DOWN);
            */
            protractor_1.element(protractor_1.by.xpath(this.myCustomerTable));
            protractor_1.browser.sendKeys('{TAB}');
            protractor_1.browser.sendKeys('{TAB}');
            protractor_1.browser.sendKeys('{PAGE_DOWN}');
            protractor_1.browser.sendKeys('{PAGE_DOWN}');
            this.browser.wait(protractor_1.element(protractor_1.by.xpath(this.myDeleteBtnTD)).isDisplayed(), 5000, "waiting for the Delete Button to be Displayed");
            protractor_1.element(protractor_1.by.xpath(this.myDeleteBtnTD)).click();
            console.log('Had to scroll DOWN to click Delete buton for ' + firstnameVal + " " + lastnameVal + ".");
        });
        var alertdialog = protractor_1.browser.switchTo().alert();
        var myAlertText = alertdialog.getText();
        console.log(myAlertText);
        alertdialog.accept();
    };
    return DeleteCustomersScreen;
}(Action_1.Actions));
exports.DeleteCustomersScreen = DeleteCustomersScreen;
