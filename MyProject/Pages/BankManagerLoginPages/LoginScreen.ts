import {browser,element,by} from "protractor";
import {Actions} from "../../Actions/Action";


export class LoginScreen extends Actions {

    //PROPERTIES
    CustomerLoginButton: string;
    BankManagerLoginButton: string;

    //------------------------------------------------------------------------------
    //CONSTRUCTOR
    constructor(){
        super();
        this.CustomerLoginButton = "//button[@ng-click = 'customer()']";
        this.BankManagerLoginButton = "//button[@ng-click = 'manager()']";
    }

    //------------------------------------------------------------------------------
    //FUNCTIONS
    public clickCustomerLoginButton() {
        this.myClick(this.CustomerLoginButton,'Clicking the Customer Login button');
    }

    public clickBankManagerLoginButton(){
        this.myClick(this.BankManagerLoginButton,'Clicking the Bank Manager Login button');
    }

    
}

