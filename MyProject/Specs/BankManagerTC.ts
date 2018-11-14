//---------------------------------------------------------
//    <<<<<<<<<<      IMPORT MODULE SECTION      >>>>>>>>>>
import {DataProvider} from "../data/dataProvider";

import {browser,element,by,$$,$} from "protractor";
import {Actions} from "../Actions/Action";
import {LoginScreen} from "../Pages/BankManagerLoginPages/LoginScreen";
import {PostLoginScreen} from "../Pages/BankManagerTestPages/PostLoginScreen";
import {AddCustomersScreen} from "../Pages/BankManagerTestPages/AddCustomersScreen";
import {DeleteCustomersScreen} from "../Pages/BankManagerTestPages/DeleteCustomersScreen";
import {OpenAccountScreen} from "../Pages/BankManagerTestPages/OpenAccountScreen";

import {async} from "q";
import { protractor } from "protractor/built/ptor";
import { UseExistingWebDriver } from "protractor/built/driverProviders";
import { Driver } from "selenium-webdriver/firefox";
import { WebdriverBy } from "protractor/built/locators";

//---------------------------------------------------------
//    <<<<<<<<<<      CLASS DECLARATION SECTION      >>>>>>>>>>

var myActions = new Actions();
var loginScreen = new LoginScreen();
var postLoginScreen = new PostLoginScreen();
var addCustomersScreen = new AddCustomersScreen();
var deleteCustomersScreen = new DeleteCustomersScreen();

//---------------------------------------------------------
//    <<<<<<<<<<      DATA HANDLING SECTION      >>>>>>>>>>

//USING JSON FILE for data
let jsd = require('../data/testData');
let data = jsd.CustomerData1;

//----     ----     ----     ----     ----
//USING DATA PROVIDER for data
//let using = require('jasmine-data-provider');
//using (DataProvider.Common, async function (data)
//{             //Don't forget to comment/uncomment the equivalent Closing Brace down below!
//---------------------------------------------------------

//    <<<<<<<<<<      VARIABLE DEPENDENT UPON DATA HANDLING SECTION      >>>>>>>>>>
var name = 'Ron Weasly'; //data.firstname + ' ' + data.lastname;
var openAccountScreen = new OpenAccountScreen(name, data.currency);

describe('Create a New Bank Customer', () => {
   
    //----------------------------------------------------------------------------------------
    //INITIALIZE WEB APPLICATION
     it('Launch XYZ Bank Application:  Open Browser and Navigate to URL', () => {
      
        try{
            //await browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/login");
            browser.get(data.testUrl);
        } catch(error){
            console.log(error);
        }

    })

    //browser readystate
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState


    it('Launch XYZ Bank Application:  Verify Application Title', () => {
        try{
            var myHeaderText: any =  element(by.className('mainHeading'));
            expect(myHeaderText.getText()).toBe('XYZ Bank');
        } catch(error){
            console.log(error);
        }
    })

    //----------------------------------------------------------------------------------------
    //LOGIN SCREEN
    it('Login:  Login as a Bank Manager', () => {
        loginScreen.clickBankManagerLoginButton();
    })

    //----------------------------------------------------------------------------------------
    //POST LOGIN SCREEN
    it('PostLoginScreen:  Click the top Add Customer button', () => {
        try{ 
            postLoginScreen.clickAddCustomerButton();
        } catch(error){
            console.log(error);
        }
    })

    //----------------------------------------------------------------------------------------
    //DATA ENTRY SCREEN
    it('Add Customers Screen:  Enter Customer Data', () => {
        try{
            addCustomersScreen.enterFirstName(data.firstname);
            addCustomersScreen.enterLastName(data.lastname);
            addCustomersScreen.enterPostalCode(data.postalcode);
        } catch(error){
            console.log(error);
        }
    })

    it('Add Customers Screen:  Click the bottom Add Customer button', () => {
        try{
            addCustomersScreen.clickBottomAddCustomerButton();
        } catch(error){
                console.log(error);
        }
    })

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
 //POST LOGIN SCREEN
 it('PostLoginScreen:  Click the top Open Account button', () => {
    try{
        postLoginScreen.clickOpenAccountButton();
    } catch(error){
        console.log(error);
    }
})
//----------------------------------------------------------------------------------------
    //OPEN ACCOUNT SCREEN

    it('Open Account Screen:  Choose Customer', () => {
        try{
            //deleteCustomersScreen.clickDeleteButton(data.firstname,data.lastname)
           openAccountScreen.selectCustomerName()
        } catch(error){
            console.log(error);
        }
   })

   it('Open Account Screen:  Choose Currency', () => {
    try{
        //deleteCustomersScreen.clickDeleteButton(data.firstname,data.lastname)
        openAccountScreen.selectCurrency()
    } catch(error){
        console.log(error);
    }
})

it('Open Account Screen:  Click the Process button', () => {
    try{
        openAccountScreen.clickProcessButton();
    } catch(error){
        console.log(error);
    }
})

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
    //POST LOGIN SCREEN
    it('PostLoginScreen:  Click the top Customers button', () => {
        try{
            postLoginScreen.clickCustomersButton();
        } catch(error){
            console.log(error);
        }
   })

   //----------------------------------------------------------------------------------------
   //CUSTOMER DELETE SCREEN
   it('Delete Customers Screen:  Delete Customer Record', () => {
        try{
            deleteCustomersScreen.clickDeleteButton(data.firstname,data.lastname)
        } catch(error){
            console.log(error);
        }
   })




   //it('Add Customers Screen:  Click the Home button',  () => {
    //   addCustomersScreen.clickHomeButton();
 // })



});



//});//using (DataProvider.Common, async function (data)


    


