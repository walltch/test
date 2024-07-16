const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

let driver;

beforeAll(async () => {
  console.log("Setting up driver with headless Chrome");
  const options = new chrome.Options().addArguments("headless");
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  console.log("Driver setup complete");
}, 30000);

afterAll(async () => {
  console.log("Tearing down driver");
  if (driver) {
    await driver.close();
    await driver.quit();
  }
  console.log("Driver teardown complete");
}, 20000);

test("Member Registration", async () => {
  try {
    console.log("Navigating to registration page");
    await driver.get("http://localhost:8000/register");

    console.log("Filling in first name");
    await driver.findElement(By.id("firstName")).sendKeys("John");

    console.log("Filling in last name");
    await driver.findElement(By.id("lastName")).sendKeys("Doe");

    console.log("Filling in email");
    await driver.findElement(By.id("email")).sendKeys("john.doe@example.com");

    console.log("Filling in password");
    await driver.findElement(By.id("password")).sendKeys("password123");

    console.log("Submitting form");
    await driver.findElement(By.tagName("form")).submit();

    const successMessage = await driver
      .findElement(By.id("successMessage"))
      .getText();
    expect(successMessage).to.include("Registration successful");

    console.log("Test completed successfully");
  } catch (error) {
    console.error("Error during test:", error);
    throw error;
  }
}, 20000);
