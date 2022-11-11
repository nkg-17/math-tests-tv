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
		return new Promise((resolve, reject) => {
			if (this.Tests[testId]) {
				resolve(this.Tests[testId]);
			}
			else {
				reject(`Задача ${testId} не найдена`);
			}
		});
	}

	static requestIdList() {
		let ids = [];
		for (let id in this.Tests) ids.push(id);
		return new Promise((resolve, reject) => resolve(ids));
	}

	static requestTestList() {
		return new Promise((resolve, reject) => resolve(this.Tests));
	}

	static requestRandomId(excludeIds = []) {
		return new Promise(async (resolve, reject) => {
			let arr = await this.requestIdList();
			arr = arr.filter((id) => !excludeIds.includes(id));

			const i = Math.floor(Math.random() * (arr.length));

			resolve(arr[i]);
		});
	}

	static requestNextIdFor(testId) {
		return this._requestShiftIdFor(testId, 1);
	}

	static requestPrevIdFor(testId) {
		return this._requestShiftIdFor(testId, -1);
	}

	static _requestShiftIdFor(testId, shift) {
		return new Promise(async (resolve, reject) => {
			let arr = await this.requestIdList();
			let i = arr.indexOf(testId);

			if (i === -1) {
				reject(`Could not request next/prev test ID for ${testId}`);
				return;
			}

			i = (i + shift) % arr.length;
			i = (i < 0) ? arr.length + i : i;

			resolve(arr[i]);
		});
	}
}