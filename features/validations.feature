Feature: Ecommerce validations

    @Validation
    @foo
    Scenario Outline: Placing the order
        Given Login to Ecommerce application with "<username>" and "<password>"
        Then Verify error message is displayed.

        Examples:
            | username           | password  |
            | anshika@gmail.com  | Qwe123!@# |
            | notexist@gmail.com | qwe123    |
            | edzioo@gmail.com   | qwe123    |
