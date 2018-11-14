import {browser,element,by, WebDriver, WebElement, Browser, ProtractorBrowser} from "protractor";
import {Actions} from "../../Actions/Action";
import { settings } from "cluster";
import { Script, runInThisContext } from "vm";
import { Driver } from "selenium-webdriver/edge";
import { createHash } from "crypto";
import { protractor } from "protractor/built/ptor";
import { METHODS } from "http";


export class DeleteCustomersScreen extends Actions {

    //PROPERTIES
    HomeButton: string;

    SearchCustomerField: string;

    firstnameVal: string;
    lastnameVal: string;
    //myDeleteBtnLocator:string;
    myDeleteBtnTD:string;

    firstNameLink: string;
    lastNameLink: string;
    postalCodeLink: string;
    myCustomerTable: string;
  


   // myPageCollection = browser.findElements(by.className('HTMLFormControlsCollection'));

    //------------------------------------------------------------------------------
    //CONTRUCTOR
    constructor(){
        super();

        this.HomeButton = "//button[@ng-click = 'home()']";

        this.SearchCustomerField = "//input[@placeholder = 'Search Customer']";

        //this.myDeleteBtnTD = "//td[@class = 'ng-binding' and contains( text(), '" + this.firstnameVal +"')]/following-sibling::td[@class = 'ng-binding' and contains( text(), '" + this.lastnameVal + "')]/following-sibling::td[3]";
        //this.myDeleteBtnLocator= "//button[@ng-click = 'deleteCust(cust)']";

        this.firstNameLink = "//a[@ng-click = 'sortType = 'fName'; sortReverse = !sortReverse']";

        this.lastNameLink = "//a[@ng-click = 'sortType = 'lName'; sortReverse = !sortReverse']";

        this.postalCodeLink = "//a[@ng-click = 'sortType = 'postCd'; sortReverse = !sortReverse']";
        this.myCustomerTable = "//div[@class = 'marTop ng-scope'";
    }

    //------------------------------------------------------------------------------
    //FUNCTIONS

    public clickHomeButton(){
        this.myClick(this.HomeButton,'Clicking the Home Button at the top of the screen');
    }

    public enterSearchCustomerField(keys:string){
        //Method#1:
        var myBrowserObj:object = browser.findElement(by.xpath(this.SearchCustomerField));
        browser.executeScript("arguments[0].value = '"+ keys + "';", myBrowserObj) ;
 
        //Method#2:
      // var myObj: WebElement = browser.findElement(by.xpath(this.firstName));
      // myObj.sendKeys(keys)
       
        //Method#3:
       // this.myClick(this.firstName,'clicking into firstName field');
       // this.mySendKeys(this.firstName,'Entering the First name',keys)
    }

    public clickFirstNameLink(){
        this.myClick(this.firstNameLink,'clicking firstNameLink link');
    }

    public clickLastNameLink(){
        this.myClick(this.lastNameLink,'clicking lastNameLink link');
    }

    public clickPostalCodeLink(){
         this.myClick(this.postalCodeLink,'clicking postalCodeLink link');
    }

    public clickDeleteButton(firstnameVal,lastnameVal) {
        //delete button
      //this.myDeleteBtnTD = "//td[@class = 'ng-binding' and contains( text(), '" + firstnameVal + "')]/following-sibling::td[@class = 'ng-binding' and contains( text(), '" + lastnameVal + "')]/following-sibling::td[3]";
        this.myDeleteBtnTD = "//td[@class = 'ng-binding' and contains( text(), '" + firstnameVal + "')]/following-sibling::td[@class = 'ng-binding' and contains( text(), '" + lastnameVal + "')]/following-sibling::td[3]/button";
        element(by.xpath(this.myDeleteBtnTD)).click().then(null, function(){
/*
            this.browser.sendKeys(protractor.Key.TAB);
            this.browser.sendKeys(protractor.Key.TAB);
            this.browser.sendKeys(protractor.Key.PAGE_DOWN);
            this.browser.sendKeys(protractor.Key.PAGE_DOWN);
*/
element(by.xpath(this.myCustomerTable))
        

            browser.sendKeys('{TAB}');
            browser.sendKeys('{TAB}');
            browser.sendKeys('{PAGE_DOWN}');
            browser.sendKeys('{PAGE_DOWN}');


            this.browser.wait(element(by.xpath(this.myDeleteBtnTD)).isDisplayed(),5000,"waiting for the Delete Button to be Displayed");
            element(by.xpath(this.myDeleteBtnTD)).click();
            console.log('Had to scroll DOWN to click Delete buton for ' + firstnameVal + " " + lastnameVal + ".")
        });

        const alertdialog = browser.switchTo().alert();
        var myAlertText:any = alertdialog.getText();
        console.log(myAlertText);
        alertdialog.accept();


    }






}