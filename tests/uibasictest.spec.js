//@ts-check
const { test, expect } = require('@playwright/test');


test('Browser playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const errDiv = page.locator('[style*="block"]');
    const usernameFld = page.locator('#username');
    const passwordFld = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardDiv = page.locator('div.card-body a');

    // DONT LOAD CSS & IMG
    page.route('**/*.css', (route) => route.abort());
    page.route('**/*.{jpg,jpeg,png}', (route) => route.abort());

    page.on('request', (request) => console.log(request.url()));
    page.on('response', (response) => console.log(response.url() + ' ' + response.status()));

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await usernameFld.type('wrong');
    await passwordFld.type('learning');
    // await page.locator('#terms').check();
    await signInBtn.click();
    console.log(await errDiv.textContent());
    await expect(errDiv).toContainText('Incorrect');
    await usernameFld.fill('');
    await usernameFld.fill('rahulshettyacademy');

    /* deprecated
    await Promise.all([
        page.waitForNavigation(),
        signInBtn.click()
    ]);
    */

    await signInBtn.click();
    console.log(await cardDiv.first().textContent());
    console.log(await cardDiv.nth(1).textContent());
    console.log(await cardDiv.last().textContent());
    const cardTexts = await cardDiv.allTextContents();
    console.log(cardTexts);
});

test('Page playwright test', async ({ browser, page }) => {

    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('UI controls', async ({ browser, page }) => {

    const documentLink = page.locator('a[href*="documents-request"]');
    const usernameFld = page.locator('#username');
    const passwordFld = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const radioOpt = page.locator('#usertype');
    const okayBtn = page.locator('#okayBtn');
    const toc = page.locator('#terms');
    const dropdown = page.locator('select.form-control');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    await dropdown.selectOption('consult');
    await radioOpt.last().click();
    await okayBtn.click();
    await expect(radioOpt.last()).toBeChecked();
    await toc.click();
    await expect(toc).toBeChecked();
});

test('New window', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const usernameFld = page.locator('#username');
    const passwordFld = page.locator('#password');
    const documentLink = page.locator('a[href*="documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [page2] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await page2.locator('.red').textContent();
    console.log(text);
    const email = text
        .split(' ')
        .filter((word) => word.includes('@'))[0];
    console.log(email);

    await usernameFld.fill(email);
});
