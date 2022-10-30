
import GithubTestsAPI from './GithubTestsAPI';
import LocalTestsAPI from './LocalTestsAPI';


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
	
	static requestTest(testId) 	{ return this._Backend.requestTest(testId); }
	static requestIdList() 		{ return this._Backend.requestIdList(); }
	static requestTestList() 	{ return this._Backend.requestTestList(); }
	static requestRandomId(excludeIds = []) { return this._Backend.requestRandomId(excludeIds); }
	static requestNextIdFor(testId) { return this._Backend.requestNextIdFor(testId); }
	static requestPrevIdFor(testId) { return this._Backend.requestPrevIdFor(testId); }
}

TestsAPI.SetBackend('local');
