"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('launch the XYZ Bank Application', function () {
    it('Verify Title of the Application web page', () => {
        protractor_1.browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/login");
        var myHeaderText = protractor_1.element(protractor_1.by.className('mainHeading'));
        expect(myHeaderText.getText()).toBe('XYZ Bank');
    });
});
//# sourceMappingURL=LaunchXYZBankApplication.js.map