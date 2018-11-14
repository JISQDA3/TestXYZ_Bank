import {browser,element,by, WebDriver, WebElement, Browser, ProtractorBrowser} from "protractor";
import {Actions} from "../../Actions/Action";
import { settings } from "cluster";
import { Script, runInThisContext } from "vm";
import { Driver } from "selenium-webdriver/edge";
import { createHash } from "crypto";


export class AddCustomersScreen extends Actions {

    //PROPERTIES
    HomeButton: string;
    firstName: string;
    lastName: string;
    postalCode: string;
    BottomAddCustomerButton: string;

   // myPageCollection = browser.findElements(by.className('HTMLFormControlsCollection'));

    //------------------------------------------------------------------------------
    //CONTRUCTOR
    constructor(){
        super();

        this.HomeButton = "//button[@ng-click = 'home()']";

        //this.firstName = "//input[@ng-model = 'fname']";
        this.firstName = "//input[@placeholder = 'First Name']";

        //this.lastName = "//input[@ng-model = 'lname']";
        this.lastName = "//input[@placeholder = 'Last Name']";

        //this.postalCode = "//input[@ng-model = 'postCd']";
        this.postalCode = "//input[@placeholder = 'Post Code']";

        this.BottomAddCustomerButton = "//button[@type = 'submit']";

    }

    //------------------------------------------------------------------------------
    //FUNCTIONS

    public clickHomeButton(){
        this.myClick(this.HomeButton,'Clicking the Home Button at the top of the screen');
    }

    public enterFirstName(keys:string){
        //Method#1:
        var myBrowserObj:object = browser.findElement(by.xpath(this.firstName));
        browser.executeScript("arguments[0].value = '"+ keys + "';", myBrowserObj) ;
 
        //Method#2:
      // var myObj: WebElement = browser.findElement(by.xpath(this.firstName));
      // myObj.sendKeys(keys)
       
        //Method#3:
       // this.myClick(this.firstName,'clicking into firstName field');
       // this.mySendKeys(this.firstName,'Entering the First name',keys)
    }

    public enterLastName(keys){
        this.myClick(this.lastName,'clicking into lastName field');
        this.mySendKeys(this.lastName,'Entering the Last name', keys);
    }

    public enterPostalCode(keys){
         this.myClick(this.postalCode,'clicking into postalCode field');
         this.mySendKeys(this.postalCode,'Entering the Postal Code', keys);
    }

    public clickBottomAddCustomerButton(){
         this.myClick(this.BottomAddCustomerButton,'Clicking the Add Customer Button at the bottom of the screen');
         
         const alertdialog = browser.switchTo().alert();
         alertdialog.accept();
         var myAlertText:any = alertdialog.getText();
         console.log(myAlertText);
        
        }

    }

