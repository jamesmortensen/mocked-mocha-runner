# mocked-mocha-runner

This is a small class to mock the Mocha runner to help test custom reporters. Simply pass this into the constructor of a Mocha custom reporter and test the reporter without needing to run Mocha.

## Installation

```bash
$ npm i mocked-mocha-runner --save-dev
```

## Usage Example

Below is an example that instantiates the MockedMochaRunner, creates some reporterOptions, and passes the options and the mockedRunner into the reporter.

The reporter's events are triggered by calling Mocha runner events using the mockedRunner methods.

```javascript
 it('should report some results', () => {
        const mockedRunner = new MockedMochaRunner();
        const reporterOptionsWrapper = {
            "reporterOptions": {
                "option1": "value1",
                "option2": "value2",
                "logger": console
            }
        }
        const reporter = new TestEsmReporter(mockedRunner, reporterOptionsWrapper);

        const mochaEvents = [
            EVENT_RUN_BEGIN,
            EVENT_SUITE_BEGIN,
            EVENT_TEST_PASS,
            EVENT_TEST_PASS,
            EVENT_TEST_FAIL,
            EVENT_TEST_PASS,
            EVENT_TEST_PENDING,
            EVENT_SUITE_END,
            EVENT_RUN_END
        ];
        mochaEvents.forEach((mochaEvent) => {
            mockedRunner.fireEvent(mochaEvent);
        });

        expect(mockedRunner.hasEnded).to.equal(true);
    });
```

## License

Copyright (c) James Mortensen, 2023 MIT License
