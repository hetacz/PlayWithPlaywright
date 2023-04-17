Feature: Ecommerce validations

    @Regression
    Scenario: Placing the order
        Given Login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When Add "zara coat 3" to the Cart
        Then Verify "zara coat 3" is displayed in the Cart page
        When Enter valid details and Place the Order
        Then Verify Order is present in the order history
