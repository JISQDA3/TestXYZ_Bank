import {browser,element,by} from "protractor";
import {Actions} from "../../Actions/Action";


export class PostLoginScreen extends Actions {

    //PROPERTIES
    AddCustomerButton: string;
    OpenAccountButton: string;
    CustomersButton: string;

    //------------------------------------------------------------------------------
    //CONSTRUCTOR
    constructor(){
        super();
        this.AddCustomerButton = "//button[@ng-click = 'addCust()']";
        this.OpenAccountButton = "//button[@ng-click = 'openAccount()']";
        this.CustomersButton = "//button[@ng-click = 'showCust()']";
    }

    //------------------------------------------------------------------------------
    //FUNCTIONS
    public clickAddCustomerButton(){
        this.myClick(this.AddCustomerButton,'Clicking the Add Customer button');
    }

    public clickOpenAccountButton(){
        this.myClick(this.OpenAccountButton,'Clicking the Open Account button');
    }

    public clickCustomersButton(){
        this.myClick(this.CustomersButton,'Clicking the Customer button');
    }
}

