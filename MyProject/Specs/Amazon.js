"use strict";
exports.__esModule = true;
var protractor_1 = require("protractor");
//---------------------------------------------------------
//    <<<<<<<<<<      CLASS DECLARATION SECTION      >>>>>>>>>>
describe('Invoke Amazon', function () {
    //----------------------------------------------------------------------------------------
    //INITIALIZE WEB APPLICATION
    it('Launch Amazon Application:  Open Browser and Navigate to URL', function () {
        try {
            protractor_1.browser.get('http://www.amazon.com');
        }
        catch (error) {
            console.log(error);
        }
    });
    //browser readystate
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
    it('Launch Amazon Application:  Verify Application Title', function () {
        try {
            var myHeaderText = protractor_1.element(protractor_1.by.className('mainHeading'));
            expect(myHeaderText.getText()).toBe('XYZ Bank');
        }
        catch (error) {
            console.log(error);
        }
    });
    /*
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
    
    */
});
//});//using (DataProvider.Common, async function (data)
