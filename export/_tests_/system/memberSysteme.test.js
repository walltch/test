const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = chrome;

let driver;

beforeAll(async () => {
    const options = new Options().addArguments('headless');
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
});

afterAll(async () => {
    if (driver) {
        await driver.quit();
    }
});

test('Member Registration', async () => {
    try {
        await driver.get('http://localhost:3000');
        await driver.wait(until.elementLocated(By.linkText('Member Registration')), 10000);
        await driver.findElement(By.linkText('Member Registration')).click();
        await driver.findElement(By.id('firstName')).sendKeys('John');
        await driver.findElement(By.id('lastName')).sendKeys('Doe');
        await driver.findElement(By.id('email')).sendKeys('john.doe@example.com');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.tagName('form')).submit();
        await driver.wait(until.elementLocated(By.tagName('h1')), 10000);
        const confirmationText = await driver.findElement(By.tagName('h1')).getText();
        expect(confirmationText).toContain('Member Registration Successful');
    } catch (error) {
        console.error('Error during test:', error);
        throw error;
    }
}, 15000);