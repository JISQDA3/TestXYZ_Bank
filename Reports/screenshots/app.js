var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Verify Title of the Application web page|launch the XYZ Bank Application",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8496,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00730025-005c-006d-003e-0042008a0004.png",
        "timestamp": 1541101625118,
        "duration": 1910
    },
    {
        "description": "Verify Title of the Application web page|launch the XYZ Bank Application",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10796,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003f005b-008c-007e-004f-0084005f0015.png",
        "timestamp": 1541166042767,
        "duration": 3856
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10868,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009f00d3-0066-0056-0007-00bc00080070.png",
        "timestamp": 1541166299097,
        "duration": 6020
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10868,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008c0009-00fe-0007-00f8-0064006100f4.png",
        "timestamp": 1541166305465,
        "duration": 49
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10868,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d200da-00ea-0025-0090-0042006900c3.png",
        "timestamp": 1541166305802,
        "duration": 105
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10868,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c900a5-008b-0098-00ea-00ed00430043.png",
        "timestamp": 1541166306210,
        "duration": 130
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10868,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c90078-007e-00cd-00cd-00db006a003b.png",
        "timestamp": 1541166306627,
        "duration": 15059
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10868,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003700c9-0031-0063-0051-00d400fa00b1.png",
        "timestamp": 1541166321943,
        "duration": 99
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10868,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ef0033-0080-005f-00d8-007a000700d4.png",
        "timestamp": 1541166322654,
        "duration": 126
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008c003a-008f-00d7-0090-004f004f007f.png",
        "timestamp": 1541166582606,
        "duration": 7315
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0042005b-0062-004d-00b9-007b00450029.png",
        "timestamp": 1541166590241,
        "duration": 52
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00be002a-00da-0020-004f-00a100ec009e.png",
        "timestamp": 1541166590547,
        "duration": 113
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00020059-0028-003f-0002-00fe005400b2.png",
        "timestamp": 1541166590955,
        "duration": 110
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001b0021-0077-0092-00fa-00eb00a300c0.png",
        "timestamp": 1541166591361,
        "duration": 15037
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c70047-0092-00cd-00a7-00f3002f0027.png",
        "timestamp": 1541166606693,
        "duration": 92
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0039005f-0026-0086-005f-00f3008e0067.png",
        "timestamp": 1541166607282,
        "duration": 129
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000d0033-0061-0028-00f4-000f00e900a0.png",
        "timestamp": 1541166687805,
        "duration": 8008
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f00065-00a6-00e0-00c5-0003003b0025.png",
        "timestamp": 1541166696125,
        "duration": 59
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001000ee-00bf-0090-0006-0012008000e0.png",
        "timestamp": 1541166696445,
        "duration": 120
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008900a5-0084-000c-00c2-002c00f80070.png",
        "timestamp": 1541166696936,
        "duration": 119
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00210059-0090-006e-00c2-007300ae0097.png",
        "timestamp": 1541166697386,
        "duration": 15029
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008900c6-00fa-0016-0022-0035006300c7.png",
        "timestamp": 1541166712717,
        "duration": 123
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000c00b1-0085-00f1-000e-0041002d00e2.png",
        "timestamp": 1541166713271,
        "duration": 130
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ae0073-0010-000e-00a7-0085004a000e.png",
        "timestamp": 1541166880097,
        "duration": 8705
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007b005a-00ec-0012-0083-0025002800ff.png",
        "timestamp": 1541166889127,
        "duration": 67
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ef00e6-003c-006d-0017-00e0004100d2.png",
        "timestamp": 1541166889468,
        "duration": 148
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00da006f-0051-004d-0039-006f000a00cd.png",
        "timestamp": 1541166889951,
        "duration": 131
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006f00e0-00b4-00f4-00b2-000a001d00e7.png",
        "timestamp": 1541166890493,
        "duration": 15054
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000c0041-00bd-0062-0098-0094005a00f8.png",
        "timestamp": 1541166905857,
        "duration": 159
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003900fb-00e8-00d7-009f-00b300ea006c.png",
        "timestamp": 1541166906391,
        "duration": 152
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001f000c-007c-007c-002e-007f000a00c5.png",
        "timestamp": 1541167729356,
        "duration": 5382
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00da00c9-00c6-0017-00c0-00e8007e0066.png",
        "timestamp": 1541167735059,
        "duration": 60
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007e00c0-009a-00b3-0014-001b005e00c1.png",
        "timestamp": 1541167735415,
        "duration": 117
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006d00f5-00ff-0086-002c-004000c70000.png",
        "timestamp": 1541167735930,
        "duration": 111
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0045008c-00fc-00a5-00df-00e300bd00f0.png",
        "timestamp": 1541167736637,
        "duration": 15038
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b60061-00e1-0032-0059-00080004009e.png",
        "timestamp": 1541167751955,
        "duration": 100
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004300d6-00cf-000e-00fa-00af00e100b7.png",
        "timestamp": 1541167752716,
        "duration": 128
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000200a6-00ff-00b1-00fe-003f003b00f0.png",
        "timestamp": 1541170760408,
        "duration": 1606
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008600ac-0089-00f0-0008-00b200720071.png",
        "timestamp": 1541170762324,
        "duration": 68
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0020004b-0063-0007-0080-0015005800f3.png",
        "timestamp": 1541170762694,
        "duration": 135
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000a00ab-00b1-0034-009e-003000aa005d.png",
        "timestamp": 1541170763139,
        "duration": 198
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00750073-00a4-00d0-008e-006f004d007d.png",
        "timestamp": 1541170763744,
        "duration": 15031
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b800da-00a3-007b-00dc-0017002200e1.png",
        "timestamp": 1541170779047,
        "duration": 106
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007000aa-00c9-00f6-0024-00a90056006c.png",
        "timestamp": 1541170779628,
        "duration": 115
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004600e5-0016-0057-002f-004800ea002d.png",
        "timestamp": 1541174232514,
        "duration": 3506
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f30069-00bc-00cf-008a-003e00450057.png",
        "timestamp": 1541174236312,
        "duration": 43
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002f00af-001d-007f-00a0-006800f90037.png",
        "timestamp": 1541174236633,
        "duration": 114
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f20059-00c3-0008-007d-0049002d0072.png",
        "timestamp": 1541174237058,
        "duration": 102
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://v2assets.zopim.io/nVHuz6qbGuVvOJgXZkNhXUUsmr9ROfjh-banner?1476216228797 - Failed to load resource: net::ERR_NETWORK_CHANGED",
                "timestamp": 1541174237634,
                "type": ""
            }
        ],
        "screenShotFile": "00d2006b-0002-00d5-00d3-002900c50037.png",
        "timestamp": 1541174237619,
        "duration": 15031
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001f003d-0052-0040-000a-00ca002b00aa.png",
        "timestamp": 1541174252949,
        "duration": 94
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20116,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00890017-0041-0041-00cc-0009009800f5.png",
        "timestamp": 1541174253619,
        "duration": 114
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11204,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003d00ab-000a-006a-0042-0043007700b1.png",
        "timestamp": 1541174425341,
        "duration": 1491
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11204,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003500f9-00dc-001d-0048-00c4003f0036.png",
        "timestamp": 1541174427165,
        "duration": 46
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11204,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004b00e5-004c-0047-0016-00cb00480002.png",
        "timestamp": 1541174427490,
        "duration": 361
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11204,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000d0029-0042-0073-0017-000b005f00a3.png",
        "timestamp": 1541174428211,
        "duration": 106
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11204,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f200a5-0007-009a-0066-001400ee00a8.png",
        "timestamp": 1541174428724,
        "duration": 15015
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11204,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001e00e4-008c-00cf-000c-00c8009c0096.png",
        "timestamp": 1541174444044,
        "duration": 92
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11204,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00350096-00d7-00ff-0080-006700d80054.png",
        "timestamp": 1541174444620,
        "duration": 127
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00580060-00db-0080-0039-003c006400de.png",
        "timestamp": 1541174910403,
        "duration": 1580
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004800d9-00b0-00e6-000d-00fd007c00a7.png",
        "timestamp": 1541174912304,
        "duration": 68
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004600f3-0098-0014-0083-002600cf001a.png",
        "timestamp": 1541174912656,
        "duration": 105
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a900a1-00e4-0089-008e-00e4006c0019.png",
        "timestamp": 1541174913166,
        "duration": 134
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003400b6-00a3-00f5-00d2-00a500d300e8.png",
        "timestamp": 1541174913705,
        "duration": 15033
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002e00a8-00a8-00cb-0068-004f00ea0049.png",
        "timestamp": 1541174929029,
        "duration": 98
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002d0018-000f-00ab-0006-00f70020002d.png",
        "timestamp": 1541174929457,
        "duration": 111
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11588,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed0024-0027-00fe-0081-007f00750078.png",
        "timestamp": 1541175294995,
        "duration": 2946
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11588,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003b0032-00c0-0089-002c-00f200230038.png",
        "timestamp": 1541175298253,
        "duration": 53
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11588,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0066006b-0082-00b8-0015-003c00d300ec.png",
        "timestamp": 1541175298587,
        "duration": 103
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11588,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0039005d-009e-0098-007b-005f008a004e.png",
        "timestamp": 1541175299022,
        "duration": 92
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11588,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006c00ae-0065-0015-0088-00f700f300d0.png",
        "timestamp": 1541175299391,
        "duration": 15027
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11588,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0014003a-00fa-00dd-0016-007c00a90034.png",
        "timestamp": 1541175314714,
        "duration": 90
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11588,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00840069-00e1-002d-0028-00fd00d600f3.png",
        "timestamp": 1541175315245,
        "duration": 139
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004a0093-00e2-004b-00a8-000a00cf0084.png",
        "timestamp": 1541176488110,
        "duration": 1689
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d50064-006d-0092-0025-009200340082.png",
        "timestamp": 1541176490095,
        "duration": 62
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00910073-00d4-00ad-001b-00f200dd0079.png",
        "timestamp": 1541176490432,
        "duration": 295
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00790097-00a2-0034-00b0-00fc00bb0071.png",
        "timestamp": 1541176491155,
        "duration": 116
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002300f7-00de-00eb-002f-00b0000700e1.png",
        "timestamp": 1541176491608,
        "duration": 19231
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00020043-0008-0011-007e-000b00220031.png",
        "timestamp": 1541176511134,
        "duration": 107
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004a0073-0057-003a-006a-001000f400a0.png",
        "timestamp": 1541176511682,
        "duration": 119
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007d00e5-00ed-0071-006c-006c00570036.png",
        "timestamp": 1541176997151,
        "duration": 1544
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f50014-00d2-00d5-0021-00dd00ad0064.png",
        "timestamp": 1541176999026,
        "duration": 55
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009f0024-0046-000c-0055-003100190069.png",
        "timestamp": 1541176999333,
        "duration": 114
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ac00e2-004c-00da-002b-007c007a0074.png",
        "timestamp": 1541176999728,
        "duration": 99
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0000003d-00d8-0013-001f-0065009a0035.png",
        "timestamp": 1541177000308,
        "duration": 19171
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e500ac-00c3-00da-0057-0096009600f4.png",
        "timestamp": 1541177019737,
        "duration": 103
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006900fc-00e7-00ef-0092-006700ef00fa.png",
        "timestamp": 1541177020276,
        "duration": 121
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ab0019-00fa-009b-00d7-004700a6003a.png",
        "timestamp": 1541177430582,
        "duration": 1278
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006d00cb-00eb-0040-0074-008900bb005e.png",
        "timestamp": 1541177432181,
        "duration": 60
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0024009d-00f5-00b3-006d-006c0022005b.png",
        "timestamp": 1541177432571,
        "duration": 150
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0052007c-00c6-000a-00b0-0044007c0062.png",
        "timestamp": 1541177433097,
        "duration": 111
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00490083-0022-0082-0035-004f00a90066.png",
        "timestamp": 1541177433623,
        "duration": 15376
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00df003c-00e9-0078-000d-004c008b000f.png",
        "timestamp": 1541177449265,
        "duration": 90
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9044,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00eb003c-00dc-000e-0055-006c005d00a5.png",
        "timestamp": 1541177449747,
        "duration": 95
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2752,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000f0060-0032-00d8-0053-00ab006c003c.png",
        "timestamp": 1541178294600,
        "duration": 1414
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2752,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003f0070-005f-006d-00ed-00010032000b.png",
        "timestamp": 1541178296302,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2752,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f00067-00d4-009a-0043-00ec002e00e0.png",
        "timestamp": 1541178296657,
        "duration": 126
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2752,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001f0048-0050-0035-005c-00f800c600ec.png",
        "timestamp": 1541178297140,
        "duration": 103
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2752,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot create property 'valueOf' on string '//input[@placeholder = 'First Name']'"
        ],
        "trace": [
            "TypeError: Cannot create property 'valueOf' on string '//input[@placeholder = 'First Name']'\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:42:32)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004a0055-0068-00e9-005e-00f3009b0071.png",
        "timestamp": 1541178297552,
        "duration": 7
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2752,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00830036-00bb-00b2-00e6-0081002200fc.png",
        "timestamp": 1541178297839,
        "duration": 110
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2752,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006400e5-00f5-002f-004d-009a003b00f4.png",
        "timestamp": 1541178298500,
        "duration": 131
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6512,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008700b2-00e4-003f-007d-00310015000b.png",
        "timestamp": 1541178494466,
        "duration": 1519
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6512,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001a0025-0058-00d2-00ae-006400620023.png",
        "timestamp": 1541178496312,
        "duration": 56
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6512,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00be0014-0021-0016-00f0-003100830060.png",
        "timestamp": 1541178496800,
        "duration": 144
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6512,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00310004-00f7-0006-00e1-00a000300057.png",
        "timestamp": 1541178497294,
        "duration": 102
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6512,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005700bf-007c-00fd-00c1-0091001000f4.png",
        "timestamp": 1541178497769,
        "duration": 15622
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00500098-0082-0025-0086-00d5006200f5.png",
        "timestamp": 1541178619190,
        "duration": 1454
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00db0026-008b-0068-00e7-006f00be00ee.png",
        "timestamp": 1541178620965,
        "duration": 59
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003800ed-0011-003f-0010-003500f800c0.png",
        "timestamp": 1541178621344,
        "duration": 192
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009a002e-00f3-000b-00b9-00bb0021008c.png",
        "timestamp": 1541178621918,
        "duration": 128
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002a0000-0012-0009-00a3-00a9005f00db.png",
        "timestamp": 1541178622335,
        "duration": 716
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002800cc-0005-0090-00a3-00ed003c0060.png",
        "timestamp": 1541179488098,
        "duration": 2079
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ec0031-0073-00be-00c0-002c00df002c.png",
        "timestamp": 1541179490477,
        "duration": 227
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00360041-0068-0062-00bf-0061002f00b3.png",
        "timestamp": 1541179491231,
        "duration": 108
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001e0097-0023-008f-0023-00e800e00063.png",
        "timestamp": 1541179491644,
        "duration": 92
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f9009b-002e-00a8-002a-0077004a0004.png",
        "timestamp": 1541179492107,
        "duration": 598
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3604,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000000f0-00d7-0078-0030-001200d500c4.png",
        "timestamp": 1541179867614,
        "duration": 1377
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3604,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009a0046-003e-0088-00d1-007f0001003e.png",
        "timestamp": 1541179869314,
        "duration": 49
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3604,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d30033-0044-00c2-007d-00d7004f006c.png",
        "timestamp": 1541179869627,
        "duration": 111
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3604,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b2007e-008f-0080-00a5-00ab0066003c.png",
        "timestamp": 1541179870061,
        "duration": 202
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3604,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0044007a-004b-00bc-0016-002c00e300a4.png",
        "timestamp": 1541179870619,
        "duration": 657
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15756,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008b005e-004c-00c0-00e0-0054009a001a.png",
        "timestamp": 1541185813458,
        "duration": 1892
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15756,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00bc00e7-00ac-00fb-000a-0028005b0019.png",
        "timestamp": 1541185815678,
        "duration": 67
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15756,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008b001d-0083-005c-0077-005000bd0004.png",
        "timestamp": 1541185816062,
        "duration": 114
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15756,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005700f9-002d-0064-0065-007300ce0037.png",
        "timestamp": 1541185816568,
        "duration": 136
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15756,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: document is not defined"
        ],
        "trace": [
            "ReferenceError: document is not defined\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:40:19)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004300ab-0032-0042-0070-0063004b006d.png",
        "timestamp": 1541185817045,
        "duration": 4
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15756,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006300a3-0059-0068-00b3-003100a40042.png",
        "timestamp": 1541185817294,
        "duration": 181
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15756,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dc001c-0060-00f7-00ed-000200370098.png",
        "timestamp": 1541185818072,
        "duration": 127
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15756,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00430004-005a-002a-00aa-0040008d0068.png",
        "timestamp": 1541185818536,
        "duration": 1
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0041002a-0096-001c-009f-0002005f00b1.png",
        "timestamp": 1541186718088,
        "duration": 1629
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009e0077-006f-00ed-008f-00520057002a.png",
        "timestamp": 1541186720014,
        "duration": 265
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00db0092-0048-00c3-0022-009a000f00b2.png",
        "timestamp": 1541186720570,
        "duration": 115
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004d0064-009d-0020-0008-0000005e00f4.png",
        "timestamp": 1541186720978,
        "duration": 114
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: addCustomersScreen.enterFirstName is not a function"
        ],
        "trace": [
            "TypeError: addCustomersScreen.enterFirstName is not a function\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0055008a-0023-0024-005b-002300fa0060.png",
        "timestamp": 1541186721568,
        "duration": 5
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003900a1-006f-0062-003c-00ce0046008d.png",
        "timestamp": 1541186721900,
        "duration": 116
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001a00b3-007a-009c-003d-00ba00980044.png",
        "timestamp": 1541186722547,
        "duration": 113
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c700e7-00fb-00f9-0021-000a00ae00d4.png",
        "timestamp": 1541186723023,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20328,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000c0042-00fa-0012-00c0-00fb001f007c.png",
        "timestamp": 1541187179277,
        "duration": 38409
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20328,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005f0070-00d4-0044-0063-001000bb0023.png",
        "timestamp": 1541187218017,
        "duration": 50
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20328,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008e0005-0052-0050-00d3-00b800100023.png",
        "timestamp": 1541187218412,
        "duration": 94
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20328,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006c0018-00ca-00ad-0095-000000b700e1.png",
        "timestamp": 1541187218795,
        "duration": 105
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20328,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: this.firstName.setAttribute is not a function"
        ],
        "trace": [
            "TypeError: this.firstName.setAttribute is not a function\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:40:24)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ac001b-0034-0011-0030-00460098007c.png",
        "timestamp": 1541187219276,
        "duration": 16
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20328,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007600eb-0082-00bf-0019-007c00ce0084.png",
        "timestamp": 1541187219596,
        "duration": 98
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20328,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00540035-000d-00a2-001c-00cf00b50016.png",
        "timestamp": 1541187220262,
        "duration": 135
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20328,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "002e0059-00bf-0015-00d0-004d009e00d0.png",
        "timestamp": 1541187220800,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14288,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0071004d-00da-0005-0059-004f001600f4.png",
        "timestamp": 1541187369369,
        "duration": 1589
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14288,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e700d6-008a-0099-0015-0082004d0050.png",
        "timestamp": 1541187371254,
        "duration": 72
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14288,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c80065-0099-00ca-00c3-00a7005d0035.png",
        "timestamp": 1541187371605,
        "duration": 111
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14288,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00df003a-0085-0081-0021-00c6003c0002.png",
        "timestamp": 1541187372029,
        "duration": 102
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14288,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'setAttribute' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'setAttribute' of undefined\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:41:56)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0006001f-0013-009d-003e-00cd00970061.png",
        "timestamp": 1541187372471,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14288,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b90063-00bf-0090-0030-006f00740056.png",
        "timestamp": 1541187372774,
        "duration": 109
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14288,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0009003a-0041-00cc-000b-0000000d00a9.png",
        "timestamp": 1541187373509,
        "duration": 126
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14288,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "009d004b-0022-003a-00d8-0026009f009f.png",
        "timestamp": 1541187373976,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003e00c5-00e1-00b8-00a0-00eb005c00bc.png",
        "timestamp": 1541189067117,
        "duration": 1740
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003000dc-009f-006b-0070-000b003400fc.png",
        "timestamp": 1541189069187,
        "duration": 50
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f600d4-003b-0059-0066-003f00a900ff.png",
        "timestamp": 1541189069500,
        "duration": 344
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000d0024-00cc-00dd-0081-0019002f0099.png",
        "timestamp": 1541189070147,
        "duration": 118
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed0048-009d-00c2-0031-00da00cf003c.png",
        "timestamp": 1541189070677,
        "duration": 585
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0069007a-0097-00bb-0027-00950087001e.png",
        "timestamp": 1541189157190,
        "duration": 1172
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ab001d-00c3-00bb-0043-00f7004600cf.png",
        "timestamp": 1541189158742,
        "duration": 56
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002100e4-007c-00ba-00ac-004900a30068.png",
        "timestamp": 1541189159070,
        "duration": 112
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cd0018-00ec-0069-00ae-008e00930031.png",
        "timestamp": 1541189159498,
        "duration": 311
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0038006f-0072-005b-00d8-0037002600ba.png",
        "timestamp": 1541189160181,
        "duration": 496
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b9001d-005d-00a0-0008-003900cc0015.png",
        "timestamp": 1541432977323,
        "duration": 8159
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00000033-000d-008a-0086-00db00f700d1.png",
        "timestamp": 1541432985884,
        "duration": 78
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0027000a-00a2-0092-003f-00e200700097.png",
        "timestamp": 1541432986233,
        "duration": 117
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0025008e-006b-001f-0088-00c500390003.png",
        "timestamp": 1541432986641,
        "duration": 95
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: myObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: myObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:44:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b60080-006c-00e1-006b-003f00c2005e.png",
        "timestamp": 1541432987028,
        "duration": 32
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000500be-0004-005b-0096-00d0001900e1.png",
        "timestamp": 1541432987335,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005a00fe-00a9-0059-002b-0010005d002d.png",
        "timestamp": 1541432988124,
        "duration": 134
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "006b0048-00fc-00b1-005e-004e00ce0032.png",
        "timestamp": 1541432988613,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00380045-00aa-00e6-00bd-004200a0006e.png",
        "timestamp": 1541433101180,
        "duration": 5840
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001a00a5-0016-0080-00c9-0022008200ad.png",
        "timestamp": 1541433107334,
        "duration": 55
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005f0081-004a-00cd-0031-003200520053.png",
        "timestamp": 1541433107661,
        "duration": 126
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cf0000-00b5-0017-0034-00f500fa0030.png",
        "timestamp": 1541433108103,
        "duration": 96
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: document.queryselector is not a function\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: document.queryselector is not a function\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:44:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00110041-0005-004e-002a-004100c0007c.png",
        "timestamp": 1541433108510,
        "duration": 42
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00520013-0051-00ef-0062-00ba000900bf.png",
        "timestamp": 1541433108817,
        "duration": 104
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009c0024-0088-0049-00f3-0061000d008f.png",
        "timestamp": 1541433109647,
        "duration": 137
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16304,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "001700f0-00f7-0080-0051-00cf008d008d.png",
        "timestamp": 1541433110130,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2772,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000e00c8-00a9-0002-009e-0003008600f2.png",
        "timestamp": 1541434300959,
        "duration": 3765
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2772,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001e00e1-00f4-002d-00ff-007200e90054.png",
        "timestamp": 1541434305087,
        "duration": 63
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2772,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00100090-008f-0050-00ef-00bb009b0088.png",
        "timestamp": 1541434305464,
        "duration": 125
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2772,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005c0017-0093-00f9-00a9-008900770091.png",
        "timestamp": 1541434305899,
        "duration": 106
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2772,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: document.queryselector is not a function\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: document.queryselector is not a function\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c3000c-0087-0062-00e6-00bb001300aa.png",
        "timestamp": 1541434306401,
        "duration": 43
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2772,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e30024-00af-00f5-00e9-008e005c008b.png",
        "timestamp": 1541434306738,
        "duration": 139
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2772,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a700cc-0004-00c6-00eb-0070001a0015.png",
        "timestamp": 1541434307572,
        "duration": 120
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2772,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "001700cb-0042-0089-0067-000400b600b9.png",
        "timestamp": 1541434308051,
        "duration": 1
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000300b4-00ff-008e-0058-00c1003b0061.png",
        "timestamp": 1541434725367,
        "duration": 4546
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a500c3-004d-00fc-00aa-00e5005d00bc.png",
        "timestamp": 1541434730432,
        "duration": 79
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a80016-0069-0071-0083-00d100bf00da.png",
        "timestamp": 1541434730836,
        "duration": 171
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0023001e-003e-000b-0082-007f006600b5.png",
        "timestamp": 1541434731489,
        "duration": 155
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: browser is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: browser is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ff00ab-00c7-00a2-0030-0031004d000f.png",
        "timestamp": 1541434732014,
        "duration": 91
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00460070-00be-00f3-0019-001f007300b6.png",
        "timestamp": 1541434732415,
        "duration": 189
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001e00d9-00e6-0050-00da-0009005f0066.png",
        "timestamp": 1541434733410,
        "duration": 181
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fa007b-0004-00de-0011-002a001f0073.png",
        "timestamp": 1541434734259,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18188,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00520069-008a-0038-002b-001c0028003c.png",
        "timestamp": 1541437032260,
        "duration": 1818
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18188,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009100b7-00d5-00aa-00d0-0021004b0079.png",
        "timestamp": 1541437034416,
        "duration": 52
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18188,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005f0016-0086-0048-0065-00f1008f0029.png",
        "timestamp": 1541437034732,
        "duration": 346
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18188,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b800c9-00e9-00de-00d2-0057002e00f9.png",
        "timestamp": 1541437035485,
        "duration": 92
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18188,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00af0001-0027-00e9-00af-005100f6002f.png",
        "timestamp": 1541437035944,
        "duration": 499
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18188,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001e003c-00d3-006a-008e-001d00ad0085.png",
        "timestamp": 1541437036778,
        "duration": 158
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18188,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0039001a-00c1-0003-00f9-008d00ff00dc.png",
        "timestamp": 1541437037494,
        "duration": 147
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18188,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00020006-00f5-00f5-008a-008600fb000d.png",
        "timestamp": 1541437038020,
        "duration": 3
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10444,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001300e3-004d-00f4-00ed-003f00c900db.png",
        "timestamp": 1541437147818,
        "duration": 4968
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10444,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001e00dc-0037-0022-00bb-005d007a00df.png",
        "timestamp": 1541437153099,
        "duration": 52
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10444,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009700a5-006e-00b9-0080-007f008d001c.png",
        "timestamp": 1541437153453,
        "duration": 110
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10444,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e400af-00b1-0033-0078-0039004e0086.png",
        "timestamp": 1541437153863,
        "duration": 96
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed000e-00ed-002e-00c7-009a00260021.png",
        "timestamp": 1541437510897,
        "duration": 1989
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007c004e-0043-00a4-002f-005500dc0049.png",
        "timestamp": 1541437513302,
        "duration": 58
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00150072-0052-0095-0032-00b6005f0072.png",
        "timestamp": 1541437513740,
        "duration": 174
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008a00b5-00b2-00a5-00c1-00ed007000eb.png",
        "timestamp": 1541437514322,
        "duration": 93
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004b007e-00fa-009f-0041-00b1000e002d.png",
        "timestamp": 1541437514740,
        "duration": 509
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001100ca-00ee-00c1-000b-003b00fd003a.png",
        "timestamp": 1541437515615,
        "duration": 182
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d900f3-00f4-0051-00dc-008000cc00dd.png",
        "timestamp": 1541437516327,
        "duration": 166
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00250053-00e3-0024-0048-001900630013.png",
        "timestamp": 1541437516864,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ae00df-000a-00c5-00fd-00f000580024.png",
        "timestamp": 1541437624959,
        "duration": 1476
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d9002e-00d1-0070-0076-00ec005a0016.png",
        "timestamp": 1541437626810,
        "duration": 55
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004a000f-0042-008b-0064-004f000d00a5.png",
        "timestamp": 1541437627142,
        "duration": 125
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d400cf-00a1-005d-00f0-00b000c9007b.png",
        "timestamp": 1541437627841,
        "duration": 104
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: browser is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: browser is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ea00ef-0077-00a3-0009-00e5002700b4.png",
        "timestamp": 1541437628335,
        "duration": 46
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007100a8-00fd-00cc-000b-004100c90078.png",
        "timestamp": 1541437628673,
        "duration": 149
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005b0046-00ef-00df-00f2-00ee00d300e9.png",
        "timestamp": 1541437629464,
        "duration": 138
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00af0064-009c-0040-00ce-004100ed00b2.png",
        "timestamp": 1541437629948,
        "duration": 3
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002300f6-004f-0052-0093-005c009300b7.png",
        "timestamp": 1541438061335,
        "duration": 2601
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ae0057-0077-00ad-00ef-00be005a005a.png",
        "timestamp": 1541438064258,
        "duration": 61
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0028006a-00eb-008f-00e6-007c00e900af.png",
        "timestamp": 1541438064614,
        "duration": 124
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ce0076-001d-0025-00ba-00e100460018.png",
        "timestamp": 1541438065120,
        "duration": 100
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: ProtractorBrowser is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: ProtractorBrowser is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00150045-00d3-009f-004d-006f005700b5.png",
        "timestamp": 1541438065564,
        "duration": 20
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed0019-0006-003f-00d7-00c900df0056.png",
        "timestamp": 1541438066024,
        "duration": 103
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002e0050-00c5-002f-0042-00af00240057.png",
        "timestamp": 1541438066735,
        "duration": 150
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22144,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00580080-00f9-0014-0067-0096000a0051.png",
        "timestamp": 1541438067289,
        "duration": 1
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00970079-00a4-0077-00d5-0055007e0012.png",
        "timestamp": 1541438196081,
        "duration": 7164
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b5008f-000e-003a-00b0-004700d6009f.png",
        "timestamp": 1541438203577,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002e0030-0046-0024-00d0-009c005900f9.png",
        "timestamp": 1541438203937,
        "duration": 126
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006b0013-0092-00ee-00a3-0009002f005b.png",
        "timestamp": 1541438204452,
        "duration": 110
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: myBrowserObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: myBrowserObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00cf0074-00a5-00c4-0034-005c006c009c.png",
        "timestamp": 1541438204923,
        "duration": 44
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a400bc-0060-002d-0095-001400a5001f.png",
        "timestamp": 1541438205263,
        "duration": 190
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00310069-00e0-007b-00b3-00f3008f00cc.png",
        "timestamp": 1541438206143,
        "duration": 167
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ff0045-002d-00da-0055-007200e200b6.png",
        "timestamp": 1541438206696,
        "duration": 3
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15936,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b30074-00e6-0041-0000-001500fb0009.png",
        "timestamp": 1541438352512,
        "duration": 4813
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15936,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004100f4-0011-0096-00d6-00f100f6009d.png",
        "timestamp": 1541438357712,
        "duration": 56
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15936,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005d00ab-00ac-00d6-006e-008100a4001f.png",
        "timestamp": 1541438358047,
        "duration": 109
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15936,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001500d4-00a0-000b-0021-004300290099.png",
        "timestamp": 1541438358454,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15936,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: myBrowserObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: myBrowserObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:47:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c10046-0087-00d3-0021-006b00c80001.png",
        "timestamp": 1541438358986,
        "duration": 43
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15936,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000400a9-00fe-00aa-0039-00d400240072.png",
        "timestamp": 1541438359318,
        "duration": 140
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15936,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007e00cd-006d-00ae-00d4-002a00cd0065.png",
        "timestamp": 1541438360121,
        "duration": 153
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15936,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "0013004a-0059-0013-00cb-002000170065.png",
        "timestamp": 1541438360664,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001100aa-00f6-0039-0003-009300900052.png",
        "timestamp": 1541438486986,
        "duration": 2184
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00aa00e7-003f-00f7-007c-00c2002800ae.png",
        "timestamp": 1541438489491,
        "duration": 61
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bd0024-0013-0069-008c-00cd00ef0031.png",
        "timestamp": 1541438489834,
        "duration": 145
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00980026-00cf-0043-0003-00e8002a0083.png",
        "timestamp": 1541438490289,
        "duration": 115
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: myBrowserObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: myBrowserObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0058001c-00ad-004d-0065-0099007400d0.png",
        "timestamp": 1541438490805,
        "duration": 50
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ac0034-0021-0083-006c-00a500530001.png",
        "timestamp": 1541438491304,
        "duration": 170
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00780022-00ca-00bc-00a4-002b000800af.png",
        "timestamp": 1541438492120,
        "duration": 202
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00cf00ee-0030-00d2-0095-00d700870008.png",
        "timestamp": 1541438492731,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19764,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008e0049-0061-000f-009a-00f9002200f9.png",
        "timestamp": 1541438591949,
        "duration": 1543
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19764,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007d0019-0048-0090-004e-008700db007a.png",
        "timestamp": 1541438593834,
        "duration": 66
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19764,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00200004-0047-006f-0090-0018008400c8.png",
        "timestamp": 1541438594214,
        "duration": 156
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19764,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d40082-0010-0021-00ff-009300b700fb.png",
        "timestamp": 1541438594791,
        "duration": 194
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19764,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: this.element is not a function"
        ],
        "trace": [
            "TypeError: this.element is not a function\n    at AbstractExtendedWebDriver.findElement (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\node_modules\\protractor\\built\\browser.js:545:21)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:43:79)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0027004b-0073-00c6-00fb-00840068001e.png",
        "timestamp": 1541438595442,
        "duration": 7
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19764,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003a00bb-002c-00cf-00d2-003d004300be.png",
        "timestamp": 1541438595761,
        "duration": 138
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19764,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000800d3-0066-0013-0066-004a00b3002c.png",
        "timestamp": 1541438596547,
        "duration": 123
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19764,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "006c00bf-00c7-00ba-003b-003c00b700e5.png",
        "timestamp": 1541438597081,
        "duration": 1
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fb0018-0018-00fe-00dd-00bf00af009b.png",
        "timestamp": 1541439681439,
        "duration": 6149
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a3000a-00c8-0094-00c7-00fc0077007a.png",
        "timestamp": 1541439688155,
        "duration": 53
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00900079-00db-00c7-00c5-0092001a0054.png",
        "timestamp": 1541439688522,
        "duration": 110
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cd0029-004e-00f8-0047-002700740076.png",
        "timestamp": 1541439688987,
        "duration": 94
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: myBrowserObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: myBrowserObj is not defined\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f50096-00a0-0093-0096-00b3005e00a2.png",
        "timestamp": 1541439689409,
        "duration": 185
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000c007f-0066-0041-0068-007a002f0079.png",
        "timestamp": 1541439689939,
        "duration": 151
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000c0008-0095-0082-0007-008b009b00ac.png",
        "timestamp": 1541439690856,
        "duration": 307
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ad0036-00a6-00d4-001d-009600710071.png",
        "timestamp": 1541439691829,
        "duration": 1
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13056,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d700b7-00c5-0009-0033-0092004b0027.png",
        "timestamp": 1541439968707,
        "duration": 5594
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13056,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002a0002-009a-00de-001b-00e200800097.png",
        "timestamp": 1541439974718,
        "duration": 61
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13056,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d00003-00ba-0019-00cc-002000fa0011.png",
        "timestamp": 1541439975072,
        "duration": 121
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13056,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008c0097-0048-00fd-0080-00ff0081002c.png",
        "timestamp": 1541439975594,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13056,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: Runtime.evaluate threw exception: SyntaxError: Unexpected identifier\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: Runtime.evaluate threw exception: SyntaxError: Unexpected identifier\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "005a000f-001d-004b-0013-005300ff0042.png",
        "timestamp": 1541439976010,
        "duration": 45
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13056,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0093008b-0056-0065-0096-00e200af0087.png",
        "timestamp": 1541439976349,
        "duration": 140
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13056,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f800ef-0062-00e9-00e1-00ab007700c1.png",
        "timestamp": 1541439977533,
        "duration": 149
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13056,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "0050003b-0096-00e4-007e-007900a00015.png",
        "timestamp": 1541439978129,
        "duration": 3
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16960,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fc008d-00e4-00ef-0028-0067006c00da.png",
        "timestamp": 1541440941754,
        "duration": 5105
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16960,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a90047-003e-00c5-0085-00b50079007e.png",
        "timestamp": 1541440947181,
        "duration": 75
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16960,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00aa0045-0004-00c8-00f1-0049001200e3.png",
        "timestamp": 1541440947559,
        "duration": 107
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16960,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008300df-0085-008b-00f0-0091009900d9.png",
        "timestamp": 1541440947955,
        "duration": 94
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16960,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: Runtime.evaluate threw exception: SyntaxError: Unexpected identifier\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: Runtime.evaluate threw exception: SyntaxError: Unexpected identifier\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00560065-004b-00a6-00fa-00a300de007f.png",
        "timestamp": 1541440948355,
        "duration": 41
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16960,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00eb003d-005a-00aa-0068-00c4000b00b3.png",
        "timestamp": 1541440948670,
        "duration": 123
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16960,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e60065-00ec-0069-004e-00f100f800cc.png",
        "timestamp": 1541440949456,
        "duration": 139
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16960,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "000a0078-0000-00d2-00b2-00c100b00035.png",
        "timestamp": 1541440949958,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008f00eb-0082-0047-0020-0076005c00ed.png",
        "timestamp": 1541442340242,
        "duration": 5803
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ff00be-0051-00fd-0086-009e0097004d.png",
        "timestamp": 1541442346384,
        "duration": 54
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a4007d-002c-0045-0010-00d7000900f4.png",
        "timestamp": 1541442346724,
        "duration": 102
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002b00f7-00f1-00f5-003d-001900ec0010.png",
        "timestamp": 1541442347144,
        "duration": 91
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: Runtime.evaluate threw exception: SyntaxError: Unexpected identifier\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: Runtime.evaluate threw exception: SyntaxError: Unexpected identifier\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "002e0083-005c-0063-00ec-00d4009d00d0.png",
        "timestamp": 1541442347556,
        "duration": 53
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004b00d1-0018-0051-00a1-00620006008f.png",
        "timestamp": 1541442347879,
        "duration": 121
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004a00c6-00aa-002d-0030-0002004b0050.png",
        "timestamp": 1541442348627,
        "duration": 121
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a90060-0028-00be-00c2-007500900027.png",
        "timestamp": 1541442349124,
        "duration": 1
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005b00c4-001f-002b-00b0-00bb005a00e3.png",
        "timestamp": 1541443964352,
        "duration": 5758
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006c00b2-00f6-00bf-006d-001400a7004d.png",
        "timestamp": 1541443970438,
        "duration": 53
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0066003a-0094-0004-00c2-0082002c0082.png",
        "timestamp": 1541443970779,
        "duration": 95
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00680095-006e-0048-00b7-003a00e70075.png",
        "timestamp": 1541443971189,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fa00ea-0042-0096-005a-00ba00a70055.png",
        "timestamp": 1541443971612,
        "duration": 411
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fd00b6-0076-0061-0020-00c900c1006c.png",
        "timestamp": 1541443972381,
        "duration": 134
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b50034-00c0-00c8-0033-003400ef0078.png",
        "timestamp": 1541443973020,
        "duration": 131
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "009300d4-0037-0025-0033-0033009d0069.png",
        "timestamp": 1541443973499,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a20078-0035-00d8-0032-006000480082.png",
        "timestamp": 1541444411872,
        "duration": 5560
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00aa000f-00f6-0088-0001-00ea00ea00f5.png",
        "timestamp": 1541444417758,
        "duration": 58
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001d00a7-00af-004b-0034-009400af000e.png",
        "timestamp": 1541444418113,
        "duration": 106
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009500d1-00f5-008c-00d0-003800c0008a.png",
        "timestamp": 1541444418595,
        "duration": 102
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: protractor_1.browser.execute_script is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.execute_script is not a function\n    at AddCustomersScreen.enterFirstName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\AddCustomersScreen.js:45:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:75:28)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"Add Customers Screen:  Enter Customer Data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:74:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004d00ba-0057-00e0-0097-00fc000a004a.png",
        "timestamp": 1541444418995,
        "duration": 8
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006c000b-0093-0060-0069-00ab0074002d.png",
        "timestamp": 1541444419292,
        "duration": 120
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000f0070-0002-0089-0094-00a00097004f.png",
        "timestamp": 1541444420246,
        "duration": 147
    },
    {
        "description": "encountered a declaration exception|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "ReferenceError: waits is not defined"
        ],
        "trace": [
            "ReferenceError: waits is not defined\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:85:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:47:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)"
        ],
        "browserLogs": [],
        "screenShotFile": "0020000d-003e-006e-006c-00a400160028.png",
        "timestamp": 1541444420789,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2632,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d800ac-0072-0087-0032-00e10034009e.png",
        "timestamp": 1541444665677,
        "duration": 6081
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2632,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005d0010-00b1-005c-0092-00cd00b200fa.png",
        "timestamp": 1541444672083,
        "duration": 58
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2632,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dd00a6-0017-001f-00f5-008d00540010.png",
        "timestamp": 1541444672435,
        "duration": 98
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2632,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00970032-007d-0073-0064-005f003b001d.png",
        "timestamp": 1541444672860,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2632,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006200a7-00b5-007d-000f-00fd00bc0065.png",
        "timestamp": 1541444673295,
        "duration": 454
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15648,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007c007c-00c9-0007-0072-00cc001a00ed.png",
        "timestamp": 1541444792173,
        "duration": 6971
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15648,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008300e3-00aa-00d2-0017-00c200b80082.png",
        "timestamp": 1541444799455,
        "duration": 51
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15648,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006600b2-005d-00f4-0096-001500920019.png",
        "timestamp": 1541444799800,
        "duration": 118
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15648,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0059001c-005b-0041-0064-006f003b00d6.png",
        "timestamp": 1541444800232,
        "duration": 91
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15648,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009500a0-0055-008a-0060-0004003c0062.png",
        "timestamp": 1541444800692,
        "duration": 454
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22232,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fa0056-00aa-003f-0072-00ca00c80088.png",
        "timestamp": 1541447265661,
        "duration": 6004
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22232,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0017009e-0008-00c7-00bf-00a100590079.png",
        "timestamp": 1541447271996,
        "duration": 64
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22232,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00eb0085-00d6-0048-00b8-005a00e500e2.png",
        "timestamp": 1541447272364,
        "duration": 2
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22232,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bb0042-0074-008a-0071-0050009c009f.png",
        "timestamp": 1541447272683,
        "duration": 2
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22232,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0064002e-0006-00f2-0041-000e005000c9.png",
        "timestamp": 1541447272993,
        "duration": 5
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22232,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006600a0-0071-007a-0028-00bd007f0029.png",
        "timestamp": 1541447273460,
        "duration": 2
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22232,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009500b0-0047-008f-002e-0086003800da.png",
        "timestamp": 1541447273813,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21524,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00560055-001b-00a4-00f3-00b400ae0006.png",
        "timestamp": 1541447407995,
        "duration": 4
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21524,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ee00b6-00f0-00e8-000b-004600250014.png",
        "timestamp": 1541447414138,
        "duration": 7
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21524,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a700b2-002c-00f0-00c5-008d006800fc.png",
        "timestamp": 1541447414451,
        "duration": 2
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21524,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004a0020-0093-006c-0050-006700a600be.png",
        "timestamp": 1541447414796,
        "duration": 2
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21524,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c50035-00e8-0038-00f8-003100d200c3.png",
        "timestamp": 1541447415138,
        "duration": 7
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21524,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f7007a-00c1-0014-00fc-00cd00590091.png",
        "timestamp": 1541447415532,
        "duration": 2
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21524,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b70080-000a-00c3-00e2-004b00e5006f.png",
        "timestamp": 1541447415947,
        "duration": 2
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5572,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003d00e6-006f-00bf-0048-003e0096008b.png",
        "timestamp": 1541447465874,
        "duration": 19381
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5572,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0098004d-00fa-0010-005f-0075003f00d5.png",
        "timestamp": 1541447485597,
        "duration": 65
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5572,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003d004a-0008-0076-00ae-00a6000300db.png",
        "timestamp": 1541447485934,
        "duration": 112
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5572,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009100e7-0003-0025-00fb-0050008200b8.png",
        "timestamp": 1541447486345,
        "duration": 91
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5572,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0067004f-00d5-0011-009c-00da00f700b2.png",
        "timestamp": 1541447486727,
        "duration": 459
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a800ff-0037-00ac-0049-0030003d00d2.png",
        "timestamp": 1541455240436,
        "duration": 7676
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00dd004e-003e-0083-009f-00b300ed00f0.png",
        "timestamp": 1541455248516,
        "duration": 51
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b3005b-006a-004d-005d-002300300035.png",
        "timestamp": 1541455248834,
        "duration": 117
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0057008a-006a-0064-00e4-0099009b009e.png",
        "timestamp": 1541455249242,
        "duration": 100
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ec0028-0010-00d6-0092-000c00a70047.png",
        "timestamp": 1541455249675,
        "duration": 484
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00690050-0038-0030-004c-00fe00a200c2.png",
        "timestamp": 1541455493034,
        "duration": 4552
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009300bd-0086-00c0-0033-007e00330088.png",
        "timestamp": 1541455497940,
        "duration": 70
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ad00e3-006a-00dd-0091-008000f90034.png",
        "timestamp": 1541455498283,
        "duration": 97
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001a0016-00dd-00d7-000b-002e00a80048.png",
        "timestamp": 1541455498671,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0024009f-001c-000f-0012-001200b000c4.png",
        "timestamp": 1541455499181,
        "duration": 444
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008f0055-0031-00bd-007d-009e0098008e.png",
        "timestamp": 1541456531296,
        "duration": 1700
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b60077-0063-0033-00d2-00b700010027.png",
        "timestamp": 1541456533335,
        "duration": 64
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c40015-00f3-0028-0003-008000a00087.png",
        "timestamp": 1541456533736,
        "duration": 103
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d600ba-001b-00ea-0091-008900b100d5.png",
        "timestamp": 1541456534131,
        "duration": 116
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c100dd-004c-0081-00c3-009d007700d9.png",
        "timestamp": 1541456534553,
        "duration": 536
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dc00c3-0029-0073-00b1-000000ee00fa.png",
        "timestamp": 1541458260995,
        "duration": 1583
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004300ab-00f2-00e5-004c-001800eb006b.png",
        "timestamp": 1541458262886,
        "duration": 59
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d20034-00a0-0061-0035-0075005b0007.png",
        "timestamp": 1541458263228,
        "duration": 100
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008200cd-0022-002c-00ef-0075002700e2.png",
        "timestamp": 1541458263640,
        "duration": 112
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e00045-0041-007d-00fc-007b004400c9.png",
        "timestamp": 1541458264076,
        "duration": 662
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed00a6-000a-00a8-0089-002d00c900a5.png",
        "timestamp": 1541458659887,
        "duration": 1365
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fe00cd-00d9-00b9-00c4-006600ce003e.png",
        "timestamp": 1541458661613,
        "duration": 66
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00780042-00fa-0069-005f-00d4007a00c6.png",
        "timestamp": 1541458661962,
        "duration": 270
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d40095-0024-000f-0029-00dc00c00086.png",
        "timestamp": 1541458662540,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ea00e5-00ab-00ee-00dc-00e4001c006d.png",
        "timestamp": 1541458663012,
        "duration": 480
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009f0046-00b8-0079-002b-0011003f0004.png",
        "timestamp": 1541527823354,
        "duration": 4432
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0007004f-008f-0027-0037-005e00bc0054.png",
        "timestamp": 1541527828171,
        "duration": 51
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0060002d-0093-0094-003d-0007008a00ee.png",
        "timestamp": 1541527828515,
        "duration": 130
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005b00ae-00b1-000e-002a-0015003d006c.png",
        "timestamp": 1541527829032,
        "duration": 105
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003d000d-0017-00d7-00d1-00d100de00e5.png",
        "timestamp": 1541527829446,
        "duration": 1222
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14840,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009f0001-0029-004d-00a2-001f009000a5.png",
        "timestamp": 1541601726354,
        "duration": 16962
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14840,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00440034-0072-003b-0094-00fb0076002d.png",
        "timestamp": 1541601743713,
        "duration": 62
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14840,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00890048-007d-0004-00f1-00db001f00a2.png",
        "timestamp": 1541601744077,
        "duration": 96
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14840,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e1001b-00c6-001f-0067-00e800c000a9.png",
        "timestamp": 1541601744628,
        "duration": 92
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14840,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ec007b-0022-00d6-00cb-008f007600d7.png",
        "timestamp": 1541601745066,
        "duration": 2011
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 14840,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001500e6-008e-00dc-0016-00e400b4003f.png",
        "timestamp": 1541601747424,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14840,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://v2.zopim.com/bin/v/widget_v2.271.js 39223 WebSocket connection to 'wss://us30.zopim.com/s/W/ws/JhC29wUo7h0PAA7U/c/1541601734650' failed: No handshake stream has been created.",
                "timestamp": 1541601747477,
                "type": ""
            }
        ],
        "screenShotFile": "0040000b-00cf-006b-00a2-00dd006500ee.png",
        "timestamp": 1541601747453,
        "duration": 129
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23172,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009e00eb-008c-0019-0026-0087002b0071.png",
        "timestamp": 1541601974812,
        "duration": 5022
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23172,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0026006c-0025-001d-0010-008400b900e7.png",
        "timestamp": 1541601980162,
        "duration": 68
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23172,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006200e5-00f5-007c-00c6-00ef00ea006d.png",
        "timestamp": 1541601980510,
        "duration": 72
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23172,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fb00c2-005b-0083-0057-0066005200a2.png",
        "timestamp": 1541601980917,
        "duration": 109
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23172,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000e00ed-0092-0076-00ad-00d100d0005b.png",
        "timestamp": 1541601981359,
        "duration": 2013
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 23172,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0099005e-00c2-0088-003e-0006003000d0.png",
        "timestamp": 1541601983670,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23172,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002d002a-00e6-0026-00b7-009e00090085.png",
        "timestamp": 1541601983717,
        "duration": 125
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0076000e-003f-0074-003d-0079004e004f.png",
        "timestamp": 1541602519665,
        "duration": 5716
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0028005d-007a-0006-0022-00b800f20036.png",
        "timestamp": 1541602525710,
        "duration": 56
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00990020-00f3-00f8-009d-00680055002c.png",
        "timestamp": 1541602526057,
        "duration": 89
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00490096-004c-00b2-0035-00b3009200ff.png",
        "timestamp": 1541602526604,
        "duration": 119
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008100e4-004f-0064-007d-001300bf0025.png",
        "timestamp": 1541602527211,
        "duration": 2000
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 1672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a00079-0013-0046-002d-00a800e80025.png",
        "timestamp": 1541602529531,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1672,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001600f7-00de-0055-00f6-00b2003500fd.png",
        "timestamp": 1541602529578,
        "duration": 131
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22072,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00aa00d8-0014-00af-0088-00ef0035005c.png",
        "timestamp": 1541602707996,
        "duration": 7424
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22072,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0007009e-00ff-0049-0072-007e00f30009.png",
        "timestamp": 1541602715775,
        "duration": 57
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22072,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b2003f-0032-0081-0074-00ba003f00a0.png",
        "timestamp": 1541602716125,
        "duration": 112
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22072,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003b00e1-005b-0097-00fb-00bc00230030.png",
        "timestamp": 1541602716559,
        "duration": 97
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22072,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005300d2-0043-00a8-00d0-005000350089.png",
        "timestamp": 1541602717179,
        "duration": 2032
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 22072,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00930076-00aa-00a7-0030-0003006000e7.png",
        "timestamp": 1541602719526,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22072,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007a00db-001f-0008-009a-005d00a30023.png",
        "timestamp": 1541602719558,
        "duration": 145
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17932,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009b004a-00b2-00ea-0086-00f200150073.png",
        "timestamp": 1541603282292,
        "duration": 3511
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17932,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00bc0059-004f-00c7-0031-00c400680046.png",
        "timestamp": 1541603286141,
        "duration": 57
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17932,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a60021-0073-004a-00c3-0063008f006e.png",
        "timestamp": 1541603286487,
        "duration": 82
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17932,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001000a5-0079-00c4-0020-005900d100d3.png",
        "timestamp": 1541603286898,
        "duration": 111
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17932,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009400a4-0064-003a-00a7-00aa00b10060.png",
        "timestamp": 1541603287327,
        "duration": 2028
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 17932,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005a0028-0089-0072-0005-000b00af000a.png",
        "timestamp": 1541603289663,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17932,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009300a7-004e-0025-0072-004000bb0052.png",
        "timestamp": 1541603289694,
        "duration": 140
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0077008c-0013-000e-00c4-002900ea00f9.png",
        "timestamp": 1541603772087,
        "duration": 7581
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002100fe-0023-0064-000c-007400ca0031.png",
        "timestamp": 1541603779994,
        "duration": 51
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006500ba-00e1-0043-0033-00760033009b.png",
        "timestamp": 1541603780324,
        "duration": 109
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0042000b-00c9-0059-00fc-001000c80093.png",
        "timestamp": 1541603780849,
        "duration": 110
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:64:13)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:184:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ec0056-0021-009a-001a-006800b200b8.png",
        "timestamp": 1541603781440,
        "duration": 42
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 11084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0029001f-00b8-0071-006b-006800a00062.png",
        "timestamp": 1541603781819,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11084,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fa002e-00ea-006a-0092-0040001b0070.png",
        "timestamp": 1541603781841,
        "duration": 128
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007000b8-00a7-004a-008a-00e1004500c2.png",
        "timestamp": 1541603932211,
        "duration": 5832
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fa009c-0017-005c-004b-00b9006d0012.png",
        "timestamp": 1541603938377,
        "duration": 51
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00260081-003b-0083-00fc-0062009f0083.png",
        "timestamp": 1541603938728,
        "duration": 73
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00da002f-008d-0060-001b-00730008002d.png",
        "timestamp": 1541603939119,
        "duration": 109
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:64:13)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:184:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00820009-0058-0028-0066-000a007b0084.png",
        "timestamp": 1541603939688,
        "duration": 48
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 5424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006d003d-00c1-0003-0047-008300c000e8.png",
        "timestamp": 1541603940082,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f90066-00bb-00fb-007a-000c00df00f2.png",
        "timestamp": 1541603940104,
        "duration": 117
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00370049-00c2-00eb-00fe-00ad009c0001.png",
        "timestamp": 1541604122906,
        "duration": 4228
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0000005a-0092-0021-00fd-00fe00580053.png",
        "timestamp": 1541604127466,
        "duration": 82
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d1004c-00dc-005b-000b-0015001e004f.png",
        "timestamp": 1541604127828,
        "duration": 85
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0087002f-0064-0072-003b-00cf00dd00d5.png",
        "timestamp": 1541604128207,
        "duration": 121
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:64:13)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:184:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004d0090-0016-000e-00f2-003c00af00ff.png",
        "timestamp": 1541604128678,
        "duration": 15
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 19344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000c0096-0054-0073-0087-00f1009000eb.png",
        "timestamp": 1541604129140,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ea00e8-00d5-0080-004f-002e009700a9.png",
        "timestamp": 1541604129184,
        "duration": 150
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19940,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004e008e-008d-00a2-00b1-00e70034007a.png",
        "timestamp": 1541604294777,
        "duration": 3914
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19940,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a600f7-0070-00db-0017-006b004d00a3.png",
        "timestamp": 1541604299039,
        "duration": 65
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19940,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005100c5-00d3-009d-00e4-00ce00910042.png",
        "timestamp": 1541604299402,
        "duration": 89
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19940,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f9001a-002d-00fc-0052-00b800a700c7.png",
        "timestamp": 1541604299799,
        "duration": 110
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19940,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004e00ba-007b-00a1-00d1-00780060009d.png",
        "timestamp": 1541604300469,
        "duration": 78
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 19940,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c400e6-0097-0037-00cd-009d00f600ff.png",
        "timestamp": 1541604300874,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19940,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00040004-009f-00f5-00ca-007a00d10020.png",
        "timestamp": 1541604300923,
        "duration": 114
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00db00c7-00db-0076-0057-00d100b30009.png",
        "timestamp": 1541604567287,
        "duration": 5493
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fa00eb-0075-0000-0030-00bd008a0019.png",
        "timestamp": 1541604573162,
        "duration": 47
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cd004a-00d0-00f0-00b1-00270024000b.png",
        "timestamp": 1541604573510,
        "duration": 84
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0031001b-00ab-009d-0096-00b90061007b.png",
        "timestamp": 1541604573937,
        "duration": 110
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0065009d-00b9-0035-0096-006300fc0089.png",
        "timestamp": 1541604574416,
        "duration": 95
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e90071-00c4-000d-0067-00d000d500c7.png",
        "timestamp": 1541604574842,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00920089-0048-001c-000b-00f4001a002c.png",
        "timestamp": 1541604574873,
        "duration": 132
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0030003d-00e3-00eb-005d-00640005006b.png",
        "timestamp": 1541604690926,
        "duration": 3518
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007b0073-00d0-000b-00f0-009400fb00d4.png",
        "timestamp": 1541604694776,
        "duration": 70
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00680097-00d5-00e8-00c2-005c0007002f.png",
        "timestamp": 1541604695143,
        "duration": 81
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003d0057-0007-00a8-00da-00750021006a.png",
        "timestamp": 1541604695553,
        "duration": 102
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a10064-0008-0034-00f1-0093003700ef.png",
        "timestamp": 1541604696107,
        "duration": 79
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 9744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001c009e-00de-001a-00ea-00d700a60053.png",
        "timestamp": 1541604696495,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003a0095-0000-0011-00b0-00ac00b60014.png",
        "timestamp": 1541604696527,
        "duration": 110
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e700ba-0069-0078-0076-00ed001e0004.png",
        "timestamp": 1541604927322,
        "duration": 3181
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003300e5-003d-000d-0032-00c7000d008a.png",
        "timestamp": 1541604930834,
        "duration": 70
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00780019-003a-0081-00e3-007d005e0067.png",
        "timestamp": 1541604931213,
        "duration": 84
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004b009c-00f5-0002-0080-001000f200ab.png",
        "timestamp": 1541604931618,
        "duration": 117
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:64:13)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a80082-00e8-00f3-008b-001800060041.png",
        "timestamp": 1541604932081,
        "duration": 27
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 19892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ae00a4-0021-00b7-0004-00bf00eb00dc.png",
        "timestamp": 1541604932415,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19892,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ff0022-0025-00e2-0025-00b000440062.png",
        "timestamp": 1541604932455,
        "duration": 359
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00da00b3-00a6-009d-0041-00a800e6008e.png",
        "timestamp": 1541605050977,
        "duration": 8732
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00160007-0075-00bb-00ca-00de00a600f6.png",
        "timestamp": 1541605060084,
        "duration": 68
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008600ec-0063-00f7-00e3-006e005300b4.png",
        "timestamp": 1541605060455,
        "duration": 72
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008f0079-006a-0043-00ed-00ad001800c2.png",
        "timestamp": 1541605060906,
        "duration": 122
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009d0008-001e-003b-0047-007f00480057.png",
        "timestamp": 1541605061395,
        "duration": 69
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 21252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00570040-0021-009c-0036-00b800ac0093.png",
        "timestamp": 1541605061793,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0038003a-0046-0000-0036-0057004e00b5.png",
        "timestamp": 1541605061839,
        "duration": 100
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13356,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00010021-00ae-00af-00ba-00e100910068.png",
        "timestamp": 1541608153493,
        "duration": 4352
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13356,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009d00ce-00fe-0086-0044-009e000100b4.png",
        "timestamp": 1541608158178,
        "duration": 71
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13356,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0043005c-0084-009d-00f0-003d009e008e.png",
        "timestamp": 1541608158549,
        "duration": 76
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13356,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009d00bf-00d4-0023-003b-002900ce0031.png",
        "timestamp": 1541608158945,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13356,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0028001f-00e4-002f-0039-00b1008f0004.png",
        "timestamp": 1541608159389,
        "duration": 67
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13356,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00cd00c0-0032-00ec-00b3-004000a60034.png",
        "timestamp": 1541608159789,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13356,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005f0072-006a-0013-00a3-008900bc00a0.png",
        "timestamp": 1541608159827,
        "duration": 94
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f200e8-002c-0029-0048-008100910065.png",
        "timestamp": 1541608212849,
        "duration": 2950
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0080008b-0087-00d8-0073-00de008000af.png",
        "timestamp": 1541608216130,
        "duration": 65
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e40023-001a-0095-0047-005100b300f5.png",
        "timestamp": 1541608216470,
        "duration": 69
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c00028-0037-006b-0088-0064003800dd.png",
        "timestamp": 1541608216866,
        "duration": 124
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001d0017-00ee-005c-00ff-00b600c30044.png",
        "timestamp": 1541608217451,
        "duration": 67
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002f00de-00c3-00f6-00af-0029009f0018.png",
        "timestamp": 1541608217843,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15992,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bf00ec-0076-00ee-001e-00e70011007e.png",
        "timestamp": 1541608217886,
        "duration": 96
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23168,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b1004a-0046-0088-0016-0071006200ac.png",
        "timestamp": 1541608321142,
        "duration": 5329
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23168,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0018007d-0090-00f1-0072-005e009c0084.png",
        "timestamp": 1541608326795,
        "duration": 55
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23168,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f400b6-00e9-0021-004b-00c900ae0074.png",
        "timestamp": 1541608327135,
        "duration": 80
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23168,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006c005a-0005-005b-002d-00a200120078.png",
        "timestamp": 1541608327531,
        "duration": 94
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23168,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00de001c-00eb-008d-00d5-001a00d90012.png",
        "timestamp": 1541608327986,
        "duration": 88
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 23168,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004600b7-00b1-001b-007f-007100d800ea.png",
        "timestamp": 1541608328401,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23168,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c20076-0037-0005-00d9-001a006a00b5.png",
        "timestamp": 1541608328424,
        "duration": 110
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23112,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006d0077-0015-0095-00e1-009a00cc00d7.png",
        "timestamp": 1541608606433,
        "duration": 6660
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23112,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0067007c-004e-003b-0030-007100bf004f.png",
        "timestamp": 1541608613420,
        "duration": 70
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23112,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000f00f8-0078-0095-0077-001c0032007c.png",
        "timestamp": 1541608613799,
        "duration": 71
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23112,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f4000e-0060-0059-00f9-009000c500a6.png",
        "timestamp": 1541608614247,
        "duration": 117
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23112,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:65:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0025007b-00e3-00e8-009e-001a00e9004b.png",
        "timestamp": 1541608614737,
        "duration": 31
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 23112,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00790047-0050-00e0-0013-006700040089.png",
        "timestamp": 1541608615098,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23112,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00530040-00e8-0093-00f0-00c3008a00c9.png",
        "timestamp": 1541608615141,
        "duration": 100
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00270090-0024-00e9-00f8-00fe0095006c.png",
        "timestamp": 1541609698975,
        "duration": 2095
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008200b5-0066-0084-00b2-002f000900a1.png",
        "timestamp": 1541609701415,
        "duration": 82
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b700ed-00c0-009a-00d7-00d90071007e.png",
        "timestamp": 1541609701824,
        "duration": 80
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0041009a-0051-0025-00a2-00bc00ba00ad.png",
        "timestamp": 1541609702217,
        "duration": 367
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:70:34)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "002e00bb-0040-004b-0021-006200a40045.png",
        "timestamp": 1541609703040,
        "duration": 5
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0026002c-00f2-0026-00f4-009700370062.png",
        "timestamp": 1541609703349,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006100f8-0055-0060-0019-00d100680000.png",
        "timestamp": 1541609703369,
        "duration": 131
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14448,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006300e1-0052-00a7-0025-007e009c004a.png",
        "timestamp": 1541609865741,
        "duration": 5469
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14448,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00bd00f5-00e1-007e-0067-00f400d300dc.png",
        "timestamp": 1541609871537,
        "duration": 60
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14448,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004200fd-0010-000a-0083-00fb0045005c.png",
        "timestamp": 1541609871900,
        "duration": 87
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14448,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00450032-006a-00f6-0096-001d0099001c.png",
        "timestamp": 1541609872309,
        "duration": 94
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14448,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:70:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "002b008a-0023-0006-00a1-008d008300ac.png",
        "timestamp": 1541609872770,
        "duration": 31
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 14448,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004d00ff-009b-003e-0095-00c300f2006d.png",
        "timestamp": 1541609873145,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14448,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e90040-0050-0071-0046-001d002c0011.png",
        "timestamp": 1541609873178,
        "duration": 128
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18612,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008d0002-0037-00d1-0049-008900ab00ca.png",
        "timestamp": 1541610242495,
        "duration": 7278
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18612,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e400e5-0078-0056-0003-004600e60052.png",
        "timestamp": 1541610250093,
        "duration": 85
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18612,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002f00e8-00d9-007c-00e9-00c300ab002b.png",
        "timestamp": 1541610250484,
        "duration": 89
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18612,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00150046-0078-0013-0085-002b0054002f.png",
        "timestamp": 1541610250970,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18612,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:70:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "005c0025-009a-0088-005d-00a900b1001d.png",
        "timestamp": 1541610251544,
        "duration": 38
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 18612,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a000ff-007f-0030-004f-00ec00a60075.png",
        "timestamp": 1541610251878,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18612,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00340089-00a7-006f-0026-00a5000400ed.png",
        "timestamp": 1541610251926,
        "duration": 153
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006f00ac-00e1-0099-00df-000400380018.png",
        "timestamp": 1541610864569,
        "duration": 4270
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006a00d6-00e5-00e6-000d-005700000053.png",
        "timestamp": 1541610869190,
        "duration": 75
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007e00e5-000a-00df-0093-00de00cb0046.png",
        "timestamp": 1541610869569,
        "duration": 82
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bf0086-0001-00c3-0041-00c8007100b0.png",
        "timestamp": 1541610869976,
        "duration": 122
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:71:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:71:53)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:71:89)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "001000ed-0035-000c-0007-006a00f70009.png",
        "timestamp": 1541610870504,
        "duration": 47
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 12980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006f00d7-006e-0067-00d2-00b5006b0097.png",
        "timestamp": 1541610870858,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0016000c-0046-00b2-0076-00ad00510092.png",
        "timestamp": 1541610870904,
        "duration": 117
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8368,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f200ee-002c-00a7-00fa-00f7006a0010.png",
        "timestamp": 1541611204719,
        "duration": 4618
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8368,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009e0011-00ee-0035-001d-0017001200db.png",
        "timestamp": 1541611209684,
        "duration": 71
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8368,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a000ff-000b-00af-00dc-00b6002c008f.png",
        "timestamp": 1541611210058,
        "duration": 88
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8368,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f400b3-00f5-00b3-00bc-0023005400a9.png",
        "timestamp": 1541611210468,
        "duration": 112
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8368,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:57)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:93)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "005700ba-005d-00e5-00b7-0039004b0091.png",
        "timestamp": 1541611211068,
        "duration": 80
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 8368,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00780010-00b1-009e-0016-0073005c0012.png",
        "timestamp": 1541611211454,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8368,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003800fb-0090-007a-0033-0061009e0096.png",
        "timestamp": 1541611211502,
        "duration": 111
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20916,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ba0042-00ad-003f-00d5-00ab002f0001.png",
        "timestamp": 1541611773938,
        "duration": 9685
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20916,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0043009d-003a-00f9-00f0-00f4003e007b.png",
        "timestamp": 1541611783982,
        "duration": 80
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20916,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00260052-0002-0070-0059-00da000b0002.png",
        "timestamp": 1541611784359,
        "duration": 74
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20916,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006500b0-00d5-0088-00e9-004e00140010.png",
        "timestamp": 1541611784874,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20916,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00da000c-0072-003d-009b-00b0006d00f4.png",
        "timestamp": 1541611785355,
        "duration": 65
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 20916,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "000500d6-0016-00d8-0031-005b00a3001f.png",
        "timestamp": 1541611785745,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20916,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002f0088-00f1-0026-00d3-00d600da00cb.png",
        "timestamp": 1541611785787,
        "duration": 111
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00380081-0042-001e-00af-008900480014.png",
        "timestamp": 1541614298632,
        "duration": 2871
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a100de-00eb-00c1-00d0-0004007800db.png",
        "timestamp": 1541614301842,
        "duration": 67
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c10019-0022-00e8-00ed-000100270089.png",
        "timestamp": 1541614302179,
        "duration": 100
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004a0080-0074-0047-00af-00dd007e0060.png",
        "timestamp": 1541614302620,
        "duration": 120
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "003d0024-009d-0087-00da-00ca00d100f2.png",
        "timestamp": 1541614303225,
        "duration": 75
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 22664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00da005c-0059-008a-0040-001300a3009b.png",
        "timestamp": 1541614303617,
        "duration": 16
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0057003e-00f5-0071-0072-0025003400a3.png",
        "timestamp": 1541614303683,
        "duration": 121
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0097006a-003a-00cb-00fb-00d300100036.png",
        "timestamp": 1541614467725,
        "duration": 2291
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00360013-0086-004c-00e9-00b900890072.png",
        "timestamp": 1541614470359,
        "duration": 64
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000400d1-001c-00c4-0006-00c0004a00df.png",
        "timestamp": 1541614470721,
        "duration": 88
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001a0010-001c-0052-0043-008d00260023.png",
        "timestamp": 1541614471220,
        "duration": 124
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00830048-00ee-0073-00dc-006600480073.png",
        "timestamp": 1541614471886,
        "duration": 77
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "003f0035-00cd-0082-006c-008d00e00007.png",
        "timestamp": 1541614472323,
        "duration": 0
    },
    {
        "description": "Add Customers Screen:  Click the Home button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21640,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0042006d-00bc-0018-0026-00ef009600b9.png",
        "timestamp": 1541614472361,
        "duration": 118
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00680093-0072-000c-00ac-000900da007e.png",
        "timestamp": 1541614687359,
        "duration": 8663
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0051006d-00d3-00c8-007c-00ff009f007f.png",
        "timestamp": 1541614696380,
        "duration": 49
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002400c9-006b-006a-004c-006900910023.png",
        "timestamp": 1541614696745,
        "duration": 89
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000000d2-005b-00be-00c9-004d0005008a.png",
        "timestamp": 1541614697217,
        "duration": 133
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:186:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:181:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b100de-002b-007b-0071-00a400e600cd.png",
        "timestamp": 1541614697696,
        "duration": 76
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 24196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "004f00d6-00ee-0036-0086-00ec002300dd.png",
        "timestamp": 1541614698106,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dc0036-00dc-0029-0018-008e00f500fd.png",
        "timestamp": 1541708798866,
        "duration": 7872
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e30048-001c-005e-0005-00d70081008e.png",
        "timestamp": 1541708807124,
        "duration": 68
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d1001a-003b-005e-00df-00b9005200e8.png",
        "timestamp": 1541708807479,
        "duration": 100
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007a00ce-00da-000d-00d9-00df009c003b.png",
        "timestamp": 1541708807891,
        "duration": 107
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:188:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:183:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:123:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bc0007-00cb-002c-00fb-004c00430004.png",
        "timestamp": 1541708808325,
        "duration": 79
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 9292,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00140040-003b-00cf-0060-007c0095005e.png",
        "timestamp": 1541708808717,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1412,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007f002d-008d-006d-0027-005500f30012.png",
        "timestamp": 1541708930957,
        "duration": 3995
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1412,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d10058-00bc-0083-0040-0049003a00df.png",
        "timestamp": 1541708935301,
        "duration": 51
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1412,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003000c2-005c-00db-0027-001b00eb001a.png",
        "timestamp": 1541708935670,
        "duration": 100
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1412,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b8009c-007b-005c-0026-0070007f007a.png",
        "timestamp": 1541708936169,
        "duration": 106
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1412,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:185:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:123:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ac0060-0015-0020-0054-005d00f000db.png",
        "timestamp": 1541708936718,
        "duration": 89
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 1412,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e300ad-0031-002c-00cd-0078005a00c9.png",
        "timestamp": 1541708937124,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d90054-009f-007c-00ac-0071008d0013.png",
        "timestamp": 1541709015640,
        "duration": 3015
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ae00d8-0065-00c1-00b1-000300b00050.png",
        "timestamp": 1541709018996,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000500fc-00d9-00ce-005d-00f600750068.png",
        "timestamp": 1541709019383,
        "duration": 89
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007000ec-000f-00cb-00e7-002400850076.png",
        "timestamp": 1541709019793,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:185:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:123:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "007400b6-0053-0096-0020-00ed00f500e5.png",
        "timestamp": 1541709020242,
        "duration": 83
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 24016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a800f5-0069-009b-0007-000f00e900bf.png",
        "timestamp": 1541709020643,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18900,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: DataProvider1 is not defined"
        ],
        "trace": [
            "ReferenceError: DataProvider1 is not defined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:137:33\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at fulfilled (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Launch XYZ Bank Application:  Open Browser and Navigate to URL\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:130:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fb0095-00ad-00d2-0082-0052006c00f9.png",
        "timestamp": 1541709642172,
        "duration": 4079
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18900,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001a003e-008e-0099-0042-00f1008a00f5.png",
        "timestamp": 1541709646617,
        "duration": 58
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18900,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009300ed-0082-008d-00b6-0026002300aa.png",
        "timestamp": 1541709646975,
        "duration": 110
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18900,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009000a4-00ae-00a3-007a-0059003b00cd.png",
        "timestamp": 1541709647408,
        "duration": 128
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18900,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:194:43)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:189:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bf00aa-0072-0031-0006-002a00950037.png",
        "timestamp": 1541709648076,
        "duration": 85
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 18900,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001a0060-00ca-0014-008e-0030008c008c.png",
        "timestamp": 1541709648486,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e00078-006a-00fd-00ab-0049005e005b.png",
        "timestamp": 1541709764845,
        "duration": 8519
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "000a008b-00bc-00a1-00d7-00aa007000ab.png",
        "timestamp": 1541709773725,
        "duration": 61
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00020017-0062-0047-000f-000200430048.png",
        "timestamp": 1541709774100,
        "duration": 112
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ca0013-00ff-00ae-0087-005f003600b3.png",
        "timestamp": 1541709774557,
        "duration": 127
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:195:43)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "00510016-004e-0013-0035-00b90056006b.png",
        "timestamp": 1541709775213,
        "duration": 78
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 23208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a60040-007e-00c8-0064-002000040021.png",
        "timestamp": 1541709775598,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000400e3-00b7-0095-00b7-009800fc00c7.png",
        "timestamp": 1541710043400,
        "duration": 2460
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005600dd-00fd-003c-0011-00fa006500d6.png",
        "timestamp": 1541710046219,
        "duration": 53
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fd00a5-00bd-00d0-00ab-007b00d90086.png",
        "timestamp": 1541710046620,
        "duration": 87
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00110007-00dd-005c-0046-00f900ad0003.png",
        "timestamp": 1541710047051,
        "duration": 129
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:197:43)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fe0037-00f0-0016-0055-00df007f00ef.png",
        "timestamp": 1541710047718,
        "duration": 88
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 3816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005e00d4-0082-00b2-006b-008300cc00e5.png",
        "timestamp": 1541710048106,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13736,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d300c8-00ad-00b3-00ff-007b00dd00d2.png",
        "timestamp": 1541710080852,
        "duration": 4918
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13736,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007600bb-007d-0039-006b-003c00bc0002.png",
        "timestamp": 1541710086143,
        "duration": 62
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13736,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00100086-004f-006e-0077-001b002200f2.png",
        "timestamp": 1541710086517,
        "duration": 89
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13736,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c4004f-0077-00b3-00f3-006100c30052.png",
        "timestamp": 1541710086922,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13736,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "WebDriverError: unknown error: cannot focus element\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:73:21)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:197:43)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "005600a5-00db-00f9-00f3-000400ca00f4.png",
        "timestamp": 1541710087769,
        "duration": 93
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13736,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ce00c1-0005-00a3-00d6-0035001500a4.png",
        "timestamp": 1541710088159,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23660,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002f0030-00d7-0069-006f-00ee00fa00ee.png",
        "timestamp": 1541710268447,
        "duration": 4670
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23660,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ec00f7-002e-00e2-00c6-0001009100d1.png",
        "timestamp": 1541710273456,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23660,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f300f2-00ec-00c4-0000-00b7008b00b5.png",
        "timestamp": 1541710273840,
        "duration": 92
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23660,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006b00d9-001a-00c1-00ac-00e600a4003f.png",
        "timestamp": 1541710274265,
        "duration": 105
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23660,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ad0034-00b3-0073-0066-003f005d0067.png",
        "timestamp": 1541710274910,
        "duration": 93
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 23660,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00290006-00ec-005c-00d2-000c009d00ce.png",
        "timestamp": 1541710275358,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b1003b-0023-0036-0034-00f500350066.png",
        "timestamp": 1541710384883,
        "duration": 2971
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d700ac-002d-00a1-00c0-00f700b1004a.png",
        "timestamp": 1541710388211,
        "duration": 76
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a70095-0021-0073-0003-0002003100b7.png",
        "timestamp": 1541710388578,
        "duration": 101
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00390090-00fd-006b-0093-00e000ec0012.png",
        "timestamp": 1541710388982,
        "duration": 119
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00280050-00e0-006a-000e-006c005000d9.png",
        "timestamp": 1541710389465,
        "duration": 271
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 18856,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00e800d4-00f2-0084-001f-005600690031.png",
        "timestamp": 1541710390089,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11104,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f70036-00d9-00ec-00ad-002a00630080.png",
        "timestamp": 1541710696694,
        "duration": 5701
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11104,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0010006b-0067-000c-00b9-003400b5001c.png",
        "timestamp": 1541710702731,
        "duration": 53
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11104,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005600d8-007b-00eb-0049-00a400f90038.png",
        "timestamp": 1541710703085,
        "duration": 96
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11104,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0033000d-00d7-0059-00fc-002b00ca004b.png",
        "timestamp": 1541710703508,
        "duration": 119
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11104,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006900bb-00ac-0084-00a2-00d00039004c.png",
        "timestamp": 1541710703971,
        "duration": 106
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 11104,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b100b0-00bb-002f-0023-00a0003700f8.png",
        "timestamp": 1541710704386,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10872,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001500ed-00a2-0064-00ee-00f800680013.png",
        "timestamp": 1541710853846,
        "duration": 4762
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10872,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e100c2-0026-0064-0020-002800d40010.png",
        "timestamp": 1541710858965,
        "duration": 53
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10872,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008f0098-00d7-00c6-0002-000f007c0047.png",
        "timestamp": 1541710859321,
        "duration": 103
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10872,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d10082-004f-00e5-0091-006e00790061.png",
        "timestamp": 1541710859754,
        "duration": 100
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10872,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009700d4-0061-0079-00fa-00e300e400dc.png",
        "timestamp": 1541710860238,
        "duration": 66
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 10872,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0041002b-00cb-00be-001d-0092005c0059.png",
        "timestamp": 1541710860666,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00620098-00df-00b3-004b-00e900ee00e0.png",
        "timestamp": 1541711268819,
        "duration": 5513
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ea00c7-0000-00d2-0001-008600d800a0.png",
        "timestamp": 1541711274679,
        "duration": 59
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0026006e-00d2-00da-00ba-00f8006e0016.png",
        "timestamp": 1541711275039,
        "duration": 101
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001d0002-00df-00eb-00f6-003c000300b6.png",
        "timestamp": 1541711275470,
        "duration": 150
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'mySendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'mySendKeys' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:68:18\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "009200f1-0097-00ae-0084-003100e60031.png",
        "timestamp": 1541711276077,
        "duration": 49
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 8200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c40022-006f-009f-0075-008d0058006a.png",
        "timestamp": 1541711276426,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23456,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000c005d-00f5-0009-009d-00bb00200074.png",
        "timestamp": 1541711374355,
        "duration": 5928
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23456,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00aa00ec-008b-00bd-0010-00d6004f001f.png",
        "timestamp": 1541711380631,
        "duration": 57
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23456,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00200014-0028-0021-009f-00ce008600b8.png",
        "timestamp": 1541711380978,
        "duration": 88
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23456,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0053008a-00d8-00da-0004-0065009000c1.png",
        "timestamp": 1541711381411,
        "duration": 106
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23456,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:68:18\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b20051-0001-00a4-002a-005400200014.png",
        "timestamp": 1541711381981,
        "duration": 53
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 23456,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ca002a-004f-002e-000f-001500e800d9.png",
        "timestamp": 1541711382365,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24040,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0080004c-00eb-0019-00b0-004a005700f2.png",
        "timestamp": 1541711504318,
        "duration": 3246
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24040,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006c00ed-007d-00b0-00db-00e7008700b6.png",
        "timestamp": 1541711507905,
        "duration": 47
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24040,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c900d9-0030-00d9-00e4-0093008800bb.png",
        "timestamp": 1541711508252,
        "duration": 86
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24040,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007100fd-00d7-007f-006a-002e0017007c.png",
        "timestamp": 1541711508682,
        "duration": 102
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24040,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'browser' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'browser' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:68:18\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "009700d2-00e3-00dd-002c-00a500f800da.png",
        "timestamp": 1541711509254,
        "duration": 37
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 24040,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00c90030-0067-00ef-0040-00460090006b.png",
        "timestamp": 1541711509592,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 728,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f1006f-00d0-00a1-0075-005000e6009e.png",
        "timestamp": 1541711643865,
        "duration": 2569
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 728,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00990044-0087-002b-00ec-007c0073009c.png",
        "timestamp": 1541711646785,
        "duration": 67
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 728,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007a004f-0010-00d1-0004-001500be008f.png",
        "timestamp": 1541711647173,
        "duration": 88
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 728,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001e0035-00b3-0055-001a-007400d20040.png",
        "timestamp": 1541711647595,
        "duration": 114
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 728,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'browser' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'browser' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:68:18\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d8004a-005b-007f-00da-002900ba007e.png",
        "timestamp": 1541711648201,
        "duration": 56
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 728,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a10026-00a6-0004-00c8-00580048003f.png",
        "timestamp": 1541711648744,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6132,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00900000-000c-0049-00a0-00fe000300c5.png",
        "timestamp": 1541712564986,
        "duration": 3048
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6132,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006a008b-005b-0090-0058-007a009100bc.png",
        "timestamp": 1541712568363,
        "duration": 82
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6132,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003c0008-00c6-00a1-003f-002d00cc001a.png",
        "timestamp": 1541712568739,
        "duration": 88
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6132,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c100b8-0048-00f3-00fc-0078006400cd.png",
        "timestamp": 1541712569231,
        "duration": 122
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6132,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:197:43)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "006200a4-00ce-0046-002b-0005003a0081.png",
        "timestamp": 1541712569827,
        "duration": 37
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 6132,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "007700fb-00ce-00f3-0097-00e400bc00b2.png",
        "timestamp": 1541712570184,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2008,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00840015-00f9-0028-005c-003d0097005d.png",
        "timestamp": 1541713333224,
        "duration": 4567
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2008,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0087000d-00ac-0037-0084-004700360028.png",
        "timestamp": 1541713338141,
        "duration": 75
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2008,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005000bc-0098-008b-00ee-00ee00b80089.png",
        "timestamp": 1541713338536,
        "duration": 90
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2008,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001c00b9-00ce-00e9-003e-006200550060.png",
        "timestamp": 1541713338935,
        "duration": 107
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2008,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:197:43)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ff006d-0021-000c-00d7-003200930012.png",
        "timestamp": 1541713339368,
        "duration": 39
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 2008,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00bb0074-00cf-00a5-0099-0001000d00ac.png",
        "timestamp": 1541713339718,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005500dc-00cf-0091-00a0-00e6000a0051.png",
        "timestamp": 1541713397899,
        "duration": 3427
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009a007a-0015-00de-00a3-00e100bb007c.png",
        "timestamp": 1541713401656,
        "duration": 77
    },
    {
        "description": "Login:  Login as a Bank Manager|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0017009b-0016-0030-00c6-0017003a003a.png",
        "timestamp": 1541713402017,
        "duration": 100
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Delete an Existing Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ee0015-0083-0070-0064-00fb00c80040.png",
        "timestamp": 1541713402446,
        "duration": 109
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Delete an Existing Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Betty')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Crocker')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:197:43)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:17)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:127:13\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)"
        ],
        "browserLogs": [],
        "screenShotFile": "002400e6-0094-00c0-002e-009c009f0016.png",
        "timestamp": 1541713402944,
        "duration": 44
    },
    {
        "description": "Alert Dialog|Delete an Existing Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 21308,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001d00f1-00f2-00a7-0020-00f8004c00f4.png",
        "timestamp": 1541713403305,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d3002f-00a8-00c5-00a9-004f00bd0052.png",
        "timestamp": 1541713585048,
        "duration": 3264
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ff0062-006e-0071-0001-000900b80034.png",
        "timestamp": 1541713588654,
        "duration": 63
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009900db-00d5-001c-00ff-009300280033.png",
        "timestamp": 1541713589070,
        "duration": 115
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008d0078-0000-0044-00d0-008100e40099.png",
        "timestamp": 1541713589539,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23052,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00700068-003b-00cf-00ad-0059001b006e.png",
        "timestamp": 1541713590185,
        "duration": 444
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21404,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e200d3-00ed-00ae-0081-008400c800ff.png",
        "timestamp": 1541715590554,
        "duration": 1494
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21404,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b600d2-0008-0079-0078-00e2004f0092.png",
        "timestamp": 1541715592405,
        "duration": 66
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21404,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ae009a-003c-00c8-00c9-00f700fa000f.png",
        "timestamp": 1541715592891,
        "duration": 105
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21404,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b100f3-0072-00ad-0068-00b600d00062.png",
        "timestamp": 1541715593390,
        "duration": 119
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21404,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00710030-0026-0089-00ca-00b300ff0034.png",
        "timestamp": 1541715593852,
        "duration": 486
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0046005e-00f1-00fa-00c1-000800750099.png",
        "timestamp": 1541715641655,
        "duration": 2382
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c1001d-00e0-001e-00ec-00e100000056.png",
        "timestamp": 1541715644359,
        "duration": 73
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00540044-0001-00b8-00d8-00a100b1000b.png",
        "timestamp": 1541715644759,
        "duration": 119
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000700b3-001b-00eb-008a-00d800c700e6.png",
        "timestamp": 1541715645206,
        "duration": 111
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009100d5-009b-0039-00be-00bf005a00bc.png",
        "timestamp": 1541715645710,
        "duration": 439
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18668,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00450045-0073-00ea-0067-001600520015.png",
        "timestamp": 1541715766545,
        "duration": 2189
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18668,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0037005e-0028-00ab-0030-00eb007b00c1.png",
        "timestamp": 1541715769081,
        "duration": 60
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18668,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00610097-00c7-007c-00e0-00a200fe006b.png",
        "timestamp": 1541715769457,
        "duration": 128
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18668,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001000ac-00c4-00c2-005a-004f00dc00b2.png",
        "timestamp": 1541715770000,
        "duration": 104
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18668,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003e008b-009a-00cc-00ad-0054007f0055.png",
        "timestamp": 1541715770452,
        "duration": 458
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0026007d-0095-008d-00a5-007900790057.png",
        "timestamp": 1541715803638,
        "duration": 1739
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00630015-0072-001c-0077-00e4008000be.png",
        "timestamp": 1541715805703,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000d0076-007d-0046-0031-000900d30029.png",
        "timestamp": 1541715806089,
        "duration": 117
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009700fd-0066-008a-0066-00b80001002d.png",
        "timestamp": 1541715806536,
        "duration": 115
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002000f8-0090-0023-00f4-00bd00a30051.png",
        "timestamp": 1541715807255,
        "duration": 444
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11860,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000f005a-0071-00be-0072-00ef007200b4.png",
        "timestamp": 1541716114786,
        "duration": 2528
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11860,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002900c5-0085-0082-003e-003700a800c5.png",
        "timestamp": 1541716117674,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11860,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b2000d-006e-00cf-005d-001d004b00a7.png",
        "timestamp": 1541716118089,
        "duration": 124
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11860,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b7002d-00d4-00d5-0084-001b0032003f.png",
        "timestamp": 1541716118534,
        "duration": 112
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11860,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007200d6-0029-00af-0068-00be00ec0055.png",
        "timestamp": 1541716119009,
        "duration": 913
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00980079-00f5-0057-006e-00f1007700ce.png",
        "timestamp": 1541716415372,
        "duration": 3034
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00db0007-009d-00ed-00d3-005a006d0022.png",
        "timestamp": 1541716418744,
        "duration": 53
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00500040-0094-0087-008d-00aa003c00cb.png",
        "timestamp": 1541716419145,
        "duration": 133
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001d0027-0059-0075-0051-00e300d3002c.png",
        "timestamp": 1541716419698,
        "duration": 143
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fb00e4-008c-0020-0098-00c1002300c3.png",
        "timestamp": 1541716420369,
        "duration": 480
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008200d4-0054-00b6-00dd-00ad00f30078.png",
        "timestamp": 1541716488167,
        "duration": 1256
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009e00b7-00d9-0025-00c2-005d0030006b.png",
        "timestamp": 1541716489805,
        "duration": 62
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00090079-00de-00f2-0006-003f00a70021.png",
        "timestamp": 1541716490196,
        "duration": 335
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009a00eb-0028-00f6-00eb-00de004c00a4.png",
        "timestamp": 1541716490850,
        "duration": 116
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e3004a-00cb-00f0-00e9-002d005b00ee.png",
        "timestamp": 1541716491268,
        "duration": 506
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e100da-00b2-0084-00b1-000700a500eb.png",
        "timestamp": 1541716899755,
        "duration": 1448
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0080003e-0051-00da-00af-0048002200b7.png",
        "timestamp": 1541716901559,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005100ed-004c-0085-00f2-0033001400c7.png",
        "timestamp": 1541716901984,
        "duration": 274
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dd00fa-0072-0053-008d-008c00f40049.png",
        "timestamp": 1541716902628,
        "duration": 112
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007d0017-0082-00e7-0055-006f003900b7.png",
        "timestamp": 1541716903106,
        "duration": 463
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:118:63)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:113:92)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00cf00a6-00f7-0018-00c0-00550082006e.png",
        "timestamp": 1541716903929,
        "duration": 32
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "002500d1-004e-00c9-0084-00ec00970091.png",
        "timestamp": 1541716904281,
        "duration": 0
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b60071-00e8-002e-0038-004d00e000f9.png",
        "timestamp": 1541716904329,
        "duration": 116
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Bruce')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Willis')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Bruce')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Willis')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:144:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:143:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "003b0043-0051-00d8-00ca-00b800ae005d.png",
        "timestamp": 1541716904871,
        "duration": 50
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 10684,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00b10007-0020-0081-00a6-00e3001400ab.png",
        "timestamp": 1541716905246,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bf0040-00ce-00bd-005f-004300470065.png",
        "timestamp": 1541717027063,
        "duration": 2683
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002100dd-002f-0065-0034-00b200a200dd.png",
        "timestamp": 1541717030150,
        "duration": 67
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cf00a8-00a1-00ae-00ce-003d00b40015.png",
        "timestamp": 1541717030517,
        "duration": 140
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004e00eb-00b2-0007-0010-007100e0007e.png",
        "timestamp": 1541717031026,
        "duration": 312
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cd008d-00e5-003b-0061-0050007800ba.png",
        "timestamp": 1541717031656,
        "duration": 460
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:118:63)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:113:92)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "007100d4-00ce-008d-00d6-000000ba00e9.png",
        "timestamp": 1541717032500,
        "duration": 31
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0070004d-0081-00c5-0048-0020000900c9.png",
        "timestamp": 1541717032823,
        "duration": 0
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e90084-003c-0092-003e-00b0006300cc.png",
        "timestamp": 1541717032884,
        "duration": 125
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Bruce')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Willis')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Bruce')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Willis')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:144:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:143:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d000d0-00c7-00fc-0080-00a90029009e.png",
        "timestamp": 1541717033353,
        "duration": 48
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 12372,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00eb00b3-0060-00f3-00a8-002000b600af.png",
        "timestamp": 1541717033718,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000600b7-0008-0042-0017-00370028008b.png",
        "timestamp": 1541717210400,
        "duration": 1791
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002d00ae-00d1-00a2-0007-0002001d002a.png",
        "timestamp": 1541717212527,
        "duration": 58
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bb00b6-004a-009d-00b2-004f005e00de.png",
        "timestamp": 1541717212885,
        "duration": 311
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0012002d-00dc-0029-0041-00e7003d00ee.png",
        "timestamp": 1541717213624,
        "duration": 117
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0014003a-00f6-0073-0005-007300560018.png",
        "timestamp": 1541717214087,
        "duration": 522
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:118:55)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:113:92)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009100c2-0041-0059-006d-000900b10012.png",
        "timestamp": 1541717214987,
        "duration": 29
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "008300dc-009c-0049-0082-0046005600ba.png",
        "timestamp": 1541717215308,
        "duration": 0
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b70075-002b-0052-0001-009400aa00b2.png",
        "timestamp": 1541717215372,
        "duration": 124
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Bugs')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Bunny')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Bugs')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Bunny')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:144:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:143:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "007f0082-0073-008a-007e-001b004100ce.png",
        "timestamp": 1541717215830,
        "duration": 42
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 16956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0067009e-0056-006c-00c8-00c700ef00c8.png",
        "timestamp": 1541717216172,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006f0002-0032-0081-00b8-003800a10045.png",
        "timestamp": 1541717437922,
        "duration": 1434
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006c00c0-00fc-00a1-00b2-003a005f00e5.png",
        "timestamp": 1541717439711,
        "duration": 68
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e40028-00bf-0051-00cd-00c00022007e.png",
        "timestamp": 1541717440212,
        "duration": 115
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003900c8-0029-00f9-009a-003900e70026.png",
        "timestamp": 1541717440746,
        "duration": 116
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bb0042-0043-0009-0039-0096006700bb.png",
        "timestamp": 1541717441236,
        "duration": 432
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:146:55)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at fulfilled (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "0056008b-0063-00d5-006c-00d3001c0050.png",
        "timestamp": 1541717442060,
        "duration": 21
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00db006a-008b-0024-007d-002200cc0060.png",
        "timestamp": 1541717442413,
        "duration": 0
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f50087-0020-00cc-007e-007f00be00b6.png",
        "timestamp": 1541717442460,
        "duration": 115
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Bugs')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Bunny')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'Bugs')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Bunny')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:200:68)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:197:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bd0062-000e-0065-00d9-00e80080000b.png",
        "timestamp": 1541717443014,
        "duration": 47
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 10352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "006200ab-0062-0078-00f9-00eb000c0029.png",
        "timestamp": 1541717443383,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00db0070-005a-0084-0063-0041008200f3.png",
        "timestamp": 1541717583883,
        "duration": 1273
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004f0026-0090-0004-0077-00a700de00b0.png",
        "timestamp": 1541717585502,
        "duration": 71
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fb00ff-00b3-0012-00f9-003d0028000c.png",
        "timestamp": 1541717586061,
        "duration": 113
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ec005e-0060-0076-0042-00e400ca008e.png",
        "timestamp": 1541717586522,
        "duration": 114
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0050008c-0081-00f3-0068-0090009300d0.png",
        "timestamp": 1541717587007,
        "duration": 456
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:146:63)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at fulfilled (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00050083-002c-0020-00e9-00a40027004d.png",
        "timestamp": 1541717587871,
        "duration": 16
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00f40012-0062-00cc-0091-00a900a90053.png",
        "timestamp": 1541717588224,
        "duration": 0
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007b00d1-0009-0042-0096-000200ed00b4.png",
        "timestamp": 1541717588287,
        "duration": 117
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:200:68)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:197:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "008300cb-00da-00ed-0080-0034000e0007.png",
        "timestamp": 1541717588734,
        "duration": 47
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 18244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "001100a0-0009-0003-0097-00e6001e00b8.png",
        "timestamp": 1541717589109,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e200a6-0034-001e-0076-004100180025.png",
        "timestamp": 1541717747393,
        "duration": 1915
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001900f7-005c-00fe-00b7-00c400e00035.png",
        "timestamp": 1541717749678,
        "duration": 71
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f3007f-00fe-0060-00a5-0090004f0069.png",
        "timestamp": 1541717750050,
        "duration": 128
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e300ac-0066-00c2-00df-0042009b009f.png",
        "timestamp": 1541717750649,
        "duration": 132
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00910000-00c2-00fc-0086-003a00740025.png",
        "timestamp": 1541717751226,
        "duration": 469
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:147:63)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at fulfilled (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "001f00a0-0030-002d-0021-0046000900d6.png",
        "timestamp": 1541717752100,
        "duration": 31
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000c008e-00c8-0045-0079-0047009200f1.png",
        "timestamp": 1541717752450,
        "duration": 109
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:193:68)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:190:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004f007e-007f-00a9-00cf-008200fa00da.png",
        "timestamp": 1541717752969,
        "duration": 55
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 10616,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0066000c-000b-00b9-000b-00280016003b.png",
        "timestamp": 1541717753353,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00970006-003c-0007-0058-00f90043003f.png",
        "timestamp": 1541717841395,
        "duration": 1312
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004c008d-00de-002c-0089-00f200fd00ba.png",
        "timestamp": 1541717843058,
        "duration": 93
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ff001e-00a5-0008-006f-007c009f0024.png",
        "timestamp": 1541717843467,
        "duration": 360
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c40024-002a-00c2-00b4-004b00df000e.png",
        "timestamp": 1541717844269,
        "duration": 126
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00de00de-000a-00aa-00c9-00b900490014.png",
        "timestamp": 1541717844816,
        "duration": 454
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:146:63)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at fulfilled (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "003d005c-00b2-00db-00c2-006c0094009c.png",
        "timestamp": 1541717845648,
        "duration": 16
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00260045-0078-00c3-0007-00e800c20097.png",
        "timestamp": 1541717845971,
        "duration": 147
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:170:68)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:167:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0085009b-00b2-00cc-0079-008b00b90003.png",
        "timestamp": 1541717846631,
        "duration": 38
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 14656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00d20057-00b7-0010-0011-004b00880016.png",
        "timestamp": 1541717847000,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003b00f3-0013-0028-0054-002900510045.png",
        "timestamp": 1541787941818,
        "duration": 3433
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00890026-00e4-00ef-00b4-003700f2005d.png",
        "timestamp": 1541787945699,
        "duration": 71
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003900ce-009c-0088-00e9-00c400e3008b.png",
        "timestamp": 1541787946070,
        "duration": 142
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fc00c0-004b-003b-008c-0094002600ce.png",
        "timestamp": 1541787946628,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00750016-009a-00cf-0041-0033000900bc.png",
        "timestamp": 1541787947081,
        "duration": 468
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:146:63)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at fulfilled (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e400ef-00ba-00df-006c-009000f200c3.png",
        "timestamp": 1541787947945,
        "duration": 31
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ba0029-0028-00e5-00ee-00df009e0063.png",
        "timestamp": 1541787948307,
        "duration": 114
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:170:68)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:167:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ec0008-0065-006f-004a-0083004f00f2.png",
        "timestamp": 1541787948796,
        "duration": 49
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 22348,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00bf0052-002f-00ca-00e5-00a6009f00db.png",
        "timestamp": 1541787949177,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ad00eb-0041-00e1-0097-00d200ba00c6.png",
        "timestamp": 1541788105787,
        "duration": 3321
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005500cf-00c0-00f2-00d8-00b100170097.png",
        "timestamp": 1541788109505,
        "duration": 54
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0039007d-00e1-00af-001e-0048001f0038.png",
        "timestamp": 1541788109875,
        "duration": 131
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0052008a-009c-0081-001b-002500da005b.png",
        "timestamp": 1541788110404,
        "duration": 131
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005500db-004a-00ee-00d1-00d400d2005f.png",
        "timestamp": 1541788110876,
        "duration": 521
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "TypeError: Cannot read property 'sendKeys' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'sendKeys' of undefined\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:146:55)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at fulfilled (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00770076-00ba-0000-0058-007f004c0006.png",
        "timestamp": 1541788111726,
        "duration": 35
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dc004d-0019-00a1-00f8-005c00230087.png",
        "timestamp": 1541788112125,
        "duration": 115
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'The')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Roadrunner')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\DeleteCustomersScreen.js:66:17)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:170:68)\n    at step (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:32:23)\n    at Object.next (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:13:53)\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:3:12)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:167:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:64:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00430045-0040-00b7-00f7-007d00a500ca.png",
        "timestamp": 1541788112708,
        "duration": 54
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 26128,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "005c002f-0011-00e6-0064-0003009f003b.png",
        "timestamp": 1541788113109,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000400ab-0067-00d2-001e-00190013001d.png",
        "timestamp": 1541788493938,
        "duration": 1637
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00060072-00b5-00de-000e-00c6003100e6.png",
        "timestamp": 1541788495923,
        "duration": 60
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001500bb-006f-0084-0008-005100c60090.png",
        "timestamp": 1541788496327,
        "duration": 118
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bb002a-004f-0057-00a7-005d003c005f.png",
        "timestamp": 1541788496799,
        "duration": 142
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d2006e-00c4-0061-0038-009700690074.png",
        "timestamp": 1541788497283,
        "duration": 524
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000300d5-00d9-0073-00a4-004500e900f6.png",
        "timestamp": 1541794475070,
        "duration": 2626
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f0001d-00b5-00f8-00b8-004700b90071.png",
        "timestamp": 1541794478074,
        "duration": 78
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00740061-0039-00b7-0056-004100ca0091.png",
        "timestamp": 1541794478474,
        "duration": 127
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000e005e-004c-0089-007d-007800730048.png",
        "timestamp": 1541794479223,
        "duration": 135
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23624,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003c0060-00fd-006e-003a-005c006d00f0.png",
        "timestamp": 1541794479723,
        "duration": 518
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12408,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002c000a-003a-00e9-006d-004600df0078.png",
        "timestamp": 1541794892219,
        "duration": 1857
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12408,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009c0078-00d7-00a1-007c-008e00940022.png",
        "timestamp": 1541794894475,
        "duration": 64
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12408,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007e00c0-00bc-00c5-0081-0065002600be.png",
        "timestamp": 1541794894836,
        "duration": 124
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12408,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00160081-0081-002b-00b5-008e008e002c.png",
        "timestamp": 1541794895298,
        "duration": 122
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12408,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e600ef-0051-005f-0007-008200da00d2.png",
        "timestamp": 1541794895789,
        "duration": 755
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ca009e-00ef-005c-00a8-004000d4001e.png",
        "timestamp": 1541794996466,
        "duration": 1792
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008f0095-0009-006d-00f3-006e00290058.png",
        "timestamp": 1541794998601,
        "duration": 71
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00430017-001f-0061-00e4-00f70082007e.png",
        "timestamp": 1541794998994,
        "duration": 313
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dd009d-005b-0058-00b3-00fd008000aa.png",
        "timestamp": 1541794999703,
        "duration": 109
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000100ef-0086-0064-004c-003f00fd009e.png",
        "timestamp": 1541795000159,
        "duration": 456
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e300c2-004f-008d-00dd-006d00c6004e.png",
        "timestamp": 1541795256898,
        "duration": 2597
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001300d3-0003-009c-0012-0059006300be.png",
        "timestamp": 1541795259854,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001400b7-005f-00e1-0071-003a001b00ca.png",
        "timestamp": 1541795260241,
        "duration": 336
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0032000e-000d-0020-0030-00cc0088005f.png",
        "timestamp": 1541795260902,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e700b5-002f-002e-0013-00e2006e0018.png",
        "timestamp": 1541795261341,
        "duration": 486
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004100c9-0099-0069-00ad-00d400380062.png",
        "timestamp": 1541795262219,
        "duration": 148
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d00099-0051-00f3-0020-00e300d20096.png",
        "timestamp": 1541795262741,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'JFK')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'JFK')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:104:35)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:102:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:28:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0042002e-00a3-00e7-0038-00f8008400fd.png",
        "timestamp": 1541795263209,
        "duration": 49
    },
    {
        "description": "Alert Dialog|Create a New Bank Customer",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 15956,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00ba009d-002c-0084-0092-00b200e4001d.png",
        "timestamp": 1541795263574,
        "duration": 0
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0014004a-00cd-00d1-0040-000e00660068.png",
        "timestamp": 1541795499145,
        "duration": 4133
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004c00c9-0067-00df-0032-00a4005400e7.png",
        "timestamp": 1541795503611,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0059008f-00bb-0031-0012-00de008e008f.png",
        "timestamp": 1541795503996,
        "duration": 114
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007a00bb-0063-00d6-00ba-002a00ba0090.png",
        "timestamp": 1541795504461,
        "duration": 110
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00040079-0064-00db-00f0-004800c0001d.png",
        "timestamp": 1541795504894,
        "duration": 466
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e4006b-0022-0029-0010-007800a10026.png",
        "timestamp": 1541795505796,
        "duration": 129
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006800dd-00de-005d-005f-005500340038.png",
        "timestamp": 1541795506269,
        "duration": 105
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:99:35)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d20026-0038-0019-0059-00d500e100a8.png",
        "timestamp": 1541795506719,
        "duration": 45
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c600f3-00f5-0083-0008-00d900ee00ed.png",
        "timestamp": 1541795986148,
        "duration": 1454
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0050003e-0003-007a-0067-006a005300e9.png",
        "timestamp": 1541795987959,
        "duration": 60
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001200d6-00f6-00bc-00f4-00bd006500d9.png",
        "timestamp": 1541795988335,
        "duration": 364
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004400dc-0095-0058-00d3-0024004e007b.png",
        "timestamp": 1541795989029,
        "duration": 127
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007b00e1-0023-0012-0093-006100ce0080.png",
        "timestamp": 1541795989537,
        "duration": 544
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f00042-0065-0036-005f-00c0008e003c.png",
        "timestamp": 1541795990419,
        "duration": 150
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0077001c-009c-001f-004d-00110067005a.png",
        "timestamp": 1541795990928,
        "duration": 122
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:65:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:99:35)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e300e0-008b-00c9-00bb-00b2009d009b.png",
        "timestamp": 1541795991487,
        "duration": 62
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000100d9-006d-0035-007d-003100f100db.png",
        "timestamp": 1541796219896,
        "duration": 3167
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007b0015-004b-00ad-00d0-008300d500a7.png",
        "timestamp": 1541796223445,
        "duration": 56
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0077006e-007e-00fb-003e-009600e00044.png",
        "timestamp": 1541796223818,
        "duration": 120
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c300c4-0061-00ec-0004-00a6001700bc.png",
        "timestamp": 1541796224296,
        "duration": 105
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001e0086-0064-000a-0026-0041009c0067.png",
        "timestamp": 1541796224774,
        "duration": 435
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f600e4-00e6-0094-009e-0048000900a6.png",
        "timestamp": 1541796225619,
        "duration": 167
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003c00d6-00fa-00d1-0040-003400ed0092.png",
        "timestamp": 1541796226125,
        "duration": 112
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22252,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:65:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:99:35)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ad0082-0086-00ab-00af-008700e6006a.png",
        "timestamp": 1541796226675,
        "duration": 52
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fe001c-00cf-0098-005b-00c8004700bf.png",
        "timestamp": 1541796604637,
        "duration": 2972
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004e0006-00ac-00a5-00ab-00ef00a200c4.png",
        "timestamp": 1541796607958,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ce0004-00f3-004e-0066-000100e700e7.png",
        "timestamp": 1541796608348,
        "duration": 121
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005a001c-00a5-00f4-002b-009600080090.png",
        "timestamp": 1541796608797,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004800f3-00ac-006e-0015-0080006f0016.png",
        "timestamp": 1541796609294,
        "duration": 467
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b200c0-00c6-0015-0057-00bb00f00046.png",
        "timestamp": 1541796610099,
        "duration": 132
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b50051-0095-0085-0068-001b002f00e4.png",
        "timestamp": 1541796610569,
        "duration": 109
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:99:35)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "007900b8-00ce-00e4-00f6-00fe009400f7.png",
        "timestamp": 1541796611055,
        "duration": 59
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008c009c-0004-0095-002e-00e500e10074.png",
        "timestamp": 1541796834671,
        "duration": 2541
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ae00a1-00a5-0026-00d0-00ec007e00a0.png",
        "timestamp": 1541796837580,
        "duration": 71
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00380026-00e5-006d-005e-006d004800b2.png",
        "timestamp": 1541796837960,
        "duration": 124
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00170056-0096-00a3-00b4-009100030006.png",
        "timestamp": 1541796838421,
        "duration": 113
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0029000a-003e-00dc-003f-004000770034.png",
        "timestamp": 1541796838980,
        "duration": 474
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ab00b9-0048-000b-00ee-00bf00780063.png",
        "timestamp": 1541796839822,
        "duration": 144
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002e0079-00b2-0017-0034-00d7001a00e1.png",
        "timestamp": 1541796840334,
        "duration": 169
    },
    {
        "description": "Add Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //td[@class = 'ng-binding' and contains( text(), 'DFW')]/following-sibling::td[@class = 'ng-binding' and contains( text(), 'Airport')]/following-sibling::td[3]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at DeleteCustomersScreen.clickDeleteButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:66:17)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:99:35)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Add Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004f0058-008f-002a-00d3-008800ff005d.png",
        "timestamp": 1541796840837,
        "duration": 57
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00550060-006b-00fb-003c-009d0034002d.png",
        "timestamp": 1541797340434,
        "duration": 1462
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001c0067-00b5-005d-00bb-003b004d0015.png",
        "timestamp": 1541797342259,
        "duration": 62
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c100d0-0082-00d4-007c-00ce00a600bf.png",
        "timestamp": 1541797342818,
        "duration": 150
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00860038-0038-0084-004c-00ae00d800f7.png",
        "timestamp": 1541797343376,
        "duration": 104
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c9005c-00a5-00d8-004b-00de00280045.png",
        "timestamp": 1541797343876,
        "duration": 464
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f90065-0056-009c-0072-0072006d00e7.png",
        "timestamp": 1541797344752,
        "duration": 145
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005b0046-00ea-00e6-00eb-006300d800c1.png",
        "timestamp": 1541797345233,
        "duration": 113
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25560,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:65:34\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "008400dd-00bd-0050-0006-002400c400c3.png",
        "timestamp": 1541797345792,
        "duration": 47
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a8004b-007d-004f-001a-00f6001500fd.png",
        "timestamp": 1541797445848,
        "duration": 7290
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b50065-00c3-00ef-002d-000b00ba00aa.png",
        "timestamp": 1541797453478,
        "duration": 71
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0014001b-00ae-004a-003f-003d00780022.png",
        "timestamp": 1541797453852,
        "duration": 124
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00450006-0097-0085-00e7-00cb00aa0097.png",
        "timestamp": 1541797454327,
        "duration": 108
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c900c5-0010-0086-0035-0022008a0060.png",
        "timestamp": 1541797454858,
        "duration": 683
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e90080-00d8-0052-0029-001b0062009e.png",
        "timestamp": 1541797455974,
        "duration": 139
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009f0099-008e-0067-00f3-002000ba0050.png",
        "timestamp": 1541797456482,
        "duration": 100
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'browser' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'browser' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:65:18\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bb0085-0093-00ea-0031-00a8008200ad.png",
        "timestamp": 1541797456940,
        "duration": 42
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22948,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003700e4-00fe-0071-0064-006e00e1004c.png",
        "timestamp": 1541800098358,
        "duration": 1712
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22948,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0093008c-0093-0065-0086-007b008a0091.png",
        "timestamp": 1541800100429,
        "duration": 84
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22948,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a100bc-0033-00aa-00bc-0086005900df.png",
        "timestamp": 1541800100814,
        "duration": 127
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22948,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00940095-00d7-00cb-006d-009d0047004c.png",
        "timestamp": 1541800101286,
        "duration": 131
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22948,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c4000e-008f-001b-00ef-00d50062000d.png",
        "timestamp": 1541800101836,
        "duration": 520
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22948,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00770042-001d-004f-0051-00e100c500a0.png",
        "timestamp": 1541800102720,
        "duration": 143
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22948,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a500e7-00ca-00fe-00ce-009e009d00c1.png",
        "timestamp": 1541800103205,
        "duration": 151
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22948,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Cannot read property 'browser' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'browser' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:70:18\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "001b0013-0070-0019-0036-00d700860099.png",
        "timestamp": 1541800103702,
        "duration": 47
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c400f5-0088-00d9-008f-005a004b00f7.png",
        "timestamp": 1541800203176,
        "duration": 1441
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a200dc-0096-00f0-0028-005e001c0050.png",
        "timestamp": 1541800204995,
        "duration": 84
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000a006c-0037-00fd-000d-007c006a00fb.png",
        "timestamp": 1541800205449,
        "duration": 128
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00df00b7-00ae-0054-00b2-00f500210000.png",
        "timestamp": 1541800205996,
        "duration": 107
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005b00b7-0095-0001-0070-003100e2001e.png",
        "timestamp": 1541800206480,
        "duration": 488
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bf00df-0058-00fe-007c-00d900df000f.png",
        "timestamp": 1541800207346,
        "duration": 128
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004400af-00e0-00d4-00be-009e008200ca.png",
        "timestamp": 1541800207826,
        "duration": 99
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: protractor_1.browser.sendKeys is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.browser.sendKeys is not a function\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:70:34\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:27:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "001d00b8-00e4-0097-003c-00c30015006d.png",
        "timestamp": 1541800208459,
        "duration": 47
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001900c8-0023-008b-0073-0010000d007a.png",
        "timestamp": 1542136929171,
        "duration": 1708
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fb00f6-0043-0094-006e-00db00f900b1.png",
        "timestamp": 1542136931342,
        "duration": 70
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00610038-0077-0087-00ae-0076009300f0.png",
        "timestamp": 1542136931836,
        "duration": 127
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00380047-007a-007e-00cd-0065007a000c.png",
        "timestamp": 1542136932282,
        "duration": 125
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0047005d-00d9-008f-0003-0016002a0065.png",
        "timestamp": 1542136932758,
        "duration": 759
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d00036-0054-00b8-0029-00da00f0009d.png",
        "timestamp": 1542136933899,
        "duration": 169
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005d002d-00d8-007c-00e8-0004006c0021.png",
        "timestamp": 1542136934484,
        "duration": 133
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: invalid selector: Unable to locate an element with the xpath expression //*[contains[text(),'DFW Airport')] because of the following error:\nSyntaxError: Failed to execute 'evaluate' on 'Document': The string '//*[contains[text(),'DFW Airport')]' is not a valid XPath expression.\n  (Session info: chrome=70.0.3538.102)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: Unable to locate an element with the xpath expression //*[contains[text(),'DFW Airport')] because of the following error:\nSyntaxError: Failed to execute 'evaluate' on 'Document': The string '//*[contains[text(),'DFW Airport')]' is not a valid XPath expression.\n  (Session info: chrome=70.0.3538.102)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(xpath, //*[contains[text(),'DFW Airport')]))\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at OpenAccountScreen.selectCustomerName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\OpenAccountScreen.js:37:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:105:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Open Account Screen:  Choose Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:102:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "003800b7-004c-00e7-0028-002200c500f5.png",
        "timestamp": 1542136935001,
        "duration": 60
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fe0085-003e-0068-008b-000c00830017.png",
        "timestamp": 1542136935376,
        "duration": 42
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00be00a6-000c-002a-006a-005e00140031.png",
        "timestamp": 1542136935749,
        "duration": 115
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:133:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009d00bd-006b-0047-00c6-006e000200bb.png",
        "timestamp": 1542136936349,
        "duration": 53
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009000ad-0020-004c-00e1-0056003d00c4.png",
        "timestamp": 1542137124540,
        "duration": 1989
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ce00d9-003d-0015-001d-008300b90039.png",
        "timestamp": 1542137126945,
        "duration": 62
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d50005-00b5-00f4-00ab-002c006f0063.png",
        "timestamp": 1542137127329,
        "duration": 121
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c90036-00a0-004c-0069-003100a2003c.png",
        "timestamp": 1542137127798,
        "duration": 106
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c20017-007a-002b-00d5-009c001d007c.png",
        "timestamp": 1542137128346,
        "duration": 505
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f3004f-00d7-000a-008d-000900ef00cb.png",
        "timestamp": 1542137129230,
        "duration": 141
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a900b8-009f-008a-0088-00c9005500ef.png",
        "timestamp": 1542137129715,
        "duration": 116
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //*[contains(text(),'DFW Airport')])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //*[contains(text(),'DFW Airport')])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as executeScript] (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at OpenAccountScreen.selectCustomerName (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\OpenAccountScreen.js:37:30)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:105:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Open Account Screen:  Choose Customer\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:102:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e30017-00e9-000a-00f4-003e00430057.png",
        "timestamp": 1542137130197,
        "duration": 36
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b600e9-0086-0006-0071-0088001a00c2.png",
        "timestamp": 1542137130560,
        "duration": 343
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00000072-001d-005b-000a-009f00ad0058.png",
        "timestamp": 1542137131211,
        "duration": 151
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 31656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:133:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "008c00ed-00b3-00c6-00f4-00b100f500d1.png",
        "timestamp": 1542137131865,
        "duration": 47
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006d000e-000c-003f-006a-00ad003b0043.png",
        "timestamp": 1542137473854,
        "duration": 2640
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00430029-0082-00bc-00a0-00650025009b.png",
        "timestamp": 1542137476858,
        "duration": 63
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002900a0-0013-001e-0091-001c002800b1.png",
        "timestamp": 1542137477224,
        "duration": 134
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00970067-00c5-00c3-008b-00d100fb0006.png",
        "timestamp": 1542137477704,
        "duration": 132
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0063008d-0099-0091-0060-0056007a00a7.png",
        "timestamp": 1542137478369,
        "duration": 477
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004f0042-0047-0098-006e-003300e4004e.png",
        "timestamp": 1542137479292,
        "duration": 161
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003d00a8-00f3-00f6-00aa-009d001e0086.png",
        "timestamp": 1542137479801,
        "duration": 112
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ae00bb-00b4-0003-00f2-00fe00de00c8.png",
        "timestamp": 1542137480262,
        "duration": 2019
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c6009e-00cb-0074-005e-00eb00120003.png",
        "timestamp": 1542137482608,
        "duration": 184
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008700f2-00ce-0007-008c-007800b70042.png",
        "timestamp": 1542137483108,
        "duration": 132
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30420,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:133:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "008d0058-005f-009d-0064-0020009d00d3.png",
        "timestamp": 1542137483729,
        "duration": 55
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0072000f-00ad-0082-00a8-0035003b0027.png",
        "timestamp": 1542137725565,
        "duration": 1386
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00aa00a9-0074-0096-0010-002100f70096.png",
        "timestamp": 1542137727397,
        "duration": 85
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00770069-00f9-0085-00d9-00d400740010.png",
        "timestamp": 1542137727955,
        "duration": 110
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e0008c-0006-008e-0032-006600370073.png",
        "timestamp": 1542137728414,
        "duration": 117
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001000c5-00c3-00d0-0057-002500e800eb.png",
        "timestamp": 1542137728997,
        "duration": 508
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00230044-001c-005e-00b4-0056007a00ed.png",
        "timestamp": 1542137729894,
        "duration": 148
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00eb00b2-000a-00fb-0051-002400490019.png",
        "timestamp": 1542137730436,
        "duration": 118
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c500ce-00cc-00c0-009f-005d009500a0.png",
        "timestamp": 1542137730890,
        "duration": 2015
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008e00da-00e6-0006-00b3-00b700020016.png",
        "timestamp": 1542137733234,
        "duration": 188
    },
    {
        "description": "Open Account Screen:  Click the Process button|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=70.0.3538.102)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=70.0.3538.102)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at OpenAccountScreen.clickProcessButton (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\OpenAccountScreen.js:42:59)\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:122:31)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Open Account Screen:  Click the Process button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:120:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00af0091-006c-00e8-00df-004a004c0087.png",
        "timestamp": 1542137733739,
        "duration": 157
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003900aa-0009-009c-0065-000800c900dc.png",
        "timestamp": 1542137734395,
        "duration": 165
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 29164,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:141:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "007b0091-0066-0093-0029-0017008700af.png",
        "timestamp": 1542137735044,
        "duration": 63
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a400f5-0039-00f1-002f-0048005000ec.png",
        "timestamp": 1542137805145,
        "duration": 2034
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0015005d-0005-00ab-00df-00a300f20031.png",
        "timestamp": 1542137807603,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00160071-00ce-0026-0042-001d005000f0.png",
        "timestamp": 1542137807979,
        "duration": 122
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00430048-0027-00fc-00d2-00a7003c00cf.png",
        "timestamp": 1542137808440,
        "duration": 315
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008d007d-0094-00a2-00a9-00ce00cc0094.png",
        "timestamp": 1542137809122,
        "duration": 492
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002c0072-0051-002d-006b-000b000a0043.png",
        "timestamp": 1542137810024,
        "duration": 129
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007600b2-0030-001f-00eb-001e00f3006f.png",
        "timestamp": 1542137810503,
        "duration": 109
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001b00c3-00eb-0018-00ea-00e200180060.png",
        "timestamp": 1542137810967,
        "duration": 152
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b900ab-00c7-008a-0060-005a00bc0053.png",
        "timestamp": 1542137811452,
        "duration": 146
    },
    {
        "description": "Open Account Screen:  Click the Process button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0027003a-0066-000c-00f0-000a003300f9.png",
        "timestamp": 1542137811934,
        "duration": 135
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00960049-008f-005e-0078-00a2001800d4.png",
        "timestamp": 1542137812409,
        "duration": 124
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23240,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:141:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00330032-008f-006f-00ee-003000cb008a.png",
        "timestamp": 1542137813014,
        "duration": 58
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004200ba-00d7-0079-00a5-002300a5009f.png",
        "timestamp": 1542138433164,
        "duration": 1415
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00360003-00ac-008d-0035-009a0096004b.png",
        "timestamp": 1542138435058,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00af0010-00a9-0061-0061-009e00ce006a.png",
        "timestamp": 1542138435518,
        "duration": 135
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003a00aa-0090-0034-006a-003d00680092.png",
        "timestamp": 1542138436078,
        "duration": 131
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009200aa-00c9-00b7-001f-00cf009a00da.png",
        "timestamp": 1542138436592,
        "duration": 514
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bd0045-0091-00b9-0045-00a800cb003d.png",
        "timestamp": 1542138437546,
        "duration": 137
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00af0021-0097-00df-00ee-000200920065.png",
        "timestamp": 1542138438053,
        "duration": 117
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006f00f9-00ad-00b2-0070-00fe004200a3.png",
        "timestamp": 1542138438516,
        "duration": 181
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00260017-0061-00bf-00f9-004c001200c1.png",
        "timestamp": 1542138439032,
        "duration": 170
    },
    {
        "description": "Open Account Screen:  Click the Process button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000900c1-0025-008f-0094-00a7005f0016.png",
        "timestamp": 1542138439573,
        "duration": 135
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f4009a-004f-008e-00d4-00a000be00ce.png",
        "timestamp": 1542138440043,
        "duration": 122
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:141:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00030060-00e3-0007-007d-002300fc00b1.png",
        "timestamp": 1542138440881,
        "duration": 53
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004f0036-0047-00bf-00e5-00d300510079.png",
        "timestamp": 1542138791032,
        "duration": 1391
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ef0023-00e8-00b3-008d-000d00510071.png",
        "timestamp": 1542138793048,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008300f7-0022-0051-002e-00f600140069.png",
        "timestamp": 1542138793724,
        "duration": 131
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f50073-00ae-0015-002b-00a400fe004c.png",
        "timestamp": 1542138794219,
        "duration": 134
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00680027-00f2-007b-0025-009300f00075.png",
        "timestamp": 1542138794796,
        "duration": 494
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00630016-0018-0033-006f-000400ec0088.png",
        "timestamp": 1542138795721,
        "duration": 163
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a70080-008b-00f1-00cc-00e100d100b3.png",
        "timestamp": 1542138796265,
        "duration": 115
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ad002f-000b-0016-006e-002500d600c4.png",
        "timestamp": 1542138796738,
        "duration": 174
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005400a1-00bb-00f2-001b-007800c90070.png",
        "timestamp": 1542138797254,
        "duration": 155
    },
    {
        "description": "Open Account Screen:  Click the Process button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00db008c-007d-00b3-00bb-008a00dd00ce.png",
        "timestamp": 1542138797700,
        "duration": 143
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00400033-002a-00f8-006a-003000d60030.png",
        "timestamp": 1542138798184,
        "duration": 108
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 28452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:141:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d60036-007f-0054-001a-006700e700db.png",
        "timestamp": 1542138798741,
        "duration": 47
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0041001c-00ed-00db-00a9-0051009500e9.png",
        "timestamp": 1542222849814,
        "duration": 1871
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005f00da-00fc-00b5-00e5-002e00aa00cc.png",
        "timestamp": 1542222852275,
        "duration": 73
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00430063-00db-0084-005e-00dd00ce00b3.png",
        "timestamp": 1542222852741,
        "duration": 146
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b90059-00d2-0055-00c0-001a00b10038.png",
        "timestamp": 1542222853658,
        "duration": 153
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003e0008-0018-0050-00e5-00cd00bd00e8.png",
        "timestamp": 1542222854304,
        "duration": 715
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008c0032-00d9-0069-00e1-0083001b0011.png",
        "timestamp": 1542222855424,
        "duration": 260
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a400dc-008d-006d-00ad-008200d9000c.png",
        "timestamp": 1542222856141,
        "duration": 235
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003000c4-009f-0046-0013-00b600bf00ad.png",
        "timestamp": 1542222856755,
        "duration": 208
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002700f4-00e4-0075-008c-004800600082.png",
        "timestamp": 1542222857332,
        "duration": 183
    },
    {
        "description": "Open Account Screen:  Click the Process button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ee0030-0074-0033-005a-009600a200ff.png",
        "timestamp": 1542222857912,
        "duration": 166
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d10038-00a5-0018-0037-005400df00fb.png",
        "timestamp": 1542222858452,
        "duration": 132
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 30652,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:141:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d50003-0075-0092-00b0-00b000b1005a.png",
        "timestamp": 1542222859043,
        "duration": 77
    },
    {
        "description": "Launch XYZ Bank Application:  Open Browser and Navigate to URL|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d600cb-003c-0009-0028-009600b700f8.png",
        "timestamp": 1542227126584,
        "duration": 1650
    },
    {
        "description": "Launch XYZ Bank Application:  Verify Application Title|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00920075-00a1-00a5-00e3-007700ef00e0.png",
        "timestamp": 1542227128732,
        "duration": 69
    },
    {
        "description": "Login:  Login as a Bank Manager|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007400af-002d-0080-00b2-00af002a0066.png",
        "timestamp": 1542227129118,
        "duration": 129
    },
    {
        "description": "PostLoginScreen:  Click the top Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a100fa-00d8-00bf-0064-002f0013006e.png",
        "timestamp": 1542227129603,
        "duration": 115
    },
    {
        "description": "Add Customers Screen:  Enter Customer Data|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005e0004-0087-00e7-00f8-005d003800d0.png",
        "timestamp": 1542227130237,
        "duration": 432
    },
    {
        "description": "Add Customers Screen:  Click the bottom Add Customer button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00930078-00fb-00df-0021-00ff002500f1.png",
        "timestamp": 1542227131088,
        "duration": 145
    },
    {
        "description": "PostLoginScreen:  Click the top Open Account button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005c00d7-009e-0016-0038-00b6009a0045.png",
        "timestamp": 1542227131605,
        "duration": 118
    },
    {
        "description": "Open Account Screen:  Choose Customer|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0094004f-00a5-0085-007d-00040097002c.png",
        "timestamp": 1542227132105,
        "duration": 155
    },
    {
        "description": "Open Account Screen:  Choose Currency|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009b004f-0030-009a-0005-005e004d00de.png",
        "timestamp": 1542227132634,
        "duration": 156
    },
    {
        "description": "Open Account Screen:  Click the Process button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fb0009-00e8-0049-0065-0051004000f1.png",
        "timestamp": 1542227133144,
        "duration": 114
    },
    {
        "description": "PostLoginScreen:  Click the top Customers button|Create a New Bank Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c10062-003e-0013-0069-0071006b0093.png",
        "timestamp": 1542227133614,
        "duration": 101
    },
    {
        "description": "Delete Customers Screen:  Delete Customer Record|Create a New Bank Customer",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11424,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: Cannot read property 'myCustomerTable' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'myCustomerTable' of undefined\n    at C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Pages\\BankManagerTestPages\\DeleteCustomersScreen.js:71:61\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Delete Customers Screen:  Delete Customer Record\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:141:5)\n    at addSpecsToSuite (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqda3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqda3\\WorkSpace\\CreateMyProjectHere\\MyProject\\Specs\\BankManagerTC.js:31:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "002800df-00b2-0075-00e6-00bf00870009.png",
        "timestamp": 1542227134155,
        "duration": 53
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
