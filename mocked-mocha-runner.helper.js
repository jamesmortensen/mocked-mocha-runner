import Mocha from 'mocha';


class MockedMochaRunner {

    constructor() {
        //this.Mocha = require('mocha');
        this.RUNNER_CONST = Mocha.Runner.constants;  
        this.testCount = 0;
        this.suiteCount = 0;
        this.stats = {
            passes: 0,
            failures: 0,
            pending: 0
        };
        this.fnQueue = {};
        
    }

    once(eventName, callback) {
        return this.#onceOrOn(eventName, callback);
    }

    on(eventName, callback) {
        return this.#onceOrOn(eventName, callback);
    }

    #onceOrOn(eventName, callback) {
        this.fnQueue[eventName] = callback;
        return this;
    }

    fireEvent(eventName) {
        const callback = this.fnQueue[eventName];
        if (!callback) {
            console.log('no callback for event ' + eventName);
            return;
        }
        if (eventName === this.RUNNER_CONST.EVENT_TEST_PASS) {
            this.testCount++;
            this.stats.passes++;
            callback({
                fullTitle: () => `Suite ${this.suiteCount} Test ${this.testCount}`,
                title: 'Test ' + this.testCount
            });
        }
        if (eventName === this.RUNNER_CONST.EVENT_TEST_FAIL) {
            this.testCount++;
            this.stats.failures++;
            callback({
                fullTitle: () => `Suite ${this.suiteCount} Test ${this.testCount}`,
                title: 'Test ' + this.testCount
            });
        }
        if (eventName === this.RUNNER_CONST.EVENT_SUITE_BEGIN) {
            this.suiteCount++;
            callback();
        }
        if (eventName === this.RUNNER_CONST.EVENT_SUITE_END) {
            callback();
        }
        if (eventName === this.RUNNER_CONST.EVENT_TEST_BEGIN) {
            callback();
        }
        if (eventName === this.RUNNER_CONST.EVENT_TEST_BEGIN) {
            callback();
        }
        if (eventName === this.RUNNER_CONST.EVENT_RUN_BEGIN) {
            callback();
        }
        if (eventName === this.RUNNER_CONST.EVENT_RUN_END) {
            callback();
        }
        return this;
    }
}

export default MockedMochaRunner;
