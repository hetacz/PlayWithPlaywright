//@ts-check

class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.loginPayload });
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        console.log(loginResponseJson.token);
        return loginResponseJson.token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json',
            },
        });
        // expect(orderResponse.ok()).toBeTruthy();
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        response.orderId = orderResponseJson.orders[0];
        return response;
    }
}

module.exports = { APIUtils };
