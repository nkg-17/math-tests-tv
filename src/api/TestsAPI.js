import { Octokit } from "octokit";


const OctokitOptions = {
	userAgent: "math-tests-app/v1.0.0"
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
				let resp = null;
				await _requestPath(`tests/${testId}/description.json`).then(
					(okResp) => { resp = okResp; },
					(errResp) => { reject(errResp); },
				);
				if (!resp)
					return;

				// Get raw description.json contents
				let testRawContents = null;
				await fetch(resp['data']['download_url']).then(
					(contents) => { testRawContents = contents },
					(error) => { reject(error); }
				);			
				if (!testRawContents)
					return;

				// parse JSON
				let testInfo = null;
				await testRawContents.json().then(
					(obj) => { testInfo = obj },
					(error) => { reject(error); }
				);			
				if (!testInfo)
					return;

				// Add missing ID field
				testInfo.id = testId;

				// Get pictures' actual URLs
				// Request problem picture
				let actualPictureUrl = null;
				await _requestPath(`tests/${testId}/${testInfo.problem.pictureUrl}`).then(
					(pictureFileInfo) => { actualPictureUrl = pictureFileInfo['data']['download_url']; },
					(error) => { reject(error); }
				);
				if (!actualPictureUrl)
					return;
				testInfo.problem.pictureUrl = actualPictureUrl;

				// Request solution picture
				if (!testInfo.solution.pictureUrl) {
					testInfo.solution.pictureUrl = testInfo.problem.pictureUrl;
				} else {
					let actualPictureUrl = null;
					await _requestPath(`tests/${testId}/${testInfo.solution.pictureUrl}`).then(
						(pictureFileInfo) => { actualPictureUrl = pictureFileInfo['data']['download_url']; },
						(error) => { reject(error); }
					);
					if (!actualPictureUrl)
						return;
					testInfo.solution.pictureUrl = actualPictureUrl;
				}

				TestsAPI.cache.testList[testInfo.id] = testInfo;
				resolve(testInfo);
			});
		}
	}

	static requestIdList() {
		return new Promise( async (resolve, reject) => {
			let resp = await _requestPath("tests");
			if (resp.status !== 200) {
				reject(resp);
				return;
			}
			resolve(resp['data'].map((e) => e.name));
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
	return new Promise(async (resolve, reject) => {
		let resp = null;
		await GitHub.request('GET /repos/{owner}/{repo}/contents/{path}', {
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
