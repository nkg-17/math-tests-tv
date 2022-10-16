import { Octokit } from "octokit";


const OctokitOptions = {
	userAgent: "math-tests-app/v1.0.0",
	onRateLimit: OnHitRateLimit,
	onSecondaryRateLimit: OnHitRateLimit
};
const GitHub = new Octokit(OctokitOptions);


export default class TestsAPI {
	static cache = {
		testList: {}
	};

	static requestTestInfo(testId, fetchCache = true) {
		if (fetchCache && TestsAPI.cache.testList[testId] !== undefined) {
			return new Promise((resolve, reject) => { resolve(TestsAPI.cache.testList[testId]); });
		} else {
			return new Promise(async (resolve, reject) => {
				let resp = await _requestPath(`tests/${testId}/description.json`);
				if (!resp) {
					reject(null);
					return;
				}

				// Response to JSON
				let testInfo = await (await fetch(resp['data']['download_url'])).json();

				// Add missing ID field
				testInfo.id = testId;

				// Get pictures' actual URLs
				testInfo.problem.pictureUrl = (await _requestPath(`tests/${testId}/${testInfo.problem.pictureUrl}`))['data']['download_url'];
				if (!testInfo.solution.pictureUrl) {
					testInfo.solution.pictureUrl = testInfo.problem.pictureUrl;
				} else {
					testInfo.solution.pictureUrl = (await _requestPath(`tests/${testId}/${testInfo.solution.pictureUrl}`))['data']['download_url'];
				}

				TestsAPI.cache.testList[testInfo.id] = testInfo;
				resolve(testInfo);
			});
		}
	}

	static requestIdList() {
		return _requestPath("tests").then((resp) => {
			return resp['data'].map((e) => e.name);
		});
	}

	static requestTestList(filter = null) {
		let testList = [];
		return this.requestIdList().then((ids) => {
			let promiseArray = ids.map(async (id) => {
				let info = await this.requestTestInfo(id);
				testList.push(info);
			});
			return Promise.all(promiseArray);
		}).then((res) => testList);
	}

	static requestStarredTests() {
		return new Promise((resolve, reject) => {
			reject("Not implemented");
		});
	}
	
	static requestTagList() {
		return new Promise((resolve, reject) => {
			reject("Not implemented");
		});
	}
}


async function _requestPath(path) {
	return GitHub.request('GET /repos/{owner}/{repo}/contents/{path}', {
		owner: 'nkg-17',
		repo: 'math-tests-archive',
		path: path
	}).then(
		(resp) => resp,
		(error) => null
	);
}


function OnHitRateLimit(retryAfter, options, octokit) {
	console.warn(`Hit request rate limit! (retry after: ${retryAfter}, options: ${options})`);
}