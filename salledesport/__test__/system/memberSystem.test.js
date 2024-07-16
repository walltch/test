import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';
import mongoose from 'mongoose';
import Member from '../../src/models/member.js';

describe('Member System Test', () => {
  let driver;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    await driver.quit();
  });

  it('should register a new member through UI', async () => {
    await driver.get('http://localhost:3000/register');

    await driver.findElement(By.id('nom')).sendKeys('Doe');
    await driver.findElement(By.id('prenom')).sendKeys('John');
    await driver.findElement(By.id('email')).sendKeys('john.doe@example.com');
    await driver.findElement(By.id('password')).sendKeys('password');

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs('http://localhost:3000/gyms'), 10000);

    const member = await Member.findOne({ email: 'john.doe@example.com' });
    expect(member).toBeDefined();
    expect(member.nom).toBe('Doe');
    expect(member.prenom).toBe('John');
  });
});