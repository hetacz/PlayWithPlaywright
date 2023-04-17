//@ts-check
const { test, expect } = require('@playwright/test');

test('Register and login', async ({ page, browser }) => {

    const gotoRegisterBtn = page.locator('a.text-reset');
    const firstNameFld = page.locator('#firstName');
    const lastNameFld = page.locator('#lastName');
    const emailFld = page.locator('#userEmail');
    const phoneFld = page.locator('#userMobile');
    const occupationDrop = page.locator('select[formcontrolname="occupation"]');
    const maleOpt = page.locator('input[value="Male"]');
    const femaleOpt = page.locator('input[value="Female"]');
    const passwordFld = page.locator('#userPassword');
    const confirmPasswordFld = page.locator('#confirmPassword');
    const checkbox = page.locator('input[type="checkbox"]');
    const submitBtn = page.locator('#login');
    const gotoLoginBtn = page.locator('button.btn');

    const email = 'qwe' + Math.floor(Math.random() * 1000) + '@qwe.pl';
    const pwd = 'Qwe123!@#';

    await page.goto('https://rahulshettyacademy.com/client/');
    await gotoRegisterBtn.click();
    await firstNameFld.fill('John');
    await lastNameFld.fill('Doe');
    await emailFld.fill(email);
    await phoneFld.fill('1234567890');
    await occupationDrop.selectOption('2: Student');
    await maleOpt.check();
    await passwordFld.fill(pwd);
    await confirmPasswordFld.fill(pwd);
    await checkbox.check();
    await submitBtn.click();
    await gotoLoginBtn.click();
    await emailFld.fill(email);
    await passwordFld.fill(pwd);
    await submitBtn.click();

    await expect(page).toHaveTitle('Let\'s Shop');
});

test.skip('Login', async ({ page, browser }) => {

    const emailFld = page.locator('#userEmail');
    const passwordFld = page.locator('#userPassword');
    const submitBtn = page.locator('#login');
    const card = page.locator('div.card-body b');

    const email = 'anshika@gmail.com';
    const password = 'Iamking@000';

    await page.goto('https://rahulshettyacademy.com/client/');
    await emailFld.type(email);
    await passwordFld.type(password);
    await submitBtn.click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Let\'s Shop');

    const titles = await card.allTextContents();
    console.log(titles);
});
