
let Tests = require('./tests.json');


export default class TestsAPI {
	static requestTestInfo(id) {
		return new Promise(function (resolve, reject) {
			for (let i in Tests) {
				if (i === id) {
					resolve(Tests[id]);
					return;
				}
			}
			
			let ids = [];
			for (let i in Tests)
				ids.push(i);
			reject(`Invalid id (id=${id}, ids=[${ids.join(', ')}])`);
		});
	}

	static requestIdList() {
		return new Promise(function (resolve, reject) {
			let idList = [];
			for (let id in Tests)
				idList.push(id);
			resolve(idList);
		});
	}

	static requestTestList(filter = null) {
		return new Promise(function (resolve, reject) {
			let array = [];
			for (let id in Tests)
				array.push(Tests[id]);
			resolve(array);
		});
	}

	static requestStarredTests() {}
	static requestTagList() {}
}
