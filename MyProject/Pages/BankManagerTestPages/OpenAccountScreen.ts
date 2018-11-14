import {browser,element,by, WebDriver, WebElement, Browser, ProtractorBrowser} from "protractor";
import {Actions} from "../../Actions/Action";
import { settings } from "cluster";
import { Script, runInThisContext } from "vm";
import { Driver } from "selenium-webdriver/edge";
import { createHash } from "crypto";


export class OpenAccountScreen extends Actions {

    //PROPERTIES
    CustomerName: string;
    Currency: string;
    ProcessButton: string;

   // myPageCollection = browser.findElements(by.className('HTMLFormControlsCollection'));

    //------------------------------------------------------------------------------
    //CONTRUCTOR
    constructor(name, DropdownItemText){
        super();

        //this.CustomerName = "//select[@id = 'userSelect']";
        this.CustomerName = "//*[contains(text(),'" + name + "')]";

        //this.Currency = "//select[@id = 'currency']";
        this.Currency = "//*[contains(text(),'" + DropdownItemText + "')]";

        this.ProcessButton = "//button[@type = 'submit']";

    }

    //------------------------------------------------------------------------------
    //FUNCTIONS


    public selectCustomerName(){
        this.dropDown(this.CustomerName,'select Name item directly');
    }

    public selectCurrency(){
        this.dropDown(this.Currency,'select currency item directly');
    }


    public clickProcessButton(){
         this.myClick(this.ProcessButton,'Clicking the Process Button');
         
         const alertdialog = browser.switchTo().alert();
         var myAlertText:any = alertdialog.getText();
         console.log(myAlertText);
         alertdialog.accept();
        }

    }

