import {browser,element,by} from "protractor";


describe('launch the XYZ Bank Application', function(){

    it('Verify Title of the Application web page', () => {
        browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/login");
        var myHeaderText: any = element(by.className('mainHeading'));
        expect(myHeaderText.getText()).toBe('XYZ Bank');
    })

})



