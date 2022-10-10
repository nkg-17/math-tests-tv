
const Tests = require('./tests.json');


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

	static requestPreviewList(filter = null) {
		return new Promise(function (resolve, reject) {
			let previewList = [];
			for (let id in Tests) {
				let preview = { 
					id: id,
					name: Tests[id].name,
					text: Tests[id].problem.preface,
					tags: Tests[id].tags,
					pictureUrl: Tests[id].problem.pictureUrl
				};
				previewList.push(preview);
			}
			resolve(previewList);
		});
	}
}
