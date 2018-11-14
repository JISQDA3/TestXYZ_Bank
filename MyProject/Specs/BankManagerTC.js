"use strict";
exports.__esModule = true;
var protractor_1 = require("protractor");
var Action_1 = require("../Actions/Action");
var LoginScreen_1 = require("../Pages/BankManagerLoginPages/LoginScreen");
var PostLoginScreen_1 = require("../Pages/BankManagerTestPages/PostLoginScreen");
var AddCustomersScreen_1 = require("../Pages/BankManagerTestPages/AddCustomersScreen");
var DeleteCustomersScreen_1 = require("../Pages/BankManagerTestPages/DeleteCustomersScreen");
var OpenAccountScreen_1 = require("../Pages/BankManagerTestPages/OpenAccountScreen");
//---------------------------------------------------------
//    <<<<<<<<<<      CLASS DECLARATION SECTION      >>>>>>>>>>
var myActions = new Action_1.Actions();
var loginScreen = new LoginScreen_1.LoginScreen();
var postLoginScreen = new PostLoginScreen_1.PostLoginScreen();
var addCustomersScreen = new AddCustomersScreen_1.AddCustomersScreen();
var deleteCustomersScreen = new DeleteCustomersScreen_1.DeleteCustomersScreen();
//---------------------------------------------------------
//    <<<<<<<<<<      DATA HANDLING SECTION      >>>>>>>>>>
//USING JSON FILE for data
var jsd = require('../data/testData');
var data = jsd.CustomerData1;
//----     ----     ----     ----     ----
//USING DATA PROVIDER for data
//let using = require('jasmine-data-provider');
//using (DataProvider.Common, async function (data)
//{             //Don't forget to comment/uncomment the equivalent Closing Brace down below!
//---------------------------------------------------------
//    <<<<<<<<<<      VARIABLE DEPENDENT UPON DATA HANDLING SECTION      >>>>>>>>>>
var name = 'Ron Weasly'; //data.firstname + ' ' + data.lastname;
var openAccountScreen = new OpenAccountScreen_1.OpenAccountScreen(name, data.currency);
describe('Create a New Bank Customer', function () {
    //----------------------------------------------------------------------------------------
    //INITIALIZE WEB APPLICATION
    it('Launch XYZ Bank Application:  Open Browser and Navigate to URL', function () {
        try {
            //await browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/login");
            protractor_1.browser.get(data.testUrl);
        }
        catch (error) {
            console.log(error);
        }
    });
    //browser readystate
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
    it('Launch XYZ Bank Application:  Verify Application Title', function () {
        try {
            var myHeaderText = protractor_1.element(protractor_1.by.className('mainHeading'));
            expect(myHeaderText.getText()).toBe('XYZ Bank');
        }
        catch (error) {
            console.log(error);
        }
    });
    //----------------------------------------------------------------------------------------
    //LOGIN SCREEN
    it('Login:  Login as a Bank Manager', function () {
        loginScreen.clickBankManagerLoginButton();
    });
    //----------------------------------------------------------------------------------------
    //POST LOGIN SCREEN
    it('PostLoginScreen:  Click the top Add Customer button', function () {
        try {
            postLoginScreen.clickAddCustomerButton();
        }
        catch (error) {
            console.log(error);
        }
    });
    //----------------------------------------------------------------------------------------
    //DATA ENTRY SCREEN
    it('Add Customers Screen:  Enter Customer Data', function () {
        try {
            addCustomersScreen.enterFirstName(data.firstname);
            addCustomersScreen.enterLastName(data.lastname);
            addCustomersScreen.enterPostalCode(data.postalcode);
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Add Customers Screen:  Click the bottom Add Customer button', function () {
        try {
            addCustomersScreen.clickBottomAddCustomerButton();
        }
        catch (error) {
            console.log(error);
        }
    });
    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------
    //POST LOGIN SCREEN
    it('PostLoginScreen:  Click the top Open Account button', function () {
        try {
            postLoginScreen.clickOpenAccountButton();
        }
        catch (error) {
            console.log(error);
        }
    });
    //----------------------------------------------------------------------------------------
    //OPEN ACCOUNT SCREEN
    it('Open Account Screen:  Choose Customer', function () {
        try {
            //deleteCustomersScreen.clickDeleteButton(data.firstname,data.lastname)
            openAccountScreen.selectCustomerName();
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Open Account Screen:  Choose Currency', function () {
        try {
            //deleteCustomersScreen.clickDeleteButton(data.firstname,data.lastname)
            openAccountScreen.selectCurrency();
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Open Account Screen:  Click the Process button', function () {
        try {
            openAccountScreen.clickProcessButton();
        }
        catch (error) {
            console.log(error);
        }
    });
    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------
    //POST LOGIN SCREEN
    it('PostLoginScreen:  Click the top Customers button', function () {
        try {
            postLoginScreen.clickCustomersButton();
        }
        catch (error) {
            console.log(error);
        }
    });
    //----------------------------------------------------------------------------------------
    //CUSTOMER DELETE SCREEN
    it('Delete Customers Screen:  Delete Customer Record', function () {
        try {
            deleteCustomersScreen.clickDeleteButton(data.firstname, data.lastname);
        }
        catch (error) {
            console.log(error);
        }
    });
    //it('Add Customers Screen:  Click the Home button',  () => {
    //   addCustomersScreen.clickHomeButton();
    // })
});
//});//using (DataProvider.Common, async function (data)
