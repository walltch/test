const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

let driver;

beforeAll(async () => {
    console.log('Initializing headless Chrome driver');
    const options = new chrome.Options().addArguments('--headless', '--disable-gpu', '--window-size=1920,1080');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    console.log('Driver initialization complete');
});

afterAll(async () => {
    console.log('Starting driver teardown');
    if (driver) {
        await driver.quit();
    }
    console.log('Driver teardown complete');
});

test('Member Registration', async () => {
    try {
        console.log('Navigating to the reservation page');
        await driver.get('http://localhost:8000/reservation');
        console.log('Clicking on the Member Registration link');
        await driver.findElement(By.linkText('Member Registration')).click();
        console.log('Entering first name');
        await driver.findElement(By.id('firstName')).sendKeys('John');
        console.log('Entering last name');
        await driver.findElement(By.id('lastName')).sendKeys('Doe');
        console.log('Entering email');
        await driver.findElement(By.id('email')).sendKeys('john.doe@example.com');
        console.log('Entering password');
        await driver.findElement(By.id('password')).sendKeys('password123');
        console.log('Submitting the registration form');
        await driver.findElement(By.tagName('form')).submit();
        console.log('Waiting for the confirmation page to load');
        await driver.wait(until.elementLocated(By.tagName('h1')), 10000);
        console.log('Retrieving the confirmation message');
        const confirmationText = await driver.findElement(By.tagName('h1')).getText();
        console.log('Verifying the registration was successful');
        expect(confirmationText).to.contain('Member Registration Successful');
        console.log('Test completed successfully');
    } catch (error) {
        console.error('Error during test:', error);
        throw error;
    }
}, 15000);