import { Octokit } from "octokit";
import { validateTest } from '../common/MathTest';
import createTestFromDesc from './util';


export default class GithubTestsAPI {
	static OctokitAPI = null;
	static cache = {};

	static init() {
		this.OctokitAPI = new Octokit({
			userAgent: "math-tests-app/v1.0.0"
		});
	}

	static requestTest(testId, useCache = true) {
		if (useCache && this._wasTestCached(testId))
			return this._promiseTestFromCache(testId);
		return this._promiseTestFromGithub(testId);
	}

	static requestIdList() {
		return this._requestPath("tests").then(
			(resp) => resp['data'].map((e) => e.name)
		);
	}

	static requestTestList(filter = null) {
		let tests = [];
		return this.requestIdList().then(
			(list) => Promise.all(
				list.map(
					(id) => this.requestTest(id).then((test) => tests.push(test))
				)
			)
		).then(() => tests);
	}

	static requestRandomId(excludeIds = []) {
		return this.requestIdList().then(
			(ids) => {
				ids = ids.filter((id) => !excludeIds.includes(id));
				const i = Math.floor(Math.random() * (ids.length));
				return ids[i];
			}
		);
	}


	static _wasTestCached(testId) {
		return this.cache[testId] !== undefined;
	}

	static _promiseTestFromCache(testId) {
		return new Promise((resolve, reject) => { resolve(this.cache[testId]); });
	}

	static _promiseTestFromGithub(testId) {
		return this._fetchTestDescription(testId).then(
			(desc) => createTestFromDesc({ ...desc, id: testId })
		).then(
			(test) => {
				if (!validateTest(test).ok)
					throw new Error(`Test ${test.id} is invalid. ${validateTest(test).errorMessage}. Test: ${JSON.stringify(test)}`);
				this.cache[test.id] = test;
				return test;
			}
		);
	}

	static _fetchTestDescription(testId) {
		return this._requestPath(`tests/${testId}/description.json`).then(
			(resp) => fetch(resp['data']['download_url'])
		).then(
			(data) => data.json()
		).catch(
			(error) => new Error(`Failed to parse ${testId}/description.json. Inner error: ${error.toString()}`)
		);
	}

	static _requestPath(path) {
		return this.OctokitAPI.request('GET /repos/{owner}/{repo}/contents/{path}', {
			owner: 'nkg-17',
			repo: 'math-tests-archive',
			path: path
		});
	}
}
