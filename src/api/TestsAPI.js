import { Octokit } from "octokit";
import MathTest from '../common/MathTest';


class GithubTestsAPI {
	static OctokitAPI = null;
	static cache = {
		testList: {}
	};

	static init() {
		this.OctokitAPI = new Octokit({
			userAgent: "math-tests-app/v1.0.0"
		});
	}

	static requestTestInfo(testId, fetchCache = true) {
		if (fetchCache && this.cache.testList[testId] !== undefined) {
			return new Promise((resolve, reject) => { resolve(this.cache.testList[testId]); });
		} else {
			return new Promise(async (resolve, reject) => {
				let resp = null;
				await this._requestPath(`tests/${testId}/description.json`).then(
					(okResp) => { resp = okResp; },
					(error) => { 
						console.error(`GET ${testId}/description.json. Error:`, error);
						let myError = new Error(error);
						myError.message = `(Test ${testId}) ` + error.toString();
						reject(myError);
					},
				);
				if (!resp)
					return;

				// Get raw description.json contents
				let testRawContents = null;
				await fetch(resp['data']['download_url']).then(
					(contents) => { testRawContents = contents },
					(error) => { 
						console.error(`FETCH ${testId}/description.json. Error:`, error); 
						let myError = new Error(error);
						myError.message = `(Test ${testId}) ` + error.toString();
						reject(myError);
					}
				);			
				if (!testRawContents)
					return;

				// parse JSON
				let mathTest = new MathTest();
				await testRawContents.json().then(
					(obj) => { mathTest.loadFromDescription(obj); },
					(error) => { 
						console.error(`PARSE ${testId}/description.json. Error:`, error); 
						let myError = new Error(error);
						myError.message = `(Test ${testId}) ` + error.toString();
						reject(myError);
					}
				);			

				// Add missing ID field
				mathTest.id = testId;

				/*
				let picUrl = null;
				if (mathTest.problem.picture) {
					// Get pictures' actual URLs
					await this._requestPictureURL(
						testId, mathTest.problem.picture
					).then(
						(url) => { picUrl = url; },
						(err) => { reject(err); }
					);
					if (!picUrl)
						return;
					mathTest.problem.picture = picUrl;
				}

				if (!mathTest.solution.picture) {
					mathTest.solution.picture = mathTest.problem.picture;
				} else {
					picUrl = null;
					await this._requestPictureURL(
						testId, mathTest.solution.picture
					).then(
						(url) => { picUrl = url; },
						(err) => { reject(err); }
					);
					if (!picUrl)
						return;
					mathTest.solution.picture = picUrl;
				}
				*/

				let valid = mathTest.verify();
				if (!valid.ok) {
					let myError = new Error(`(Test ${testId}) ` + valid.error);
					console.error(`VALIDATE ${testId}. Error:`, myError);
					reject(myError);
					return;
				}

				this.cache.testList[mathTest.id] = mathTest;
				resolve(mathTest);
			});
		}
	}

	static requestIdList() {
		return new Promise( async (resolve, reject) => {
			this._requestPath("tests").then(
				(resp) => {
					if (resp.status !== 200) {
						reject(resp);
						return;
					}
					resolve(resp['data'].map((e) => e.name));
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	static requestTestList(filter = null) {
		let testList = [];
		return new Promise( async (resolve, reject) => {
			let ids = await this.requestIdList().then(
				(ids) => ids,
				(errorResp) => { reject(errorResp); return null; }
			);
			if (!ids) {
				return;
			}

			let promiseArray = ids.map(async (id) => {
				let info = await this.requestTestInfo(id);
				testList.push(info);
			});
			await Promise.all(promiseArray).then(
				() => resolve(testList),
				(err) => reject(err),
			);
		});
	}

	static _requestPath(path) {
		return new Promise(async (resolve, reject) => {
			let resp = null;
			await this.OctokitAPI.request('GET /repos/{owner}/{repo}/contents/{path}', {
				owner: 'nkg-17',
				repo: 'math-tests-archive',
				path: path
			}).then(
				(r) => { resp = r; },
				(error) => { reject(error); }
			);
			if (!resp)
				return;

			resolve(resp);
		});
	}

	static _requestPictureURL(testId, picName) {
		return new Promise(async (resolve, reject) => {
			let actualUrl = null;
			await this._requestPath(`tests/${testId}/${picName}`).then(
				(inf) => { actualUrl = inf['data']['download_url']; },
				(error) => { 
					console.error(`GET PROBLEM PIC ${testId}/${picName}. Error:`, error); 
					let myError = new Error(error);
					myError.cause = 'Test ' + testId;
					reject(myError);
				}
			);
			if (!actualUrl)
				return;

			resolve(actualUrl);
		});
	}
}

/*
	Sometimes you can reach GitHub's request limit 
	so you may use this on instead.
*/
class LocalTestsAPI {
	static requestTestInfo(testId) {
	}

	static requestIdList() {
	}

	static requestTestList() {
	}
}

export default class TestsAPI {
	static _Backends = {
		'github': GithubTestsAPI, 
		'local': LocalTestsAPI
	};
	static _Backend = null;

	static SetBackend(name) { 
		if (!this._Backends[name]) {
			console.error(`Unknown API backend name '${name}'`);
			return;
		}

		this._Backend = this._Backends[name];
		this._Backend.init();
	}
	static requestTestInfo(testId) { return this._Backend.requestTestInfo(testId); }
	static requestIdList() { return this._Backend.requestIdList(); }
	static requestTestList() { return this._Backend.requestTestList(); }
}

TestsAPI.SetBackend('github');