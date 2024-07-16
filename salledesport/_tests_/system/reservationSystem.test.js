const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;

// Jest lifecycle method for setup
beforeAll(async () => {
    console.log('Setting up driver with headless Chrome');
    const options = new chrome.Options().addArguments('headless'); // Use addArguments to set headless mode
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    console.log('Driver setup complete');
}, 30000); // Increase timeout if necessary

// Jest lifecycle method for teardown
afterAll(async () => {
    console.log('Tearing down driver');
    if (driver) {
        await driver.quit();
    }
    console.log('Driver teardown complete');
}, 10000); // Increase timeout if necessary

// Example test case
test('Reservation System', async () => {
    try {
        console.log('Navigating to reservation page');
        await driver.get('http://localhost:8000/reservation');

        await driver.wait(until.elementLocated(By.id('gymSelector')), 5000);
        const gymSelector = await driver.findElement(By.id('gymSelector'));
        await gymSelector.sendKeys('Gym A');

        await driver.wait(until.elementLocated(By.id('machineSelector')), 5000);
        const machineSelector = await driver.findElement(By.id('machineSelector'));
        await machineSelector.sendKeys('Machine 101');

        const confirmButton = await driver.findElement(By.id('confirmButton'));
        await confirmButton.click();

        const confirmationMessage = await driver.findElement(By.id('confirmationMessage')).getText();
        expect(confirmationMessage).toContain('Reservation confirmed');

        console.log('Reservation confirmed successfully');
    } catch (error) {
        console.error('Error during reservation:', error);
        throw error;
    }
}, 20000);