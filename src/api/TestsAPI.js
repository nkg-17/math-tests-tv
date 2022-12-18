
import GithubTestsAPI from 	'api/GithubTestsAPI';
import LocalTestsAPI from 	'api/LocalTestsAPI';


export default class TestsAPI {
	static _Backends = {
		'github': GithubTestsAPI,
		'local': LocalTestsAPI
	};
	static _Backend = null;
	static _RandomInsteadOfNext = false;

	static SetBackend(name) { 
		if (!this._Backends[name]) {
			console.error(`Unknown API backend name '${name}'`);
			return;
		}

		this._Backend = this._Backends[name];
		this._Backend.init();
	}

	static SetUseRandomInsteadOfNext(use_random) { 
		this._RandomInsteadOfNext = use_random
	}
	
	static requestTest(testId) 	{ return this._Backend.requestTest(testId); }
	static requestIdList() 		{ return this._Backend.requestIdList(); }
	static requestTestList() 	{ return this._Backend.requestTestList(); }
	static requestRandomId(excludeIds = []) { return this._Backend.requestRandomId(excludeIds); }
	static requestNextIdFor(testId) { return (this._RandomInsteadOfNext) ? this.requestRandomId() : this._Backend.requestNextIdFor(testId); }
	static requestPrevIdFor(testId) { return this._Backend.requestPrevIdFor(testId); }
}

TestsAPI.SetBackend(process.env.REACT_APP_API_SERVICE);
// Doesn't account requestPrevIdFor()
TestsAPI.SetUseRandomInsteadOfNext(process.env.REACT_APP_API_USE_RANDOM_NEXT === "true");