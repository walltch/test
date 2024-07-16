const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const mongoose = require('mongoose');
const Member = require('../../src/models/member');
const Reservation = require('../../src/models/reservation');

describe('Reservation System Test', () => {
  let driver;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const member = new Member({ nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', password: 'password' });
    await member.save();

    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    await driver.quit();
  });

  it('should make a reservation through UI', async () => {
    await driver.get('http://localhost:3000/gyms');

    await driver.findElement(By.css('select#gym')).sendKeys('Salle A');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs('http://localhost:3000/machines'), 10000);

    await driver.findElement(By.css('select#machine')).sendKeys('Machine 1');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs('http://localhost:3000/confirmation'), 10000);

    const reservation = await Reservation.findOne({ gym: 'Salle A', machine: 'Machine 1' });
    expect(reservation).toBeDefined();
    expect(reservation.gym).toBe('Salle A');
    expect(reservation.machine).toBe('Machine 1');
  });
});
