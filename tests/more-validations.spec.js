//@ts-check
const { test, expect } = require('@playwright/test');

// !!!
test.describe.configure({ mode: 'parallel' });
// test.describe.configure({ mode: 'serial' }); // won't execute latter if former fails

test('Popup validation', async ({ browser, page }) => {

    const displayedText = page.locator('#displayed-text');
    const hideBtn = page.locator('#hide-textbox');
    const confirmBtn = page.locator('#confirmbtn');
    const mousehover = page.locator('#mousehover');

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(displayedText).toBeVisible();
    await hideBtn.click();
    await expect(displayedText).toBeHidden();
    page.on('dialog', (dialog) => dialog.accept());
    await confirmBtn.click();
    await mousehover.hover();
    const frame = page.frameLocator('#courses-iframe');
    await frame.locator('li a[href*="lifetime-access"]:visible').click();
    const subscribersText = await frame.locator('.text h2').textContent();
    const subs = subscribersText.replace(/[^0-9]/g, '').trim();
    console.log(subs);

});

test('Screenshot & Visual comparision', async ({ browser, page }) => {

    const displayedText = page.locator('#displayed-text');
    const hideBtn = page.locator('#hide-textbox');

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(displayedText).toBeVisible();
    await displayedText.screenshot({ path: 'partial-screenshot.png' });
    await hideBtn.click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(displayedText).toBeHidden();
});

test('Visual', async ({ browser, page }) => {

    await page.goto('https://www.google.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
