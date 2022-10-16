import { Octokit, App } from "octokit";


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
			console.log('cache hit for ' + testId);
			return new Promise((resolve, reject) => { resolve(TestsAPI.cache.testList[testId]); });
		} else {
			return _requestPath(`tests/${testId}/description.json`).then(async (resp) => {
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
				return testInfo;
			}).catch((error) => { console.log(`Request failed: ${error}`); });
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

	static requestStarredTests() {}
	static requestTagList() {}
}


async function _requestPath(path) {
	return GitHub.request('GET /repos/{owner}/{repo}/contents/{path}', {
		owner: 'nkg-17',
		repo: 'math-tests-archive',
		path: path
	});
}


function OnHitRateLimit(retryAfter, options, octokit) {
	console.warn(`Hit request rate limit! (retry after: ${retryAfter}, options: ${options})`);
}