
const Tests = {
	11375: { 
		name: "Test 11375",
		id: 11375,
		tags: [ "tag1", "tag2" ],
		problem: {
			preface: "Цилиндр и конус имеют общие основание и высоту. Объём конуса равен 25. Найдите объём цилиндра.",
			tasks: [
				{ title: "Task 1 title", text: "Task 1 text" },
				{ title: "Task 2 title", text: "Task 2 text" }
			],
			pictureUrl: "/math-tests/logo192.png"
		},
		solution: {
			preface: "Solution preface",
			tasks: [
				{ text: "Task 1 solution text", answer: "Task 1 answer" },
				{ text: "Task 2 solution text", answer: "Task 1 answer" }
			],
			pictureUrl: "/math-tests/logo192.png"
		}
	},
	65930: { 
		name: "Test 65930",
		id: 65930,
		tags: [ "tag3", "tag2" ],
		problem: {
			preface: "Найдите объем многогранника, изображенного на рисунке (все двугранные углы прямые).",
			tasks: [
				{ title: "Task 1 title", text: "Task 1 text" },
				{ title: "Task 2 title", text: "Task 2 text" }
			],
			pictureUrl: "/math-tests/logo192.png"
		},
		solution: {
			preface: "Solution preface",
			tasks: [
				{ text: "Task 1 solution text", answer: "Task 1 answer" },
				{ text: "Task 2 solution text", answer: "Task 1 answer" }
			],
			pictureUrl: "/math-tests/logo192.png"
		}
	},
	11740: { 
		name: "Test 11740",
		id: 11740,
		tags: [ "tag4", "tag1" ],
		problem: {
			preface: "This is a preface for the problem",
			tasks: [
				{ title: "Task 1 title", text: "Task 1 text" },
				{ title: "Task 2 title", text: "Task 2 text" }
			],
			pictureUrl: "/math-tests/logo192.png"
		},
		solution: {
			preface: "Solution preface",
			tasks: [
				{ text: "Task 1 solution text", answer: "Task 1 answer" },
				{ text: "Task 2 solution text", answer: "Task 1 answer" }
			],
			pictureUrl: "/math-tests/logo192.png"
		}
	},
	15240: { 
		name: "Test 15240",
		id: 15240,
		tags: [ "tag4", "tag8" ],
		problem: {
			preface: "This is a preface for the problem",
			tasks: [
				{ title: "Task 1 title", text: "Task 1 text" },
				{ title: "Task 2 title", text: "Task 2 text" }
			],
			pictureUrl: "/math-tests/logo192.png"
		},
		solution: {
			preface: "Solution preface",
			tasks: [
				{ text: "Task 1 solution text", answer: "Task 1 answer" },
				{ text: "Task 2 solution text", answer: "Task 1 answer" }
			],
			pictureUrl: "/math-tests/logo192.png"
		}
	},
	83910: { 
		name: "Test 83910",
		id: 83910,
		tags: [],
		problem: {
			preface: "This is a preface for the problem",
			tasks: [
				{ title: "Task 1 title", text: "Task 1 text" },
				{ title: "Task 2 title", text: "Task 2 text" }
			],
			pictureUrl: "/math-tests/logo192.png"
		},
		solution: {
			preface: "Solution preface",
			tasks: [
				{ text: "Task 1 solution text", answer: "Task 1 answer" },
				{ text: "Task 2 solution text", answer: "Task 1 answer" }
			],
			pictureUrl: "/math-tests/logo192.png"
		}
	}
};


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
