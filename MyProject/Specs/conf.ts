var HtmlReporter = require('protractor-beautiful-reporter');


// An example configuration file.
exports.config = {
    directConnect: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',

    //turns off the normal SELENIUM control flow in favor of the Protractor Async & Await methods
    //SELENIUM_PROMISE_MANAGER: false,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
         shardTestFiles: true,
         maxInstances: 1
    },


/*
//TO RUN PROTRACTOR TEST IN PARALLEL:

    multiCapabilities: [{
        browserName: 'chrome',
        //mention machine1 ip-address in selenium address value
        //and give port id for selenium driver
        seleniumAddress: 'http://192.27.22.35:4444/wd/hub'
        },
        {
        browserName: 'firefox',
        //mention machine2 ip-address in selenium address value
        //and give port id for selenium driver
        seleniumAddress: 'http://192.28.62.184:4444/wd/hub'
        }],
        

*/



    // Framework to use. Jasmine 2 is recommended.
    framework: 'jasmine2',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['BankManagerTC.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    },

    onPrepare: function() {
      // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
    //  browser.manage().window().maximize();
      jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: '../../Reports/screenshots',
         docTitle: 'ProjectName Report Title Goes Here',

      }).getJasmine2Reporter());
   }
}
