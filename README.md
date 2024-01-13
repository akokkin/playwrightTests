# API & E2E testing
This repository is used for to accomodate the **API testing** and the **End to End** tests for 

**The jobs are triggered on every push towards the `master` branch**



## Github Actions

The file that contains all of the workflow's actions is located within the **.github/workflows** directory. The following steps are being dictated within the "ci.yml" file :

### apitests:
 - Checkout Repository - Fetch the source code from the repository
 - Run Newman Tests - Newman tests (invoked through an npm script) against the [API](https://reqres.in/)
 - Upload Artifacts - An html file is being  exported as an artifact (Can be accessed **after the test has finished running**)

### Part B:

 - Checkout Repository - Fetch the source code from the repository
 - Run Cypress Tests - End to End (Cypress) tests (invoked through an npm script) for the URL: https://trial.stellarblue.eu/
 - Upload Artifacts - If any tests fail, screenshots of the associated landing page's issue will be taken (Can be accessed **after the test has finished running**)


## Tests

### Part A:

Within the `Part A` directory, the newman (Postman) collection and environment files are present. These files contain the scripts used to test against the API. 

### Part B:
Within the `Part B` directory, the Cypress tests file and fixtures files are present. These files contain the code used to test the URL provided. 