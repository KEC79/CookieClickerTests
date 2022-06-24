# airelogic-cookie-clicker Tests

This project contains a set of UI tests using Testcafe and API tests using jest to test the Cookie Clicker application. This is not and exhaustive set of tests but serves to give an example of some tests that could be written for regression testing purposes.

## Required Installs and project set-up

This is written in javascript using yarn as the package manager. It relies on node and yarn being installed.

-   [NodeJS](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/en/docs/install#windows-stable)

Once the required programs are installed the appropriate packages can be installed by running:

```
yarn
```

## UI Tests Overview

The UI tests run the through what I considered to be the main user journeys in the application:

    A player can create a new game with empty counters
    A player can navigate back to home page from game page
    A player can add a cookie
    A player can sell a cookie
    A player can buy a factory
    A player can view their game and score on home page and reenter game via link
    An error is displayed when player uses an invalid url

The Testcafe tests are currently configured to run in chrome but can be easily set to use different browsers by adding a `browsers` section to the config specifying the browsers to run the tests or add the browsers directly to the yarn script in `package.json`. The tests have also been configured to take screenshots on failure. Any screenshots will be saved to `tests/ui/screenshots` directory.

NOTE: Currently 2 UI tests are failing. This is due to assumed incorrect behaviour from the application i.e. the values from the sell cookie and buy factory inputs are not cleared after submitting (see 'Game page bugs' sheet in Cookie Clicker spreadsheet for further information). As these tests were not written alongside the development of the app and the app is known to have bugs, assumptions on the correct behaviour have been made and the tests are written to assert assumed correct behaviour. For further information on the assumed correct behaviour of the application see the 'Features and player actions' sheet in Cookie Clicker spreadsheet sent with this submission.

To run the Testcafe tests, run:

```
yarn test:ui
```

## API Tests Overview

The API tests are used to test api validation:

    It should not allow more cookies than are owned to be sold
    It should only accept whole numbers when selling cookies
    It should not accept non-numeric characters when selling cookies
    It should not accept a null value when selling cookies
    It should not accept negative numbers when selling cookies
    It should not allow negative numbers when buying factories
    It should not allow player to buy factories if not enough money
    It should only accept whole numbers when buying factories
    It should not accept non-numeric characters when buying factories
    It should not accept a null value when buying factories

These tests were approached via the API as any validation messages from the API are not surfaced to the UI. In addition, given this is testing server-side validation, it seems reasonable to interact directly with the API for this.

NOTE: Currently 3 API tests are failing. This is due to assumed incorrect behaviour from the application i.e. the ability to add negative numbers when selling cookies; the ability to buy factories with no money; the ability to sell fractions of cookies (see bug sheet for further information). As these tests were not written alongside the development of the app and the app is known to have bugs, assumptions on the correct behaviour have been made and the tests are written to assert assumed correct behaviour. For further information on the assumed correct behaviour of the application see the 'Features and player actions' sheet in Cookie Clicker spreadsheet sent with this submission.

To run the Jest API tests, run:

```
yarn test:api
```

## Test Approach Summary

This is a sub-set of tests for this application and others could be written. In an ideal scenario, tests would be written as part of the development which would enable a fuller suite of tests representing correct behaviour. I am a believer in pushing testing as low down the stack as possible where possible, and therefore it may be that quite a lot of the tests for this application, such as validation, calculating cookie/sec factory rates etc, could be tested via unit tests or integration tests allowing for faster feedback and reducing the need to spin up a full application to check low-level logic. Overall, the aim of these tests is to cover the main user journeys and any API validation. They do not cover areas such as cookie accumulation rates via factories and page refreshing as the actual rate is not known and would therefore would make the tests non-deterministic and potentially flaky.

In addition, these tests do not manage data due to not having a mechanism to set up or clear down data before/after test runs. Again, it would be advantageous for the tests to do this via before or after hooks to allow for a more deterministic test environment without any issues brought about by old or corrupted data. Having the ability to manage test data for a specific test also allows for more atomic tests whereas in this circumstance some tests have had to use the test itself to set up data thereby making it less atomic. Overall though, the tests have been written to not be dependent upon one another so no data-related problems should be encountered.
