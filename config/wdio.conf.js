exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        '../tests/**/*.test.js'
    ],
    // ============
    // Capabilities
    // ============
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '15',
        'appium:deviceName': 'sdk_gphone64_x86_64',
        'appium:udid': 'emulator-5554',
        'appium:app': 'https://miniapp-test.momocdn.net/app/TW7h1CzDC8LSdeV/android/ANDROID_UAT_v22709.apk',
        'appium:automationName': 'uiautomator2'
    }],
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    // ===================
    // Hooks
    // ===================
    beforeEach: async function () {
        const permissions = [
            'android.permission.CAMERA',
            'android.permission.ACCESS_FINE_LOCATION',
            'android.permission.READ_CONTACTS',
        ];

        await driver.execute('mobile: changePermissions', {
            appPackage: 'vn.momo.platform.test',
            permissions: permissions,
            state: 'granted'
        });

        await driver.launchApp();
    },

    afterEach: async function () {
        await driver.closeApp();
    },
}