# API & E2E testing
This repository is used for to accomodate the **API testing** and the **End to End** tests for 

**The jobs are triggered on every push towards the `main` branch**
**You will need to provide a "credentials.json" file in the root directory using this syntax:**
```json
{
    "emailAddress": "<your_username>",
    "password": "<your_password>"
}
```
**in order for the tests to run**


## Github Actions

The file that contains all of the workflow's actions is located within the **.github/workflows** directory. The following steps are being dictated within the "main.yml" file :

### Task1: 
All 5 tests are found within the `Task1.md` file inside the root directory of this project



### apitests:
 - Checkout Repository - Fetch the source code from the repository
 - Run Newman Tests - Newman tests (invoked through an npm script) against the [API](https://reqres.in/)
 - Upload Artifacts - An html file is being  exported as an artifact (Can be accessed **after the test has finished running**)

### e2etests:

 - Checkout Repository - Fetch the source code from the repository
 - Run playwright tests - End to End (Playwright) tests (invoked through an npm script) for the URL: https://magento.softwaretestingboard.com/
 - Upload Artifacts - If any tests fail, screenshots of the associated landing page's issue will be taken (Can be accessed **after the test has finished running**)


## Tests

### API tests:

Within the `apitests` directory, the newman (Postman) collection and environment files are present. These files contain the scripts used to test against the API. 

### End to End tests:
Within the `e2etests\playwrightautomations` directory, the Playwright tests file and fixtures files are present. These files contain the code used to test the URL provided. 