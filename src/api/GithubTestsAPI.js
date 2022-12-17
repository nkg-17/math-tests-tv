import { Octokit } from "octokit";
import { validateTest } from 'common/MathTest';
import createTestFromDesc from 'api/util';


const REPO_NAME = "tv-tests-archive";
const REPO_OWNER = "nkg-17";

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
			(resp) => resp['data'].map((e) => e.name).sort((a, b) => {
				let ai = parseInt(a);
				let bi = parseInt(b);
				if (ai < bi) return -1;
				if (ai > bi) return 1;
				return 0;
			})
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
			owner: REPO_OWNER,
			repo: REPO_NAME,
			path: path
		});
	}
}
