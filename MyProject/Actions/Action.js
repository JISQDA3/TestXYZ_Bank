"use strict";
exports.__esModule = true;
var protractor_1 = require("protractor");
var Actions = /** @class */ (function () {
    function Actions() {
    }
    Actions.prototype.myClick = function (locator, logname) {
        var ele = protractor_1.element(protractor_1.by.xpath(locator));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(ele), 2000).then(function () {
            ele.click().then(function () {
                console.log("Clicking " + logname);
            }, function (err) {
                console.log("Issue while Clicking" + logname);
            });
        }, function (err) {
            console.log("Issue while finding" + logname);
        });
    };
    Actions.prototype.sendKey = function (locator, logname, keys) {
        var name = protractor_1.element(protractor_1.by.model(locator));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(name), 5000).then(function () {
            name.sendKeys(keys).then(function () {
                console.log("search for text box: " + logname);
            }, function (err) {
                console.log("issue in sending keys: " + logname);
            });
        }, function (err) {
            console.log("Issue in senKeys path: " + locator);
        });
    };
    Actions.prototype.dropDown = function (locator, logname) {
        var ele = protractor_1.element(protractor_1.by.xpath(locator));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(ele), 2000).then(function () {
            ele.click().then(function () {
                console.log("clicked " + logname);
            }, function (err) {
                console.log("Issue while clicking" + logname);
            });
        }, function () {
            console.log("Issue while finding" + logname);
        });
    };
    Actions.prototype.validateText = function (locator, logname, keys1) {
        var ele = protractor_1.element(protractor_1.by.xpath(locator));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(ele), 2000).then(function () {
            ele.getText().then(function (text) {
                console.log("Verifying " + text);
                expect(text).toEqual(keys1);
            }, function (err) {
                console.log("Issue while verifying " + logname);
            });
        }, function (err) {
            console.log("Issue while Text to be Valid" + locator);
        });
    };
    Actions.prototype.mySendKeys = function (locator, firstName, keys) {
        var ele = protractor_1.element(protractor_1.by.xpath(locator));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(ele), 2000).then(function () {
            ele.sendKeys(keys).then(function () {
                console.log("Entered Text in " + firstName);
            }, function (err) {
                console.log("Issue while sending Keys at " + firstName);
            });
        }, function (err) {
            console.log("Issue while presence of locator " + locator);
        });
    };
    Actions.prototype.GetText = function (locator, logname) {
        protractor_1.element(protractor_1.by.xpath(locator)).getText().then(function (text) {
            console.log(text);
        });
    };
    Actions.prototype.mouseHoverClick = function (mousePoint, locator) {
        var eleme = protractor_1.element(protractor_1.by.xpath(mousePoint));
        protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(eleme), 2000).then(function () {
            protractor_1.browser.actions().mouseMove(eleme).click().perform().then(function () {
                console.log("Click Mouse " + locator);
            }, function (err) {
                console.log("Issue while clicking" + locator);
            });
        }, function (err) {
            console.log("issue whle click " + mousePoint);
        });
    };
    return Actions;
}());
exports.Actions = Actions;
