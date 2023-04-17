//@ts-check

const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        // this.signInButton = element(by.css('#login'));
        this.page = page;
        this.signInButton = page.locator('#login');
        this.emailField = page.locator('#userEmail');
        this.passwordField = page.locator('#userPassword');
        this.toast = page.getByRole('alert');
    }

    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async login(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getToastMessage() {
        expect(await this.toast.isVisible()).toBeTruthy();
        expect(await this.toast.textContent()).toContainText('Incorrect email or password.');
    }
}

module.exports = { LoginPage };
