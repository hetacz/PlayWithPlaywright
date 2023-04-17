# Codegen

`npx playwright codegen http://google.com`

## Accs

`edzioo@gmail.com`
`edzioo2@gmail.com`

## Allure

allure generate ./allure-results --clean
allure open ./allure-report

## Cucumber

parallel scenarions inside feature:

npx cucumber-js --parallel n --exit

### Report

npx cucumber-js --parallel n --exit --format html:cucumber-report.html

### Retry

npx cucumber-js --parallel n --exit --retry n

or

config file: { retry: 1 }

if passed on retry report will show pass, if fails in retry too it just fails with no special description.
