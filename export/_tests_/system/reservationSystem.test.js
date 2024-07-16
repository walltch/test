const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;

beforeAll(async () => {
    const options = new chrome.Options().addArguments('headless');
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
        await driver.get('http://localhost:8000'); // Navigate to the application.
        await driver.findElement(By.linkText('Member Registration')).click(); // Click on the Member Registration link.
        await driver.findElement(By.id('firstName')).sendKeys('John'); // Enter first name.
        await driver.findElement(By.id('lastName')).sendKeys('Doe'); // Enter last name.
        await driver.findElement(By.id('email')).sendKeys('john.doe@example.com'); // Enter email.
        await driver.findElement(By.id('password')).sendKeys('password123'); // Enter password.
        await driver.findElement(By.tagName('form')).submit(); // Submit the registration form.
        await driver.wait(until.elementLocated(By.tagName('h1')), 10000); // Wait for the confirmation page to load.
        const confirmationText = await driver.findElement(By.tagName('h1')).getText(); // Get the confirmation message.
        expect(confirmationText).toContain('Member Registration Successful'); // Verify the registration was successful.
    } catch (error) {
        console.error('Error during test:', error);
        throw error; // Rethrow the error to fail the test if an exception occurs.
    }
}, 15000); // Set the timeout for this test to 15 seconds.