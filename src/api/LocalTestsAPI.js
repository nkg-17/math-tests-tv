import { validateTest } from '../common/MathTest';
import createTestFromDesc from './util';

/*
	Sometimes you can reach GitHub's request limit 
	so you may use this on instead.
*/
export default class LocalTestsAPI {
	static Tests = require("./localTests.json");

	static init() {
		for (let i = 0; i < this.Tests.length; i++) {
			this.Tests[i] = createTestFromDesc(this.Tests[i]);
			if (!validateTest(this.Tests[i]).ok) {
				console.error(`Test[${i}] (${this.Tests[i].id}) is invalid\n${validateTest(this.Tests[i]).errorMessage}'\n`, this.Tests[i]);
			}
		}
	}

	static requestTest(testId) {
		return new Promise((resolve, reject) => resolve(this.Tests[testId]));
	}

	static requestIdList() {
		let array = [];
		for (let id in this.Tests) array.push(id);
		return Promise((resolve, reject) => resolve(array));
	}

	static requestTestList() {
		return new Promise((resolve, reject) => resolve(this.Tests));
	}
}