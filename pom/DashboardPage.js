//@ts-check

class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('div.card-body');
        this.productsTest = page.locator('div.card-body b');
        this.cart = page.locator('[routerlink*="cart"]');
    }

    async searchProductAddToCart(productName) {
        const titles = await this.productsTest.allTextContents();
        console.log(titles);
        // const searched = await this.products.all().find((product) => product.locator('b').textContent() === productName);
        // await searched.locator('button.w-10').click();
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            const title = await this.products.nth(i).locator('b').textContent();
            if (title.includes(productName)) {
                await this.products.nth(i).locator('button.w-10').click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }
}

module.exports = { DashboardPage };
